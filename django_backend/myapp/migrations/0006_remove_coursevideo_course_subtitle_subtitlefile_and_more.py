# Generated by Django 5.0.6 on 2024-08-28 02:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0005_delete_livesession'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coursevideo',
            name='course',
        ),
        migrations.CreateModel(
            name='Subtitle',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='subtitles', to='myapp.course')),
            ],
        ),
        migrations.CreateModel(
            name='SubtitleFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='subtitles/files/')),
                ('subtitle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='files', to='myapp.subtitle')),
            ],
        ),
        migrations.CreateModel(
            name='SubtitleVideo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('video', models.FileField(upload_to='subtitles/videos/')),
                ('subtitle', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='videos', to='myapp.subtitle')),
            ],
        ),
        migrations.DeleteModel(
            name='CourseFile',
        ),
        migrations.DeleteModel(
            name='CourseVideo',
        ),
    ]
