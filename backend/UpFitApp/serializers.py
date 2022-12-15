from rest_framework import serializers
from UpFitApp.models import Registers, Payments, Expenses

class RegisterSerializer(serializers.ModelSerializer):
    startDate = serializers.DateField(format="%Y-%m-%d")
    class Meta:        
        model = Registers
        fields = ("customerId", "customerName", "frequency", "startDate", "plan", "value", "note")

class PaymentSerializer(serializers.ModelSerializer):
    paymentDate = serializers.DateField(format="%Y-%m-%d")
    class Meta:
        model = Payments
        fields = ("paymentId", "paymentDate", "customerName", "plan", "frequency", "dueDate", "value", "status", "note")

class ExpenseSerializer(serializers.ModelSerializer):
    dueDate = serializers.DateField(format="%Y-%m-%d")
    class Meta:
        model = Expenses
        fields = ("expenseId", "expenseName", "dueDate", "value", "note")