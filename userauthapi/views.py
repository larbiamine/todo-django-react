from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
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
    return Response({
      'username' : user.username,

    })


@api_view(['POST'])
def login(request):
    print("request ============")
    print(request.data)
    username = request.data['username']
    password = request.data['password']
    user = authenticate(request, username=username, password=password) 
    print("username"+username)
    print("pwd"+password)
    if user is not None:
        return Response( "noice" )
        pass
    else:
        # No backend authenticated the credentials
        return Response( "not noice" )


@api_view(['GET'])
def is_auth(request):
    user = request.user.is_authenticated
    return Response(user)