from django.shortcuts import render
from django.http import JsonResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import TaskSerializer
from .models import Task
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List':'/task-list/',
        'Detail View':'/task-detail/<str:pk>',
        'Create':'/task-create',
        'Update':'/task-update/<str:pk>',
        'Delete':'/task-delete/<str:pk>',
    }
    return Response( api_urls )

@api_view(['GET'])
def taskList(request):
    if str(request.user) != "AnonymousUser":
        # tasks = Task.objects.all()
        tasks = request.user.todolist.all()
        serializer = TaskSerializer(tasks, many = True)
        return Response(serializer.data)
    return Response("")

@api_view(['GET'])
def taskDetail(request, pk):
    tasks = Task.objects.get(id = pk)
    serializer = TaskSerializer(tasks, many = False)
    
    return Response(serializer.data)

@api_view(['POST'])
def taskCreate(request):

    # title = request.POST['title']
    title = request.data['title']
    completed = request.data['completed']
    # completed = request.POST['completed']
    t = Task(
        title=title, 
        completed=completed
        )
    t.save()
    request.user.todolist.add(t)

    return Response(request.data)

@api_view(['POST'])
def taskUpdate(request, pk):
    t = Task.objects.get(id = pk)    
    serializer = TaskSerializer(instance = t, data = request.data)    
    if serializer.is_valid():
        serializer.save( )    
    return Response(serializer.data)

@api_view(['DELETE'])
def taskDelete(request, pk):
    t = Task.objects.get(id = pk)    
    t.delete()
    return Response("DELETED !!!")

