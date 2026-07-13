from decimal import Decimal

from django.db import models
from django.core.validators import MinValueValidator


class Order(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("processing", "Processing"),
        ("shipped", "Shipped"),
        ("delivered", "Delivered"),
        ("cancelled", "Cancelled"),
        ("refunded", "Refunded"),
    )

    PAYMENT_STATUS_CHOICES = (
        ("pending", "Pending"),
        ("paid", "Paid"),
        ("failed", "Failed"),
        ("refunded", "Refunded"),
    )

    order_number = models.CharField(
        max_length=50,
        unique=True,
        db_index=True
    )

    user_id = models.BigIntegerField(
        db_index=True
    )

    status = models.CharField(
        max_length=30,
        choices=STATUS_CHOICES,
        default="pending"
    )

    payment_status = models.CharField(
        max_length=30,
        choices=PAYMENT_STATUS_CHOICES,
        default="pending"
    )

    subtotal = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    tax_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    shipping_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    discount_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    total_amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=Decimal("0.00")
    )

    currency = models.CharField(
        max_length=10,
        default="USD"
    )

    shipping_address = models.JSONField(
        default=dict
    )

    billing_address = models.JSONField(
        default=dict
    )

    notes = models.TextField(
        blank=True
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
    
    user = models.ForeignKey( on_delete=models.CASCADE

    )
    class Meta:

        db_table = "orders"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(
                fields=("user_id",)
            ),
            models.Index(
                fields=("status",)
            ),
            models.Index(
                fields=("payment_status",)
            ),
        )

    def __str__(self):
        return self.order_number


class OrderItem(models.Model):

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
        blank=True
    )

    sku = models.CharField(
        max_length=120
    )

    product_name = models.CharField(
        max_length=255
    )

    quantity = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1)
        ]
    )

    unit_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    total_price = models.DecimalField(
        max_digits=12,
        decimal_places=2
    )

    class Meta:

        db_table = "order_items"

        indexes = (
            models.Index(
                fields=("product_id",)
            ),
        )

        unique_together = (
            ("order", "product_id", "variant_id"),
        )

    def __str__(self):
        return self.product_name
