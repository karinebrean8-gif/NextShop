
from django.contrib import admin
from .models import PaymentTransaction

@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    # Controls columns displayed in list view. No heavy computations here.
    list_display = (
        "transaction_id", 
        "order_id", 
        "payment_method", 
        "amount", 
        "currency", 
        "status", 
        "created_at"
    )
    
    # Filter matrix using indexed fields exclusively
    list_filter = ("status", "payment_method", "created_at")
    
    # Exact match indexing optimizations for massive tables (bypasses costly SQL LIKE statements)
    search_fields = ("=transaction_id", "=order_id")
    
    # Prevent accidental administrative overrides on finalized states
    readonly_fields = (
        "transaction_id", 
        "order_id", 
        "amount", 
        "currency", 
        "payment_method", 
        "provider_raw_response", 
        "created_at", 
        "updated_at"
    )
    
    # Optimization: Prevent Django admin from performing massive COUNT(*) queries on giant tables
    show_full_result_count = False
    
    # UI configurations for fast pagination
    list_per_page = 100

    def has_add_permission(self, request) -> bool:
        """Transactions are engine-driven only. Manual creation is structurally forbidden."""
        return False

    def has_delete_permission(self, request, obj=None) -> bool:
        """Immutable financial ledger protection layer."""
        return False
