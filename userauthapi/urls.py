from unicodedata import name
from django.urls import path, include
from . import views 

urlpatterns = [
    path('', views.apiOverview, name = "api-overview"),
    path('user/', views.current_user, name = "current_user"),
    path('isauth/', views.is_auth, name = "current_user"),
    path('login/', views.login, name = "login"),
    path('logout/', views.logout, name = "login"),
    path('register/', views.register, name = "register"),

]

