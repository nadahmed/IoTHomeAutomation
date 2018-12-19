from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import PowerApiView, TempApiView, SwitchesApiView
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^charts/$', views.chart, name='chart'),
    url(r'^switches/$', views.switch, name='switch'),
    #url(r'^$', views.navBar, name='navBar'),
    url(r'^api/power/$', PowerApiView.as_view(), name="CreatePower"),
    url(r'^api/temp/$', TempApiView.as_view(), name="CreateTemp"),
    url(r'^api/switches/$', SwitchesApiView.as_view(), name="CreateTemp"),

]

urlpatterns=format_suffix_patterns(urlpatterns)