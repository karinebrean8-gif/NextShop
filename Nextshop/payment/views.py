# views.py
import json
import uuid
from django.http import JsonResponse, HttpRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.db import transaction
from .registry import GATEWAY_ROUTING_MATRIX
from .serializers import MicrosecondSerializer
from .models import PaymentTransaction

@csrf_exempt
@require_POST
def process_payment_gateway(request: HttpRequest) -> JsonResponse:
    """
    Ultra-low latency execution pipeline. Handles high-velocity transactions 
    using explicit dictionary mapping lookups.
    """
    try:
        raw_body: dict = json.loads(request.body)
        
        # Parse and validate data using custom zero-overhead engine
        is_valid, error_msg, validated_data = MicrosecondSerializer.validate_request(raw_body)
        if not is_valid:
            return JsonResponse({"status": "REJECTED", "error": error_msg}, status=400)
        
        payment_method = validated_data["payment_method"]
        payload = validated_data["payload"]

        # Strategy matrix instantiation via O(1) dictionary routing
        strategy = GATEWAY_ROUTING_MATRIX[payment_method]
        
        # Execute external API gateway operations (Stripe, bKash, Binance, etc.)
        status, response_data = strategy.initialize_transaction(payload)
        generated_txn_id = response_data.get("rrn", f"TXN-{uuid.uuid4().hex[:16].upper()}")
        
        # Minimal database atomic transaction lock block
        with transaction.atomic():
            txn = PaymentTransaction.objects.create(
                transaction_id=generated_txn_id,
                order_id=payload["order_id"],
                amount=payload["amount"],
                currency=payload["currency"],
                payment_method=payment_method,
                status=status,
                provider_raw_response=response_data
            )
        
        return JsonResponse({
            "gateway_status": txn.status,
            "transaction_id": txn.transaction_id,
            "data": response_data
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({"status": "REJECTED", "error": "Malformed payload entity"}, status=400)
    except Exception as e:
        # Prevent telemetry leaks in production while preserving stability
        return JsonResponse({"status": "CRITICAL_FAULT", "error": "Internal ledger execution error"}, status=500)