from django.urls import path

from .views import (
    UserListAPIView,
    UserCreateAPIView,
    UserDetailAPIView,
)

urlpatterns = (

    path(
        "api/users/",
        UserListAPIView.as_view(),
        name="user-list",
    ),

    path(
        "api/users/create/",
        UserCreateAPIView.as_view(),
        name="user-create",
    ),

    path(
        "api/users/<int:pk>/",
        UserDetailAPIView.as_view(),
        name="user-detail",
    ),

)