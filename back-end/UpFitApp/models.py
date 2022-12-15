from django.db import models

# Create your models here.

class Registers(models.Model):
    customerId = models.AutoField(primary_key=True)
    customerName = models.CharField(max_length=500)
    frequency = models.CharField(max_length=500)
    startDate = models.DateField()
    plan = models.CharField(max_length=500)
    value = models.IntegerField()
    note = models.CharField(max_length=800)

class Payments(models.Model):
    paymentId = models.AutoField(primary_key=True)
    paymentDate = models.DateField()
    customerName = models.CharField(max_length=500)
    plan = models.CharField(max_length=500)
    frequency = models.CharField(max_length=500)
    dueDate = models.IntegerField()
    value = models.IntegerField()
    status = models.CharField(max_length=500)
    note = models.CharField(max_length=800)

class Expenses(models.Model):
    expenseId = models.AutoField(primary_key=True)
    expenseName = models.CharField(max_length=500)
    dueDate = models.DateField()
    value = models.FloatField()
    note = models.CharField(max_length=800)