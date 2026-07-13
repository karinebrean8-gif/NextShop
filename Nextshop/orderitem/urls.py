from django.urls import path

from .views import (
    OrderItemListAPIView,
    OrderItemCreateAPIView,
    OrderItemDetailAPIView,
)

urlpatterns = (

    path(
        "api/order-items/",
        OrderItemListAPIView.as_view(),
        name="order-item-list"
    ),

    path(
        "api/order-items/create/",
        OrderItemCreateAPIView.as_view(),
        name="order-item-create"
    ),

    path(
        "api/order-items/<int:pk>/",
        OrderItemDetailAPIView.as_view(),
        name="order-item-detail"
    ),

)