from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

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

@api_view(['GET'])
def is_auth(request):
    user = request.user.is_authenticated
    # if not user:
    #     return Response({
    #     'auth' : "false",
    #     })
    # else:  
    #     return Response({
    #     'auth' : "true",
    #     })  
    return Response(user)