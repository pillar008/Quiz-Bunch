from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from app.emailbackend import emailbackend

# from django.contrib.auth.decorators import login_required


def index(request):
    return render(request, "index.html")


def about(request):
    return render(request, "registration/about.html")


def contact(request):
    # Your view logic goes here
    return render(request, "registration/contact.html")
