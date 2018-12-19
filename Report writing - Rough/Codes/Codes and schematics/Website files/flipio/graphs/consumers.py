# In consumers.py
from channels import Channel, Group
from channels.sessions import channel_session
from channels.auth import channel_session_user, channel_session_user_from_http

# Connected to websocket.connect
@channel_session_user_from_http
def ws_connect(message,link_name):
    # Add them to the right group
    Group("chat-%s" % link_name).add(message.reply_channel)
    # Accept the connection request
    message.reply_channel.send({"accept": True})
    if link_name == 'switches':

        try:
            mess
        except:
            pass
        else:
            Group("chat-%s" % link_name).send({
            "text": mess,
            })


# Connected to websocket.receive
@channel_session_user
def ws_message(message, link_name):
    global mess
    if link_name == 'switches':
        if message.content['text'] != 'Connected to Switches':
            mess=message.content['text']

    Group("chat-%s" % link_name).send({
        "text": message.content['text'],

    })
    print(message.content['text'])



# Connected to websocket.disconnect
@channel_session_user
def ws_disconnect(message, link_name):
    Group("chat-%s" % link_name).discard(message.reply_channel)
