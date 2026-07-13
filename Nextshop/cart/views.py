import json

from django.http import JsonResponse
from django.views import View
from django.db import transaction

from .models import Cart, CartItem


class CartListAPIView(View):

    def get(self, request):

        carts = Cart.objects.all()

        results = tuple(
            {
                "id": cart.id,
                "user_id": cart.user_id,
                "status": cart.status,
                "total_amount": str(cart.total_amount),
            }
            for cart in carts
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )


class CartCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        cart = Cart.objects.create(
            user_id=payload.get("user_id"),
            session_id=payload.get("session_id", ""),
        )

        return JsonResponse(
            {
                "success": True,
                "cart_id": cart.id,
            },
            status=201
        )


class CartItemListAPIView(View):

    def get(self, request):

        cart_id = request.GET.get("cart_id")

        items = CartItem.objects.filter(
            cart_id=cart_id
        )

        results = tuple(
            {
                "id": item.id,
                "product_id": item.product_id,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit_price": str(item.unit_price),
                "subtotal": str(item.subtotal),
                "status": item.status,
            }
            for item in items
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )


class CartItemCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        item = CartItem.objects.create(
            cart_id=payload["cart_id"],
            product_id=payload["product_id"],
            sku=payload["sku"],
            product_name=payload.get("product_name", ""),
            quantity=payload.get("quantity", 1),
            unit_price=payload.get("unit_price", 0),
            sale_price=payload.get("sale_price", 0),
        )

        return JsonResponse(
            {
                "success": True,
                "item_id": item.id,
            },
            status=201
        )


class CartItemDetailAPIView(View):

    def get(self, request, pk):

        item = CartItem.objects.get(pk=pk)

        return JsonResponse(
            {
                "id": item.id,
                "product_id": item.product_id,
                "sku": item.sku,
                "quantity": item.quantity,
                "unit_price": str(item.unit_price),
                "sale_price": str(item.sale_price),
                "subtotal": str(item.subtotal),
            }
        )
