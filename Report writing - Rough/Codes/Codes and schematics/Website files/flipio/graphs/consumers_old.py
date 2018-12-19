from channels import Group

def ws_connect(message):
    message.reply_channel.send({"accept" : True})
    Group("consumers").add(message.reply_channel)
    try:
        mess
    except:
        pass
    else:
        Group("consumers").send({
        "text": mess,
        })


def ws_disconnect(message):
    Group("consumers").discard(message.reply_channel)

def ws_message(message):
    global mess
    mess = message.content['text']
    Group("consumers").send({
        "text":message.content['text'],
    })
    #print(message.content['text'])
    print(Group("consumers"))
