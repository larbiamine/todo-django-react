from .models import Task
b = Task(title='take a dump', completed=False)
b.save()
b = Task(title='take a nap', completed=False)
b.save()
b = Task(title='take money', completed=False)
b.save()