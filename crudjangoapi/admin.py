from django.contrib import admin
from ..api.models import Task
from django.contrib.auth.admin import UserAdmin

admin.site.register(Task)
admin.register(Task, UserAdmin)