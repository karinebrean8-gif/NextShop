from django.db import models 
from django.utils.text import slugify
from django.contrib.auth import get_user_model

User = get_user_model()

# ========== MASSIVE DICTIONARY/TUPLE CONSTANTS ==========
PRODUCT_STATUS = (
    ('draft', 'Draft'),
    ('published', 'Published'),
    ('archived', 'Archived'),
    ('out_of_stock', 'Out of Stock'),
)

STOCK_STATUS = (
    ('in_stock', 'In Stock'),
    ('low_stock', 'Low Stock < 10'),
    ('out_of_stock', 'Out of Stock'),
    ('pre_order', 'Pre Order'),
    ('discontinued', 'Discontinued'),
)

VARIANT_TYPE = (
    ('size', 'Size'),
    ('color', 'Color'),
    ('material', 'Material'),
    ('storage', 'Storage'),
    ('ram', 'RAM'),
    ('weight', 'Weight'),
)

CURRENCY = (
    ('BDT', 'Bangladeshi Taka ৳'),
    ('USD', 'US Dollar $'),
    ('EUR', 'Euro €'),
)

WEIGHT_UNIT = (
    ('kg', 'Kilogram'),
    ('g', 'Gram'),
    ('lb', 'Pound'),
)

PRODUCT_TAGS = (
    ('new_arrival', 'New Arrival'),
    ('bestseller', 'Bestseller'),
    ('trending', 'Trending'),
    ('clearance', 'Clearance'),
)

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"
        indexes = [models.Index(fields=['slug'])]

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True, blank=True)
    logo = models.ImageField(upload_to='brands/', blank=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    name = models.CharField(max_length=500, db_index=True)
    slug = models.SlugField(unique=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True, related_name='products')
    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    currency = models.CharField(max_length=3, choices=CURRENCY, default='BDT')
    
    stock = models.IntegerField(default=0)
    stock_status = models.CharField(max_length=20, choices=STOCK_STATUS, default='in_stock')
    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='draft')
    
    weight = models.DecimalField(max_digits=6, decimal_places=2, null=True, blank=True)
    weight_unit = models.CharField(max_length=5, choices=WEIGHT_UNIT, default='kg')
    
    tags = models.CharField(max_length=50, choices=PRODUCT_TAGS, blank=True)
    is_featured = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    
    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)
    
    seller = models.ForeignKey(User, on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['status', 'is_featured']),
            models.Index(fields=['-created_at']),
        ]

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if self.stock == 0:
            self.stock_status = 'out_of_stock'
        elif self.stock < 10:
            self.stock_status = 'low_stock'
        else:
            self.stock_status = 'in_stock'
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class ProductVariant(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    variant_type = models.CharField(max_length=20, choices=VARIANT_TYPE)
    value = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    stock = models.IntegerField(default=0)
    sku = models.CharField(max_length=100, unique=True, db_index=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.product.name} - {self.variant_type}: {self.value}"
