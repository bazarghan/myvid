from django.shortcuts import render

# Create your views here.


def index(request):
    context = {}
    return render(request, "index.html", context)


def manifest(request):

    return render(request, "manifest.json")


def room(request, key):
    context = {}
    return render(request, "index.html", context)
