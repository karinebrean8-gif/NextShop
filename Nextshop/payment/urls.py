# urls.py
from django.urls import path
from .views import process_payment_gateway

urlpatterns = [
    path(
        "api/v1/gateway/process/", 
        process_payment_gateway, 
        name="gateway_process_core"
    ),
]