from decimal import Decimal
from django.db import models
from django.core.validators import MinValueValidator


class Cart(models.Model):
    user_id = models.BigIntegerField(db_index=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "cart"

    def __str__(self):
        return f"Cart-{self.pk}"


class CartItem(models.Model):

    STATUS_CHOICES = (
        ("active", "Active"),
        ("saved", "Saved For Later"),
        ("removed", "Removed"),
    )

    cart = models.ForeignKey(
        Cart,
        related_name="items",
        on_delete=models.CASCADE,
    )

    product_id = models.BigIntegerField(db_index=True)

    variant_id = models.BigIntegerField(
        null=True,
        blank=True,
        db_index=True
    )

    sku = models.CharField(
        max_length=120,
        db_index=True
    )

    quantity = models.PositiveIntegerField(
        default=1,
        validators=[MinValueValidator(1)]
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

    product_name_snapshot = models.CharField(
        max_length=255
    )

    image_snapshot = models.URLField(
        blank=True
    )

    currency = models.CharField(
        max_length=10,
        default="USD"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    is_checked_out = models.BooleanField(
        default=False
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
        db_table = "cart_item"

        ordering = ("-created_at",)

        indexes = (
            models.Index(
                fields=("cart", "product_id")
            ),
            models.Index(
                fields=("status",)
            ),
            models.Index(
                fields=("sku",)
            ),
        )

        unique_together = (
            ("cart", "product_id", "variant_id"),
        )

    @property
    def subtotal(self):
        return self.quantity * self.sale_price

    def __str__(self):
        return f"{self.product_name_snapshot}"

