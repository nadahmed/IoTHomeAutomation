from django.db import models

# Create your models here.


class Switches(models.Model):
    Slider = models.PositiveSmallIntegerField()
    Button = models.BooleanField(default=False)

class Power(models.Model):
    VoltsRMS = models.DecimalField(max_digits=6, decimal_places=2)
    CurrentRMS = models.DecimalField(max_digits=6, decimal_places=2)
    ApparentPower = models.DecimalField(max_digits=6, decimal_places=2)
    TruePower = models.DecimalField(max_digits=6, decimal_places=2)
    ReactivePower = models.DecimalField(max_digits=6, decimal_places=2)
    Pf = models.DecimalField(max_digits=3, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return "{}".format(self.id)

class Temp(models.Model):
    temperature = models.DecimalField(max_digits=6, decimal_places=2)
    date_created = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return "{}".format(self.id)