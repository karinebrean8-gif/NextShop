from django.urls import path

from .views import (
    CartItemListAPIView,
    CartItemCreateAPIView,
)

urlpatterns = (

    path(
        "api/cart-items/",
        CartItemListAPIView.as_view(),
        name="cart-item-list"
    ),

    path(
        "api/cart-items/create/",
        CartItemCreateAPIView.as_view(),
        name="cart-item-create"
    ),

)