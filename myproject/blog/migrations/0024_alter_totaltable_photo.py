# Generated by Django 4.2.6 on 2023-12-27 04:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0023_totaltable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='totaltable',
            name='photo',
            field=models.ImageField(blank=True, max_length=500, null=True, upload_to=''),
        ),
    ]
