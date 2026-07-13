from django.urls import path

from .views import (
    CategoryListAPIView,
    CategoryDetailAPIView,
    CategoryCreateAPIView,
)

urlpatterns = (

    path(
        "api/categories/",
        CategoryListAPIView.as_view(),
        name="category-list",
    ),

    path(
        "api/categories/create/",
        CategoryCreateAPIView.as_view(),
        name="category-create",
    ),

    path(
        "api/categories/<int:pk>/",
        CategoryDetailAPIView.as_view(),
        name="category-detail",
    ),

)