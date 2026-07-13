import json

from django.http import JsonResponse
from django.views import View

from .models import Category


class CategoryListAPIView(View):

    def get(self, request):

        categories = Category.objects.filter(
            status="active"
        )

        results = tuple(
            {
                "id": category.id,
                "name": category.name,
                "slug": category.slug,
                "parent_id": category.parent_id,
                "featured": category.is_featured,
            }
            for category in categories
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )


class CategoryDetailAPIView(View):

    def get(self, request, pk):

        category = Category.objects.get(pk=pk)

        data = {
            "id": category.id,
            "name": category.name,
            "slug": category.slug,
            "description": category.description,
            "parent_id": category.parent_id,
            "status": category.status,
        }

        return JsonResponse(data)


class CategoryCreateAPIView(View):

    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        category = Category.objects.create(
            name=payload.get("name"),
            description=payload.get("description", ""),
            parent_id=payload.get("parent_id"),
        )

        return JsonResponse(
            {
                "success": True,
                "category_id": category.id,
            },
            status=201
        )