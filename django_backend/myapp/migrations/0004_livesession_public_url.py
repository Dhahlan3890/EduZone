# Generated by Django 5.0.6 on 2024-08-24 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_livesession'),
    ]

    operations = [
        migrations.AddField(
            model_name='livesession',
            name='public_url',
            field=models.CharField(blank=True, max_length=500, null=True),
        ),
    ]
