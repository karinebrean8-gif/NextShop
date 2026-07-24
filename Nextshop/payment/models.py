from django.contrib.auth import get_user_model
from django.db import models
from .constants import SUPPORTED_METHODS, TRANSACTION_STATUSES

class PaymentTransaction(models.Model):
    """
    High-throughput transactional ledger.
    Optimized with compound indexing for FAANG-level lookup scaling.
    """
    METHOD_CHOICES = tuple((method, method) for method in SUPPORTED_METHODS)
    STATUS_CHOICES = tuple((status, status) for status in TRANSACTION_STATUSES)

    transaction_id = models.CharField(max_length=128, unique=True, db_index=True)
    order_id = models.CharField(max_length=128, db_index=True)
    amount = models.DecimalField(max_digits=18, decimal_places=4)  
    currency = models.CharField(max_length=16, default="USD")
    User = get_user_model()
    seller = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)

    payment_method = models.CharField(
        max_length=64, 
        choices=METHOD_CHOICES, 
        db_index=True
    )
    status = models.CharField(
        max_length=32, 
        choices=STATUS_CHOICES, 
        default="PENDING", 
        db_index=True
    )
    
    provider_raw_response = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "gateway_payment_transactions"
        indexes = [
            models.Index(fields=["payment_method", "status"]),
            models.Index(fields=["created_at", "status"]),
        ]

    def __str__(self) -> str:
        return f"{self.transaction_id} -> {self.payment_method} ({self.status})"
