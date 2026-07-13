from django.contrib import admin

from .models import Category


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "name",
        "parent",
        "status",
        "is_featured",
        "sort_order",
        "created_at",
    )

    list_filter = (
        "status",
        "is_featured",
        "created_at",
    )

    search_fields = (
        "name",
        "slug",
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    ordering = (
        "sort_order",
        "name",
    )

    list_per_page = 50

    fieldsets = (
        (
            "Basic Information",
            {
                "fields": (
                    "name",
                    "slug",
                    "parent",
                    "description",
                )
            }
        ),
        (
            "SEO",
            {
                "fields": (
                    "seo_title",
                    "seo_description",
                )
            }
        ),
        (
            "Settings",
            {
                "fields": (
                    "status",
                    "is_featured",
                    "sort_order",
                    "image",
                    "icon",
                )
            }
        ),
    )