from django.contrib import admin
from django.urls import path, include
from app import views, user_login
from django.conf import settings

urlpatterns = [
    path("accounts/register", user_login.register, name="register"),
    path("doLogin", user_login.doLogin, name="login"),
    path("doindex", views.index, name="index"),
]
