import uuid

from django.http import JsonResponse
from django.views import View
from django.db import transaction

from .models import Order


class OrderListAPIView(View):

    def get(self, request):

        orders = Order.objects.all()

        data = tuple(
            {
                "id": order.id,
                "order_number": order.order_number,
                "status": order.status,
                "payment_status": order.payment_status,
                "total_amount": str(order.total_amount),
            }
            for order in orders
        )

        return JsonResponse(
            {
                "success": True,
                "results": data
            }
        )


class OrderCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        order = Order.objects.create(
            order_number=str(uuid.uuid4())[:12],
            user_id=request.POST.get("user_id"),
            subtotal=1000,
            tax_amount=100,
            shipping_amount=50,
            total_amount=1150
        )

        return JsonResponse(
            {
                "success": True,
                "order_id": order.id,
                "order_number": order.order_number
            },
            status=201
        )


class OrderDetailAPIView(View):

    def get(self, request, order_id):

        order = Order.objects.get(
            id=order_id
        )

        data = {
            "id": order.id,
            "order_number": order.order_number,
            "status": order.status,
            "payment_status": order.payment_status,
            "subtotal": str(order.subtotal),
            "total_amount": str(order.total_amount),
        }

        return JsonResponse(data)
