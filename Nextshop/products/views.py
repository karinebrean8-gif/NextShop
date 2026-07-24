from django.db.models import Q, Count, Avg, F
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import generics, status, filters
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
import json

from.models import Product, ProductVariant, Category, Brand
from.serializers import (
    ProductSerializer, ProductListSerializer, ProductDetailSerializer,
    ProductCreateSerializer, VariantSerializer, CategorySerializer, BrandSerializer
)

# ====== CONSTANTS - L19 LEVEL DICTIONARY/TUPLE ======
API_RESPONSE_CODES = {
    'SUCCESS': 200,
    'CREATED': 201,
    'BAD_REQUEST': 400,
    'NOT_FOUND': 404,
    'SERVER_ERROR': 500,
}

SORT_OPTIONS = (
    ('newest', '-created_at'),
    ('oldest', 'created_at'),
    ('price_low', 'price'),
    ('price_high', '-price'),
    ('popular', '-is_featured'),
    ('name_az', 'name'),
)

FILTER_OPTIONS = {
    'status': ['draft', 'published', 'archived'],
    'stock_status': ['in_stock', 'out_of_stock', 'pre_order', 'back_order'],
    'currency': ['BDT', 'USD'],
}

ERROR_MESSAGES = {
    'PRODUCT_NOT_FOUND': 'Product not found',
    'INVALID_DATA': 'Invalid data provided',
    'STOCK_UNAVAILABLE': 'Product out of stock',
    'SERVER_ERROR': 'Internal server error',
}

SUCCESS_MESSAGES = {
    'PRODUCT_CREATED': 'Product created successfully',
    'PRODUCT_UPDATED': 'Product updated successfully',
    'PRODUCT_DELETED': 'Product deleted successfully',
}

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class ProductListAPIView(generics.ListAPIView):
    """
    L19: Advanced filtering, searching, sorting, pagination
    GET /api/products/?category=1&price_min=100&sort=price_low&search=iphone
    """
    permission_classes = [AllowAny]
    pagination_class = StandardResultsSetPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description', 'short_description', 'brand__name', 'category__name']
    ordering_fields = ['price', 'created_at', 'name', 'stock']

    def get_serializer_class(self):
        return ProductListSerializer

    def get_queryset(self):
        queryset = Product.objects.filter(status='published', is_deleted=False).select_related('category', 'brand', 'seller').prefetch_related('variants')

        filters_dict = {
            'category_id': self.request.GET.get('category'),
            'brand_id': self.request.GET.get('brand'),
            'status': self.request.GET.get('status', 'published'),
            'stock_status': self.request.GET.get('stock_status'),
            'currency': self.request.GET.get('currency', 'BDT'),
            'is_featured': self.request.GET.get('featured'),
        }

        for key, value in filters_dict.items():
            if value:
                queryset = queryset.filter(**{key: value})

        price_min = self.request.GET.get('price_min')
        price_max = self.request.GET.get('price_max')
        if price_min:
            queryset = queryset.filter(price__gte=price_min)
        if price_max:
            queryset = queryset.filter(price__lte=price_max)

        sort = self.request.GET.get('sort', 'newest')
        sort_dict = dict(SORT_OPTIONS)
        if sort in sort_dict:
            queryset = queryset.order_by(sort_dict[sort])
        return queryset

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'success': True,
            'code': API_RESPONSE_CODES['SUCCESS'],
            'message': 'Products fetched successfully',
            'filters_available': FILTER_OPTIONS,
            'sort_options': [s[0] for s in SORT_OPTIONS],
            'data': response.data
        })

class ProductDetailAPIView(generics.RetrieveAPIView):
    permission_classes = [AllowAny]
    def get_serializer_class(self):
        return ProductDetailSerializer
    def get_queryset(self):
        return Product.objects.filter(is_deleted=False).select_related('category', 'brand', 'seller').prefetch_related('variants')
    def retrieve(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response({
                'success': True,
                'code': API_RESPONSE_CODES['SUCCESS'],
                'data': serializer.data
            })
        except Product.DoesNotExist:
            return Response({
                'success': False,
                'code': API_RESPONSE_CODES['NOT_FOUND'],
                'message': ERROR_MESSAGES['PRODUCT_NOT_FOUND']
            }, status=status.HTTP_404_NOT_FOUND)
class ProductCreateAPIView(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        return
