from django.db import transaction
from django.http import JsonResponse
from django.views import View

from .models import CartItem


class CartItemListAPIView(View):

    def get(self, request):

        cart_id = request.GET.get("cart_id")

        items = CartItem.objects.filter(
            cart_id=cart_id,
            status="active"
        )

        data = tuple(
            {
                "id": item.id,
                "product_id": item.product_id,
                "sku": item.sku,
                "quantity": item.quantity,
                "price": str(item.sale_price),
                "subtotal": str(item.subtotal),
            }
            for item in items
        )

        return JsonResponse(
            {
                "success": True,
                "results": data
            }
        )


class CartItemCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        cart_id = request.POST.get("cart_id")

        product_id = request.POST.get("product_id")

        quantity = int(
            request.POST.get("quantity", 1)
        )

        item = CartItem.objects.create(
            cart_id=cart_id,
            product_id=product_id,
            sku="SKU-DEMO",
            quantity=quantity,
            unit_price=100,
            sale_price=90,
            product_name_snapshot="Demo Product",
        )

        return JsonResponse(
            {
                "success": True,
                "item_id": item.id
            },
            status=201
        )
