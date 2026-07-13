from django.urls import path

from .views import (
    ProductListAPIView,
    ProductDetailAPIView,
    ProductCreateAPIView,
    ProductVariantListAPIView,
)

urlpatterns = (

    path(
        "api/products/",
        ProductListAPIView.as_view(),
        name="product-list",
    ),

    path(
        "api/products/create/",
        ProductCreateAPIView.as_view(),
        name="product-create",
    ),

    path(
        "api/products/<int:pk>/",
        ProductDetailAPIView.as_view(),
        name="product-detail",
    ),

    path(
        "api/product-variants/",
        ProductVariantListAPIView.as_view(),
        name="product-variants",
    ),

)