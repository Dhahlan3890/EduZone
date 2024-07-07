from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
# Create your models here.

class User(AbstractUser):
    groups = models.ManyToManyField(
        Group,
        related_name='myapp_user_set',  # Custom related name
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='myapp_user_set',  # Custom related name
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
    username = models.CharField(default="", max_length=100)
    email = models.EmailField(unique = True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(default="", max_length=100)
    bio = models.CharField(default="", max_length=1000)
    verified = models.BooleanField(default = False)
    role = models.CharField(default="", max_length=100)
    institute = models.CharField(default="", max_length=100, blank=True, null=True)
    profile_username = models.CharField(default="", max_length=100)
    profile_email = models.EmailField(default="")

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)