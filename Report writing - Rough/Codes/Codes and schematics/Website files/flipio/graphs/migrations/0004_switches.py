# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-23 15:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('graphs', '0003_temp'),
    ]

    operations = [
        migrations.CreateModel(
            name='Switches',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Slider', models.IntegerField()),
                ('Buttons', models.BooleanField(default=False)),
            ],
        ),
    ]
