from django.shortcuts import render, redirect

from . models import Url
from . utils import *

BASE_URL = "https://82de301057af.ngrok.io/"
# Create your views here.


def home(request):
    if request.method == "POST":
        link = request.POST['link']
        url = Url.objects.create(link=link)
        hashed = hashing(url.id)
        new_url = BASE_URL + str(hashed)
        url.short_link = new_url
        url.save()

        context = {"url": new_url}
        return render(request, 'home.html', context=context)
    else:
        return render(request, 'home.html')


def handle_url(request, uuid):
    id = unhashing(uuid)
    url = Url.objects.get(pk=id)
    link = url.link
    return redirect(link)
