from django.urls import path

from . views import home, handle_url


urlpatterns = [
    path('', home, name='home'),
    path('<str:uuid>', handle_url, name="handle_url"),
]
