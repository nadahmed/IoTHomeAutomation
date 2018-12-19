from django.shortcuts import render
from rest_framework import generics
from .serializers import PowerSerializer, TempSerializer, SwitchesSerializer
from .models import Power, Temp, Switches



def switch(request):
    return render(request,'graphs/switch.html')

def chart(request):
    return render(request,'graphs/charts.html')

def index(request):
    return render(request,'graphs/homepage.html')


class PowerApiView(generics.ListCreateAPIView):
    queryset = Power.objects.all()
    serializer_class = PowerSerializer

    def perform_create(self, serializer):
        serializer.save()

class TempApiView(generics.ListCreateAPIView):
    queryset = Temp.objects.all()
    serializer_class = TempSerializer

    def perform_create(self, serializer):
        serializer.save()

class SwitchesApiView(generics.ListCreateAPIView):
    queryset = Switches.objects.all()
    serializer_class = SwitchesSerializer

    def perform_create(self, serializer):
        serializer.save()