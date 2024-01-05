# Generated by Django 4.2.6 on 2023-11-22 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0004_remove_user_photo'),
    ]

    operations = [
        migrations.CreateModel(
            name='postTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('price', models.CharField(max_length=200)),
                ('photo', models.ImageField(blank=True, max_length=200, null=True, upload_to='')),
            ],
        ),
    ]
