from channels.routing import route
from graphs.consumers import ws_connect, ws_message, ws_disconnect
from django.conf.urls import include

channel_routing = [
    route("websocket.connect", ws_connect, path=r"^/(?P<link_name>[a-zA-Z0-9_]+)/$"),
    route("websocket.receive", ws_message, path=r"^/(?P<link_name>[a-zA-Z0-9_]+)/$"),
    route("websocket.disconnect", ws_disconnect, path=r"^/(?P<link_name>[a-zA-Z0-9_]+)/$"),
]
