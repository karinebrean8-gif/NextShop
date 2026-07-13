from django.urls import path

from .views import (
    SellerListAPIView,
    SellerCreateAPIView,
    SellerDetailAPIView,
    SellerUpdateAPIView,
)

urlpatterns = (

    path(
        "",
        SellerListAPIView.as_view(),
        name="seller-list",
    ),

    path(
        "create/",
        SellerCreateAPIView.as_view(),
        name="seller-create",
    ),

    path(
        "<int:pk>/",
        SellerDetailAPIView.as_view(),
        name="seller-detail",
    ),

    path(
        "<int:pk>/update/",
        SellerUpdateAPIView.as_view(),
        name="seller-update",
    ),

)