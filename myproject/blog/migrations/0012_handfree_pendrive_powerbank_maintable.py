# Generated by Django 4.2.6 on 2023-12-10 05:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0011_user_cardnumber_user_cvv_user_mm_user_yy'),
    ]

    operations = [
        migrations.CreateModel(
            name='Handfree',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('price', models.CharField(max_length=200)),
                ('photo', models.ImageField(blank=True, max_length=200, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Pendrive',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('price', models.CharField(max_length=200)),
                ('photo', models.ImageField(blank=True, max_length=200, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Powerbank',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=500)),
                ('price', models.CharField(max_length=200)),
                ('photo', models.ImageField(blank=True, max_length=200, null=True, upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Maintable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('handfree', models.ManyToManyField(to='blog.handfree')),
                ('pendrive', models.ManyToManyField(to='blog.pendrive')),
                ('powerbank', models.ManyToManyField(to='blog.powerbank')),
            ],
        ),
    ]