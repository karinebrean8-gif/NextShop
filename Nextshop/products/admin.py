from django.contrib import admin

from .models import Product, ProductImage, ProductVariant


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 0


class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 0


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

   list_display = ("id", "name", "price", "discount_price", "stock", "status", "is_featured", "created_at")

    list_filter = (
        "status",
        "is_featured",
        "created_at",
    )

    search_fields = (
        "name",
        "sku",
    )

    ordering = (
        "-created_at",
    )

    inlines = (
        ProductImageInline,
        ProductVariantInline,
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 50
