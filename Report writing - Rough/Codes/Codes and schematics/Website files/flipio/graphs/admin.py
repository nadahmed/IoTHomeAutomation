from django.contrib import admin

# Register your models here.
from .models import Power, Temp, Switches

admin.site.register(Power)
admin.site.register(Temp)
admin.site.register(Switches)