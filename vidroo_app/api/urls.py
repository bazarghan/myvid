from django.urls import path
from .views.signup import signup
from .views.login import login
from .views.refresh import refresh
from .views.panel import panel
from .views.test import testapi
from .views.profile import profile
from .views.room import room
from .views.chat import chat
from .views.help import help
from .views.uservalidator import validator
from .views.roomuser import roomuser

urlpatterns = [
    path('signup/', signup),
    path('login/', login),
    path('refresh/', refresh),
    path('panel/', panel),
    path('testapi/', testapi),
    path('profile/', profile),
    path('room/<str:key>/', room),
    path('chat/<str:key>/', chat),
    path('help/', help),
    path('validator/<str:key1>/<str:key2>/', validator),
    path('roomuser/<str:key>/', roomuser),
    path('roomuser/', roomuser)

]
