from django.urls import path
from .views import (
    ProductListAPIView, ProductDetailAPIView, ProductCreateAPIView, ProductUpdateAPIView, ProductDeleteAPIView,
    ProductVariantListAPIView, ProductVariantDetailAPIView,
    CategoryListAPIView, CategoryDetailAPIView,
    BrandListAPIView, BrandDetailAPIView,
)

API_ROUTES = {
    'PRODUCTS': 'api/v1/products/',
    'PRODUCT_DETAIL': 'api/v1/products/<int:pk>/',
    'PRODUCT_CREATE': 'api/v1/products/create/',
    'PRODUCT_UPDATE': 'api/v1/products/<int:pk>/update/',
    'PRODUCT_DELETE': 'api/v1/products/<int:pk>/delete/',
    'VARIANTS': 'api/v1/product-variants/',
    'VARIANT_DETAIL': 'api/v1/product-variants/<int:pk>/',
    'CATEGORIES': 'api/v1/categories/',
    'CATEGORY_DETAIL': 'api/v1/categories/<int:pk>/',
    'BRANDS': 'api/v1/brands/',
    'BRAND_DETAIL': 'api/v1/brands/<int:pk>/',
}

SUPPORTED_METHODS = ('GET', 'POST', 'PUT', 'PATCH', 'DELETE')

urlpatterns = [
    path(API_ROUTES['PRODUCTS'], ProductListAPIView.as_view(), name='product-list'),
    path(API_ROUTES['PRODUCT_DETAIL'], ProductDetailAPIView.as_view(), name='product-detail'),
    path(API_ROUTES['PRODUCT_CREATE'], ProductCreateAPIView.as_view(), name='product-create'),
    path(API_ROUTES['PRODUCT_UPDATE'], ProductUpdateAPIView.as_view(), name='product-update'),
    path(API_ROUTES['PRODUCT_DELETE'], ProductDeleteAPIView.as_view(), name='product-delete'),
    
    path(API_ROUTES['VARIANTS'], ProductVariantListAPIView.as_view(), name='product-variant-list'),
    path(API_ROUTES['VARIANT_DETAIL'], ProductVariantDetailAPIView.as_view(), name='product-variant-detail'),
    
    path(API_ROUTES['CATEGORIES'], CategoryListAPIView.as_view(), name='category-list'),
    path(API_ROUTES['CATEGORY_DETAIL'], CategoryDetailAPIView.as_view(), name='category-detail'),
    
    path(API_ROUTES['BRANDS'], BrandListAPIView.as_view(), name='brand-list'),
    path(API_ROUTES['BRAND_DETAIL'], BrandDetailAPIView.as_view(), name='brand-detail'),
]
