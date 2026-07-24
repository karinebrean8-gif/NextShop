
from typing import Dict, Final
from .constants import SUPPORTED_METHODS
from .strategies import (
    BasePaymentStrategy, StripeStrategy, VisaDirectStrategy, 
    BkashStrategy, BinanceCryptoStrategy, CodStrategy
)

_stripe = StripeStrategy()
_visa = VisaDirectStrategy()
_bkash = BkashStrategy()
_binance = BinanceCryptoStrategy()
_cod = CodStrategy()

GATEWAY_ROUTING_MATRIX: Final[Dict[str, BasePaymentStrategy]] = {
    "CARD_STRIPE": _stripe,
    "CARD_VISA_DIRECT": _visa,
    "MFS_BKASH": _bkash,
    "CRYPTO_BINANCE": _binance,
    "OFFLINE_COD": _cod,
   
}
