import paho.mqtt.client as mqtt

BROKER = "broker.hivemq.com"
PORT = 1883
TOPIC = "uce/franco/hola-mundo"

def on_connect(client, userdata, flags, reason_code, properties=None):
    print("Conectado al broker MQTT")
    client.subscribe(TOPIC)
    print(f"Suscrito al topic: {TOPIC}")

def on_message(client, userdata, message):
    payload = message.payload.decode()
    print(f"Mensaje recibido en {message.topic}: {payload}")

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

client.on_connect = on_connect
client.on_message = on_message

client.connect(BROKER, PORT, 60)

print("Esperando mensajes...")
client.loop_forever()