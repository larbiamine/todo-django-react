from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
# from .serializers import TaskSerializer
# from .models import Task
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Current user':'/user/',
    }
    return Response( api_urls )

@api_view(['GET'])
def current_user(request):
    user = request.user
    return Response(
      user.username
    )


@api_view(['POST'])
def login(request):
    print("request ============")
    print(request.data)
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password) 

    if user is not None:
        auth_login(request._request, user)
        return Response( "noice" )
        pass
    else:

        return Response( "not noice" )

@api_view(['POST'])
def logout(request):
    auth_logout(request)
    return Response( "logged out" )

@api_view(['POST'])
def register(request):
    print("request ============")
    print(request.data)

    username = request.data['username']
    password = request.data['password']
    email = request.data['email']

    user = User.objects.create_user(username, email, password)
    user.save()

    if user is not None:
        
        return Response( "noice" )
        pass
    else:

        return Response( "not noice" )


@api_view(['GET'])
def is_auth(request):
    user = request.user.is_authenticated
    return Response(user)