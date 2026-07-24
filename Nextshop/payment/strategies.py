
from abc import ABC, abstractmethod
from typing import Any, Dict, Tuple

class BasePaymentStrategy(ABC):
    """Principal Level Abstract Base Class for ultra-performance payment rails."""
    
    @abstractmethod
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        """
        Initializes the payment.
        Returns a Tuple of (Internal_Status, Provider_Response_Data)
        """
        pass

    @abstractmethod
    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        """
        Validates the raw webhook securely.
        Returns a Tuple of (Transaction_ID, Is_Valid)
        """
        pass


class StripeStrategy(BasePaymentStrategy):
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        return ("PENDING", {"stripe_client_secret": "st_test_xyz123", "mode": "intent"})

    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        return ("txn_stripe_999", True)


class VisaDirectStrategy(BasePaymentStrategy):
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        return ("SUCCESS", {"approval_code": "00", "rrn": "123456789012"})

    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        return ("txn_visa_888", True)


class BkashStrategy(BasePaymentStrategy):
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        return ("PENDING", {"bkash_url": "https://checkout.bkash.com/payment"})

    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        return ("txn_bkash_777", True)


class BinanceCryptoStrategy(BasePaymentStrategy):
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        return ("PENDING", {"qrcode_data": "binance://payment/...", "currency": "USDT"})

    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        return ("txn_crypto_666", True)


class CodStrategy(BasePaymentStrategy):
    def initialize_transaction(self, payload: Dict[str, Any]) -> Tuple[str, Dict[str, Any]]:
        return ("SUCCESS", {"message": "Order marked for COD fulfillment"})

    def verify_webhook(self, headers: Dict[str, Any], body: bytes) -> Tuple[str, bool]:
        return ("txn_cod_000", True)

