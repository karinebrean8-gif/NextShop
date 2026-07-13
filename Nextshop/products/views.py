import json

from django.http import JsonResponse
from django.views import View

from .models import Product, ProductVariant


class ProductListAPIView(View):

    def get(self, request):

        products = Product.objects.filter(
            status="active"
        )

        results = tuple(
            {
                "id": p.id,
                "name": p.name,
                "slug": p.slug,
                "sku": p.sku,
                "price": str(p.price),
                "sale_price": str(p.sale_price),
                "discount_price": str(p.discount_price) 
                if p.discount_price else None,
                "stock": p.stock,
                "stock": p.stock_quantity,
                "featured": p.is_featured,
            }
            for p in products
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )


class ProductDetailAPIView(View):

    def get(self, request, pk):

        p = Product.objects.get(pk=pk)

        data = {
            "id": p.id,
            "name": p.name,
            "slug": p.slug,
            "description": p.description,
            "price": str(p.price),
            "sale_price": str(p.sale_price),
            "stock": p.stock_quantity,
            "category_id": p.category_id,
        }

        return JsonResponse(data)


class ProductCreateAPIView(View):

    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        product = Product.objects.create(
            name=payload["name"],
            sku=payload["sku"],
            price=payload["price"],
            sale_price=payload.get("sale_price", 0),
            stock_quantity=payload.get("stock_quantity", 0),
            category_id=payload.get("category_id"),
        )

        return JsonResponse(
            {
                "success": True,
                "product_id": product.id,
            },
            status=201
        )


class ProductVariantListAPIView(View):

    def get(self, request):

        product_id = request.GET.get("product_id")

        variants = ProductVariant.objects.filter(
            product_id=product_id
        )

        results = tuple(
            {
                "id": v.id,
                "name": v.name,
                "sku": v.sku,
                "price": str(v.price),
                "stock": v.stock,
                "attributes": v.attributes,
            }
            for v in variants
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )
