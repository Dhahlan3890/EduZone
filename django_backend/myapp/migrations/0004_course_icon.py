# Generated by Django 5.0.6 on 2024-07-16 14:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_notification'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='icon',
            field=models.ImageField(blank=True, null=True, upload_to='course_icons/'),
        ),
    ]