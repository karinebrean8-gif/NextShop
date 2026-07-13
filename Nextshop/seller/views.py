import json

from django.views import View
from django.http import JsonResponse
from django.db import transaction

from .models import Seller


class SellerListAPIView(View):

    def get(self, request):

        sellers = Seller.objects.filter(
            status="active"
        )

        results = tuple(
            {
                "id": seller.id,
                "shop_name": seller.shop_name,
                "rating": str(
                    seller.rating
                ),
                "total_products":
                    seller.total_products,
                "total_sales":
                    str(seller.total_sales),
            }
            for seller in sellers
        )

        return JsonResponse(
            {
                "success": True,
                "results": results
            }
        )


class SellerCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        seller = Seller.objects.create(
            user_id=payload["user_id"],
            shop_name=payload["shop_name"],
            shop_slug=payload["shop_slug"],
            email=payload["email"],
            phone=payload["phone"],
        )

        return JsonResponse(
            {
                "success": True,
                "seller_id": seller.id,
            },
            status=201
        )


class SellerDetailAPIView(View):

    def get(self, request, pk):

        seller = Seller.objects.get(
            pk=pk
        )

        return JsonResponse(
            {
                "id": seller.id,
                "shop_name":
                    seller.shop_name,
                "status":
                    seller.status,
                "rating":
                    str(seller.rating),
                "total_products":
                    seller.total_products,
                "total_orders":
                    seller.total_orders,
                "total_sales":
                    str(seller.total_sales),
            }
        )


class SellerUpdateAPIView(View):

    @transaction.atomic
    def put(self, request, pk):

        seller = Seller.objects.get(
            pk=pk
        )

        payload = json.loads(
            request.body.decode("utf-8")
        )

        seller.shop_name = payload.get(
            "shop_name",
            seller.shop_name
        )

        seller.phone = payload.get(
            "phone",
            seller.phone
        )

        seller.description = payload.get(
            "description",
            seller.description
        )

        seller.save()

        return JsonResponse(
            {
                "success": True
            }
        )
