# Generated by Django 4.0.2 on 2022-03-27 09:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('newadmin', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='user_coupon',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=100)),
                ('cpn_code', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='newadmin.coupon')),
                ('user_name', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
