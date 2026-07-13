import json

from django.http import JsonResponse
from django.views import View
from django.db import transaction

from .models import User, UserProfile


class UserListAPIView(View):

    def get(self, request):

        users = User.objects.all()

        results = tuple(
            {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "status": user.status,
                "verified": user.is_verified,
            }
            for user in users
        )

        return JsonResponse(
            {
                "success": True,
                "results": results,
            }
        )


class UserCreateAPIView(View):

    @transaction.atomic
    def post(self, request):

        payload = json.loads(
            request.body.decode("utf-8")
        )

        user = User.objects.create_user(
            email=payload["email"],
            password=payload.get("password"),
            first_name=payload.get("first_name", ""),
            last_name=payload.get("last_name", ""),
            phone=payload.get("phone", ""),
        )

        UserProfile.objects.create(
            user=user
        )

        return JsonResponse(
            {
                "success": True,
                "user_id": user.id,
                "email": user.email,
            },
            status=201
        )


class UserDetailAPIView(View):

    def get(self, request, pk):

        user = User.objects.get(pk=pk)

        data = {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "role": user.role,
            "status": user.status,
            "phone": user.phone,
        }

        return JsonResponse(data)