from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator


class Order(models.Model):

    order_number = models.CharField(
        max_length=50,
        unique=True
    )

    class Meta:
        db_table = "orders"

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):

    STATUS_CHOICES = (
        ("active", "Active"),
        ("cancelled", "Cancelled"),
        ("returned", "Returned"),
        ("refunded", "Refunded"),
    )

    order = models.ForeignKey(
        Order,
        related_name="items",
        on_delete=models.CASCADE
    )

    product_id = models.BigIntegerField(
        db_index=True
    )

    variant_id = models.BigIntegerField(
        null=True,
        blank=True,
        db_index=True
    )

    sku = models.CharField(
        max_length=120,
        db_index=True
    )

    product_name_snapshot = models.CharField(
        max_length=255
    )

    product_image_snapshot = models.URLField(
        blank=True
    )

    quantity = models.PositiveIntegerField(
        validators=(
            MinValueValidator(1),
        )
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    discount_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    tax_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    currency = models.CharField(
        max_length=10,
        default="USD"
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="active"
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

        db_table = "order_items"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(
                fields=("order",)
            ),
            models.Index(
                fields=("product_id",)
            ),
            models.Index(
                fields=("sku",)
            ),
            models.Index(
                fields=("status",)
            ),
        )

        unique_together = (
            ("order", "product_id", "variant_id"),
        )

    @property
    def subtotal(self):
        return self.quantity * self.unit_price

    def __str__(self):
        return self.product_name_snapshot
