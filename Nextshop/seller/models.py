from django.db import models
from django.core.validators import (
    MinValueValidator,
    MaxValueValidator
)


class Seller(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("active", "Active"),
        ("suspended", "Suspended"),
        ("rejected", "Rejected"),
    )

    BUSINESS_TYPE_CHOICES = (
        ("individual", "Individual"),
        ("company", "Company"),
        ("enterprise", "Enterprise"),
    )

    user_id = models.BigIntegerField(
        unique=True,
        db_index=True
    )

    shop_name = models.CharField(
        max_length=255,
        unique=True
    )

    shop_slug = models.SlugField(
        unique=True,
        db_index=True
    )

    business_type = models.CharField(
        max_length=20,
        choices=BUSINESS_TYPE_CHOICES,
        default="individual"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    email = models.EmailField()

    phone = models.CharField(
        max_length=30
    )

    logo = models.URLField(
        blank=True
    )

    banner = models.URLField(
        blank=True
    )

    description = models.TextField(
        blank=True
    )

    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=(
            MinValueValidator(0),
            MaxValueValidator(5),
        )
    )

    total_products = models.PositiveIntegerField(
        default=0
    )

    total_orders = models.PositiveIntegerField(
        default=0
    )

    total_sales = models.DecimalField(
        max_digits=14,
        decimal_places=2,
        default=0
    )

    commission_rate = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        default=10.00
    )

    metadata = models.JSONField(
        default=dict,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        db_table = "sellers"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(fields=("status",)),
            models.Index(fields=("shop_slug",)),
            models.Index(fields=("user_id",)),
        )

    def __str__(self):
        return self.shop_name
