from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from app.emailbackend import emailbackend


def register(request):
    if request.method == "POST":
        username = request.POST.get("username")
        email = request.POST.get("email")
        password = request.POST.get("password")

        if User.objects.filter(username=username).exists():
            messages.warning(request, "Username already exists")
            return redirect("register")

        if User.objects.filter(email=email).exists():
            messages.warning(request, "Email already exists")
            return redirect("register")

        user = User(
            username=username,
            email=email,
        )
        user.set_password(password)
        user.save()
        return redirect("doLogin")
    return render(request, "registration/signup.html")


def doLogin(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")

        user = emailbackend.authenticate(request, username=email, password=password)
        if user != None:
            login(request, user)
            return redirect("index")
        else:
            return redirect("doLogin")

    return render(request, "registration/login.html")
