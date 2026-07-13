from django.db import models
from django.utils.text import slugify


class Category(models.Model):

    STATUS_CHOICES = (
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("archived", "Archived"),
    )

    name = models.CharField(
        max_length=255,
        unique=True,
        db_index=True
    )

    slug = models.SlugField(
        max_length=255,
        unique=True,
        db_index=True
    )

    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        related_name="children",
        on_delete=models.CASCADE
    )

    description = models.TextField(
        blank=True
    )

    image = models.URLField(
        blank=True
    )

    icon = models.URLField(
        blank=True
    )

    seo_title = models.CharField(
        max_length=255,
        blank=True
    )

    seo_description = models.TextField(
        blank=True
    )

    sort_order = models.PositiveIntegerField(
        default=0
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    is_featured = models.BooleanField(
        default=False
    )

    metadata = models.JSONField(
        default=dict,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:

        db_table = "categories"

        ordering = (
            "sort_order",
            "name",
        )

        indexes = (
            models.Index(fields=("slug",)),
            models.Index(fields=("status",)),
            models.Index(fields=("parent",)),
        )

    def save(self, *args, **kwargs):

        if not self.slug:
            self.slug = slugify(self.name)

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
