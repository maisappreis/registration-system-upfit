from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from UpFitApp.models import Registers, Payments, Expenses
from UpFitApp.serializers import RegisterSerializer, PaymentSerializer, ExpenseSerializer

from django.core.files.storage import default_storage

@csrf_exempt
def registerApi(request, id = 0):
    if request.method == "GET":
        registers = Registers.objects.all()
        registers_serializer = RegisterSerializer(registers, many = True)
        return JsonResponse(registers_serializer.data, safe = False)
    elif request.method == "POST":
        register_data = JSONParser().parse(request)
        registers_serializer = RegisterSerializer(data = register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        register_data = JSONParser().parse(request)
        register = Registers.objects.get(customerId = register_data["customerId"])
        registers_serializer = RegisterSerializer(register, data = register_data)
        if registers_serializer.is_valid():
            registers_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "DELETE":
        register = Registers.objects.get(customerId = id)
        register.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)


@csrf_exempt
def paymentApi(request, id = 0):
    if request.method == "GET":
        payments = Payments.objects.all()
        payments_serializer = PaymentSerializer(payments, many = True)
        return JsonResponse(payments_serializer.data, safe = False)
    elif request.method == "POST":
        payment_data = JSONParser().parse(request)
        payments_serializer = PaymentSerializer(data = payment_data)
        if payments_serializer.is_valid():
            payments_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        payment_data = JSONParser().parse(request)
        payment = Payments.objects.get(paymentId = payment_data["paymentId"])
        payments_serializer = PaymentSerializer(payment, data = payment_data)
        if payments_serializer.is_valid():
            payments_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "DELETE":
        payment = Payments.objects.get(paymentId = id)
        payment.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)

@csrf_exempt
def expenseApi(request, id = 0):
    if request.method == "GET":
        expenses = Expenses.objects.all()
        expenses_serializer = ExpenseSerializer(expenses, many = True)
        return JsonResponse(expenses_serializer.data, safe = False)
    elif request.method == "POST":
        expense_data = JSONParser().parse(request)
        expenses_serializer = ExpenseSerializer(data = expense_data)
        if expenses_serializer.is_valid():
            expenses_serializer.save()
            return JsonResponse("Adicionado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "PUT":
        expense_data = JSONParser().parse(request)
        expense = Expenses.objects.get(expenseId = expense_data["expenseId"])
        expenses_serializer = ExpenseSerializer(expense, data = expense_data)
        if expenses_serializer.is_valid():
            expenses_serializer.save()
            return JsonResponse("Atualizado com sucesso!", safe = False)
        return JsonResponse("Operação falhou!", safe = False)
    elif request.method == "DELETE":
        expense = Expenses.objects.get(expenseId = id)
        expense.delete()
        return JsonResponse("Excluído com sucesso!", safe = False)