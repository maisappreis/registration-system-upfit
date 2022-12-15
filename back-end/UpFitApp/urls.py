from django.urls import include, re_path
from UpFitApp import views

from django.conf.urls.static import static
from django.conf import settings

urlpatterns = [
    re_path(r'^register$', views.registerApi),
    re_path(r'^register/([0-9]+)$', views.registerApi),

    re_path(r'^payment$', views.paymentApi),
    re_path(r'^payment/([0-9]+)$', views.paymentApi),

    re_path(r'^expense$', views.expenseApi),
    re_path(r'^expense/([0-9]+)$', views.expenseApi),


]+static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)