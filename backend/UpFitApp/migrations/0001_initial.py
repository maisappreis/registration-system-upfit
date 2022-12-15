# Generated by Django 4.1 on 2022-08-11 15:07

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Expenses',
            fields=[
                ('expenseId', models.AutoField(primary_key=True, serialize=False)),
                ('expenseName', models.CharField(max_length=500)),
                ('dueDate', models.DateField()),
                ('value', models.FloatField()),
                ('note', models.CharField(max_length=800)),
            ],
        ),
        migrations.CreateModel(
            name='Payments',
            fields=[
                ('paymentId', models.AutoField(primary_key=True, serialize=False)),
                ('paymentDate', models.DateField()),
                ('customerName', models.CharField(max_length=500)),
                ('plan', models.CharField(max_length=500)),
                ('frequency', models.CharField(max_length=500)),
                ('dueDate', models.IntegerField()),
                ('value', models.IntegerField()),
                ('status', models.CharField(max_length=500)),
                ('note', models.CharField(max_length=800)),
            ],
        ),
        migrations.CreateModel(
            name='Registers',
            fields=[
                ('customerId', models.AutoField(primary_key=True, serialize=False)),
                ('customerName', models.CharField(max_length=500)),
                ('frequency', models.CharField(max_length=500)),
                ('startDate', models.DateField()),
                ('plan', models.CharField(max_length=500)),
                ('value', models.IntegerField()),
                ('note', models.CharField(max_length=800)),
            ],
        ),
    ]
