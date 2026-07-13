from django.contrib import admin

from .models import User, UserProfile


class UserProfileInline(admin.StackedInline):

    model = UserProfile
    can_delete = False
    extra = 0


@admin.register(User)
class UserAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "email",
        "role",
        "status",
        "is_verified",
        "created_at",
    )

    list_filter = (
        "role",
        "status",
        "is_verified",
    )

    search_fields = (
        "email",
        "phone",
    )

    ordering = (
        "-created_at",
    )

    inlines = (
        UserProfileInline,
    )

    readonly_fields = (
        "created_at",
        "updated_at",
    )

    list_per_page = 50


