
from typing import TypedDict, Any, Tuple, Dict
from .constants import SUPPORTED_METHODS

class PaymentPayloadDict(TypedDict):
    order_id: str
    amount: float
    currency: str

class GatewayRequestDict(TypedDict):
    payment_method: str
    payload: PaymentPayloadDict

class MicrosecondSerializer:
    """
    Ultra-performance data validation engine.
    Uses strict slots and dictionary-based constraint verification.
    """
    __slots__ = ()  
    @staticmethod
    def validate_request(raw_data: Dict[str, Any]) -> Tuple[bool, str, GatewayRequestDict]:
        """
        Validates raw payload data with structural isolation.
        Returns a Tuple: (is_valid, error_message, cleaned_dict)
        """
        payment_method = raw_data.get("payment_method")
        payload = raw_data.get("payload")

        if not payment_method or not isinstance(payload, dict):
            return False, "Malformed JSON schema hierarchy", {}

        if payment_method not in SUPPORTED_METHODS:
            return False, f"Unsupported payment rail architecture: {payment_method}", {}

        order_id = payload.get("order_id")
        amount = payload.get("amount")
        currency = payload.get("currency", "USD")

        if not order_id or not isinstance(order_id, str):
            return False, "Invalid or missing order_id string reference", {}

        try:
            parsed_amount = float(amount) if amount is not None else 0.0
            if parsed_amount <= 0:
                return False, "Transactional processing amount must be positive", {}
        except (ValueError, TypeError):
            return False, "Amount data cast execution failure", {}

        cleaned_data: GatewayRequestDict = {
            "payment_method": str(payment_method),
            "payload": {
                "order_id": str(order_id),
                "amount": parsed_amount,
                "currency": str(currency)
            }
        }
        return True, "", cleaned_data
