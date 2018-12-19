from rest_framework import serializers
from .models import Power, Temp, Switches


class PowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Power
        fields = ('id', 'VoltsRMS','CurrentRMS','ApparentPower','TruePower' ,'ReactivePower', 'Pf', 'date_created')



class TempSerializer(serializers.ModelSerializer):
    class Meta:
        model = Temp
        fields = ('id', 'temperature', 'date_created')

class SwitchesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Switches
        fields = ('id', 'Slider', 'Button')