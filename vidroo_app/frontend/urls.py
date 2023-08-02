from django.urls import path
from .views import index, room, manifest
urlpatterns = [
    path('', index),
    path('login', index),
    path('sign-up', index),
    path('confirm', index),
    path('panel', index),
    path('panel/profile', index),
    path('panel/settings', index),
    path('panel/room', index),
    path('panel/room/<str:key>/', room),
    path('manifest.json', manifest),
    path('join-room/<str:key>/', room),

]
