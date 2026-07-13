from django.contrib import admin
from django.utils.html import format_html
from .models import *

class ProductVariantInline(admin.TabularInline):
    model = ProductVariant
    extra = 1
    fields = ('variant_type', 'value', 'sku', 'price', 'stock', 'is_active')

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'parent', 'product_count', 'is_active')
    list_filter = ('parent', 'is_active')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Total Products'

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'slug', 'logo_preview', 'product_count', 'is_active')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('is_active',)
    
    def logo_preview(self, obj):
        return format_html('<img src="{}" width="50" height="50" />', obj.logo.url) if obj.logo else '-'
    logo_preview.short_description = 'Logo'
    
    def product_count(self, obj):
        return obj.products.count()
    product_count.short_description = 'Products'

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'name', 'category', 'brand', 'price', 'discount_price', 
        'stock', 'stock_status', 'status', 'is_featured', 'seller', 'created_at'
    )
    list_filter = ('status', 'stock_status', 'is_featured', 'category', 'brand', 'currency', 'created_at')
    search_fields = ('name', 'id', 'description', 'slug')
    list_editable = ('status', 'is_featured', 'stock')
    readonly_fields = ('slug', 'created_at', 'updated_at', 'stock_status')
    ordering = ('-created_at',)
    inlines = (ProductVariantInline,)
    list_per_page = 100
    fieldsets = (
        ('Basic Info', {'fields': ('name', 'slug', 'category', 'brand', 'seller', 'tags')}),
        ('Pricing', {'fields': ('price', 'discount_price', 'currency')}),
        ('Inventory', {'fields': ('stock', 'stock_status', 'weight', 'weight_unit')}),
        ('Content', {'fields': ('description', 'short_description')}),
        ('SEO', {'fields': ('meta_title', 'meta_description')}),
        ('Status', {'fields': ('status', 'is_featured', 'is_deleted')}),
    )

@admin.register(ProductVariant)
class ProductVariantAdmin(admin.ModelAdmin):
    list_display = ('id', 'product', 'variant_type', 'value', 'price', 'stock', 'sku', 'is_active')
    list_filter = ('variant_type', 'product__category', 'is_active')
    search_fields = ('sku', 'product__name', 'value')
    list_editable = ('price', 'stock', 'is_active')
