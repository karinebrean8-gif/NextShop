from django.db import models
from django.utils.text import slugify


PRODUCT_STATUS = (
    ('draft', 'Draft'),
    ('published', 'Published'),
    ('archived', 'Archived'),
)

STOCK_STATUS = (
    ('in_stock', 'In Stock'),
    ('out_of_stock', 'Out of Stock'),
)

VARIANT_TYPE = (
    ('size', 'Size'),
    ('color', 'Color'),
)

class Category(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    parent = models.ForeignKey(
        'self', on_delete=models.CASCADE,
        null=True, blank=True,
        related_name='children'
    )

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='brands/', blank=True)

    def __str__(self):
        return self.name




class Product(models.Model):
    name = models.CharField(max_length=500)
    slug = models.SlugField(unique=True, blank=True)

    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.SET_NULL, null=True)

    description = models.TextField()
    short_description = models.CharField(max_length=300, blank=True)

    price = models.DecimalField(max_digits=10, decimal_places=2)
    discount_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    stock = models.IntegerField(default=0)
    stock_status = models.CharField(max_length=20, choices=STOCK_STATUS, default='in_stock')

    status = models.CharField(max_length=20, choices=PRODUCT_STATUS, default='draft')

    is_featured = models.BooleanField(default=False)

    meta_title = models.CharField(max_length=255, blank=True)
    meta_description = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    is_deleted = models.BooleanField(default=False)

    seller = models.ForeignKey(on_delete=models.CASCADE)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        if self.stock <= 0:
            self.stock_status = 'out_of_stock'
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
    sku = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return f"{self.product.name} - {self.value}"
