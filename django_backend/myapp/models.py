#models.py

from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver
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



class Profile_img(models.Model):
    profile_img = models.ImageField(upload_to='profile_images/')


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(default="", max_length=100)
    bio = models.CharField(default="", max_length=1000)
    verified = models.BooleanField(default = False)
    role = models.CharField(default="", max_length=100)
    institute = models.CharField(default="", max_length=100, blank=True, null=True)
    profile_username = models.CharField(default="", max_length=100)
    profile_email = models.EmailField(default="")
    profile_img = models.ForeignKey(Profile_img, on_delete=models.CASCADE, null=True, blank=True)
    

def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except Profile.DoesNotExist:
        Profile.objects.create(user=instance)

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


@receiver(pre_delete, sender=User)
def delete_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.delete()
    except Profile.DoesNotExist:
        pass


class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses')

class Subtitle(models.Model):
    course = models.ForeignKey(Course, related_name='subtitles', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()

class SubtitleFile(models.Model):
    subtitle = models.ForeignKey(Subtitle, related_name='files', on_delete=models.CASCADE)
    file = models.FileField(upload_to='subtitles/files/')

class SubtitleVideo(models.Model):
    subtitle = models.ForeignKey(Subtitle, related_name='videos', on_delete=models.CASCADE)
    video = models.FileField(upload_to='subtitles/videos/')

# class CourseFile(models.Model):
#     course = models.ForeignKey(Course, related_name='files', on_delete=models.CASCADE)
#     file = models.FileField(upload_to='courses/files/')

class CourseImage(models.Model):
    course = models.ForeignKey(Course, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='courses/images/')

# class CourseVideo(models.Model):
#     course = models.ForeignKey(Course, related_name='videos', on_delete=models.CASCADE)
#     video = models.FileField(upload_to='courses/videos/')

class Enrollment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    student = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='enrollments')

    class Meta:
        unique_together = ('course', 'student')

    def __str__(self):
        return f"{self.student.user.username} enrolled in {self.course.title}"
    

class Notification(models.Model):
    message = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message