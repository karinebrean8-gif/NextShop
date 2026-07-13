from django.urls import path

from .views import (
    OrderListAPIView,
    OrderCreateAPIView,
    OrderDetailAPIView,
)

urlpatterns = (

    path(
        "api/orders/",
        OrderListAPIView.as_view(),
        name="order-list"
    ),

    path(
        "api/orders/create/",
        OrderCreateAPIView.as_view(),
        name="order-create"
    ),

    path(
        "api/orders/<int:order_id>/",
        OrderDetailAPIView.as_view(),
        name="order-detail"
    ),

)