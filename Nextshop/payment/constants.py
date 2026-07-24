import typing

SUPPORTED_METHODS: typing.Final[tuple[str, ...]] = (
    "CARD_STRIPE",
    "CARD_PAYPAL",
    "CARD_VISA_DIRECT",
    "CARD_MASTERCARD_GATEWAY",
    "MFS_BKASH",
    "MFS_NAGAD",
    "CRYPTO_BINANCE",
    "OFFLINE_COD",
    "AGGREGATOR_SSLCOMMERZ",
)

STATUS_PENDING: typing.Final[str] = "PENDING"
STATUS_SUCCESS: typing.Final[str] = "SUCCESS"
STATUS_FAILED: typing.Final[str] = "FAILED"
STATUS_REFUNDED: typing.Final[str] = "REFUNDED"

TRANSACTION_STATUSES: typing.Final[tuple[str, ...]] = (
    STATUS_PENDING,
    STATUS_SUCCESS,
    STATUS_FAILED,
    STATUS_REFUNDED,
)
