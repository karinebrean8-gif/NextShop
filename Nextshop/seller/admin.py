from django.contrib import admin

from .models import Seller


@admin.register(Seller)
class SellerAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "shop_name",
        "business_type",
        "status",
        "rating",
        "total_products",
        "total_orders",
        "created_at",
    )

    list_filter = (
        "status",
        "business_type",
        "created_at",
    )

    search_fields = (
        "shop_name",
        "email",
        "phone",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
        "total_sales",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 50
