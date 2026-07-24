
from django.contrib import admin
from .models import PaymentTransaction

@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = (
        "transaction_id", 
        "order_id", 
        "payment_method", 
        "amount", 
        "currency", 
        "status", 
        "created_at"
    )
    
    list_filter = ("status", "payment_method", "created_at")
    search_fields = ("=transaction_id", "=order_id")
    
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
    
    show_full_result_count = False
    
        list_per_page = 100

    def has_add_permission(self, request) -> bool:
        """Transactions are engine-driven only. Manual creation is structurally forbidden."""
        return False
        
    def has_delete_permission(self, request, obj=None) -> bool:
        """Immutable financial ledger protection layer."""
        return False
