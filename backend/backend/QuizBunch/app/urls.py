from django.contrib import admin
from django.urls import path, include
from app import views, user_login
from django.conf import settings
from . import views

urlpatterns = [
    path("accounts/register", user_login.register, name="register"),
    path("doLogin", user_login.doLogin, name="doLogin"),
    path("", views.index, name="index"),
    path("about.html", views.about, name="about"),
    path("contact.html", views.contact, name="contact"),
    path("service", views.service, name="service"),
    path("admin.html", user_login.admin, name="admin.html"),
]
