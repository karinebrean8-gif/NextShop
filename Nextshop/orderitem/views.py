from django.db import transaction
from django.http import JsonResponse
from django.views import View

from .models import OrderItem


class OrderItemListAPIView(View):

    def get(self, request):

        order_id = request.GET.get("order_id")

        queryset = OrderItem.objects.filter(
            order_id=order_id
        )

        results = tuple(
            {
                "id": item.id,
                "product_id": item.product_id,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit_price": str(item.unit_price),
                "total_amount": str(item.total_amount),
                "status": item.status,
            }
            for item in queryset
        )

        return JsonResponse(
            {
                "success": True,
                "results": results
            }
        )


class OrderItemCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        item = OrderItem.objects.create(
            order_id=request.POST.get("order_id"),
            product_id=request.POST.get("product_id"),
            sku="SKU-001",
            product_name_snapshot="Demo Product",
            quantity=2,
            unit_price=100,
            total_amount=200,
        )

        return JsonResponse(
            {
                "success": True,
                "id": item.id,
            },
            status=201
        )


class OrderItemDetailAPIView(View):

    def get(self, request, pk):

        item = OrderItem.objects.get(pk=pk)

        return JsonResponse(
            {
                "id": item.id,
                "product_id": item.product_id,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit_price": str(item.unit_price),
                "total_amount": str(item.total_amount),
                "status": item.status,
            }
        )
