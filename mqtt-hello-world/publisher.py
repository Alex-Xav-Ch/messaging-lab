import paho.mqtt.client as mqtt
import time

BROKER = "broker.hivemq.com"
PORT = 1883
TOPIC = "uce/franco/hola-mundo"

client = mqtt.Client(mqtt.CallbackAPIVersion.VERSION2)

client.connect(BROKER, PORT, 60)

time.sleep(1)

message = "Hola Mundo desde MQTT"
client.publish(TOPIC, message)

print(f"Mensaje enviado: {message}")

client.disconnect()