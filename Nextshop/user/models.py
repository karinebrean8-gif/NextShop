from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):

        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):

        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    ROLE_CHOICES = (
        ("customer", "Customer"),
        ("admin", "Admin"),
        ("SELLER", "Seller"),
        ("vendor", "Vendor"),
        ("support", "Support"),
    )   

    STATUS_CHOICES = (
        ("active", "Active"),
        ("inactive", "Inactive"),
        ("blocked", "Blocked"),
        ("deleted", "Deleted"),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    email = models.EmailField(
        unique=True,
        db_index=True
    )

    first_name = models.CharField(
        max_length=100
    )

    last_name = models.CharField(
        max_length=100
    )

    phone = models.CharField(
        max_length=20,
        blank=True,
        db_index=True
    )

    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES,
        default="customer"
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="active"
    )

    is_verified = models.BooleanField(
        default=False
    )

    avatar = models.URLField(
        blank=True
    )

    last_login_ip = models.GenericIPAddressField(
        null=True,
        blank=True
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

    is_active = models.BooleanField(
        default=True
    )

    is_staff = models.BooleanField(
        default=False
    )

    objects = UserManager()

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = []

    class Meta:

        db_table = "users"

        ordering = (
            "-created_at",
        )

        indexes = (
            models.Index(fields=("email",)),
            models.Index(fields=("phone",)),
            models.Index(fields=("role",)),
            models.Index(fields=("status",)),
        )

    def __str__(self):
        return self.email


class UserProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    address = models.TextField(
        blank=True
    )

    city = models.CharField(
        max_length=100,
        blank=True
    )

    country = models.CharField(
        max_length=100,
        blank=True
    )

    postal_code = models.CharField(
        max_length=20,
        blank=True
    )

    gender = models.CharField(
        max_length=20,
        blank=True
    )

    date_of_birth = models.DateField(
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    updated_at = models.DateTimeField(
        auto_now=True
    )

    class Meta:
        db_table = "user_profiles"

    def __str__(self):
        return self.user.email
    
