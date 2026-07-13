from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator


class Cart(models.Model):

    STATUS_CHOICES = (
        ("active", "Active"),
        ("abandoned", "Abandoned"),
        ("converted", "Converted"),
        ("deleted", "Deleted"),
    )

    user_id = models.BigIntegerField(
        db_index=True
    )

    session_id = models.CharField(
        max_length=255,
        db_index=True,
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    currency = models.CharField(
        max_length=10,
        default="USD"
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
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

        db_table = "carts"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(fields=("user_id",)),
            models.Index(fields=("session_id",)),
            models.Index(fields=("status",)),
        )

    def __str__(self):
        return f"Cart-{self.id}"


class CartItem(models.Model):

    STATUS_CHOICES = (
        ("active", "Active"),
        ("removed", "Removed"),
        ("saved", "Saved For Later"),
    )

    cart = models.ForeignKey(
        Cart,
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

    product_name = models.CharField(
        max_length=255
    )

    image = models.URLField(
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

    sale_price = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
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

    status = models.CharField(
        max_length=20,
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

        db_table = "cart_items"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(fields=("cart",)),
            models.Index(fields=("product_id",)),
            models.Index(fields=("sku",)),
            models.Index(fields=("status",)),
        )

        unique_together = (
            ("cart", "product_id", "variant_id"),
        )

    @property
    def subtotal(self):
        return self.quantity * self.sale_price

    def __str__(self):
        return self.product_name
