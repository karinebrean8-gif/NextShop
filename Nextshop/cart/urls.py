from django.urls import path

from .views import (
    CartListAPIView,
    CartCreateAPIView,
    CartItemListAPIView,
    CartItemCreateAPIView,
    CartItemDetailAPIView,
)

urlpatterns = (

    path(
        "api/carts/",
        CartListAPIView.as_view(),
        name="cart-list",
    ),

    path(
        "api/carts/create/",
        CartCreateAPIView.as_view(),
        name="cart-create",
    ),

    path(
        "api/cart-items/",
        CartItemListAPIView.as_view(),
        name="cart-item-list",
    ),

    path(
        "api/cart-items/create/",
        CartItemCreateAPIView.as_view(),
        name="cart-item-create",
    ),

    path(
        "api/cart-items/<int:pk>/",
        CartItemDetailAPIView.as_view(),
        name="cart-item-detail",
    ),

)