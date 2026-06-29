# MQTT Hello World

Este proyecto es una prueba básica de funcionamiento de **MQTT** usando Python.
El objetivo es demostrar cómo funciona la comunicación mediante el modelo **publish/subscribe**, donde un programa envía un mensaje y otro programa lo recibe a través de un **broker MQTT**.

## ¿Qué es MQTT?

**MQTT** significa **Message Queuing Telemetry Transport**.
Es un protocolo de mensajería ligero que se usa principalmente en sistemas de **Internet de las Cosas (IoT)**, sensores, dispositivos inteligentes y aplicaciones que necesitan enviar datos de forma rápida y eficiente.

MQTT trabaja con tres elementos principales:

- **Publisher:** cliente que envía mensajes.
- **Subscriber:** cliente que recibe mensajes.
- **Broker:** servidor intermediario que recibe los mensajes y los distribuye a los clientes suscritos.

En este proyecto usamos un broker público:

```txt
broker.hivemq.com
```

## ¿Qué estamos haciendo en este programa?

En esta prueba creamos dos archivos principales:

```txt
mqtt-hello-world/
├── publisher.py
└── subscriber.py
```

El archivo `publisher.py` se encarga de enviar un mensaje al broker MQTT.

El archivo `subscriber.py` se encarga de conectarse al broker, suscribirse a un topic y esperar mensajes.

El mensaje enviado es:

```txt
Hola Mundo desde MQTT
```

El topic usado es:

```txt
uce/franco/hola-mundo
```

## Flujo del programa

El funcionamiento general es el siguiente:

```txt
publisher.py
    ↓
publica el mensaje en el topic
    ↓
broker MQTT
    ↓
envía el mensaje a los clientes suscritos
    ↓
subscriber.py recibe el mensaje
```

## Tecnologías utilizadas

- Python
- MQTT
- paho-mqtt
- Broker público HiveMQ

## Instalación

Primero se debe crear una carpeta para el proyecto:

```bash
mkdir mqtt-hello-world
cd mqtt-hello-world
```

Luego se crea un entorno virtual:

```bash
python -m venv .venv
```

En Windows PowerShell se activa con:

```bash
.\.venv\Scripts\activate
```

En Git Bash se activa con:

```bash
source .venv/Scripts/activate
```

Después se instala la librería necesaria:

```bash
pip install paho-mqtt
```

## Código del subscriber

El archivo `subscriber.py` escucha los mensajes publicados en el topic.

```python
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
```

## Código del publisher

El archivo `publisher.py` envía el mensaje al topic.

```python
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
```

## Cómo ejecutar el proyecto

Para probar el proyecto se necesitan dos terminales.

En la primera terminal se ejecuta el subscriber:

```bash
python subscriber.py
```

Este programa queda esperando mensajes.

En la segunda terminal se ejecuta el publisher:

```bash
python publisher.py
```

## Resultado esperado

En la terminal del publisher debe aparecer:

```txt
Mensaje enviado: Hola Mundo desde MQTT
```

En la terminal del subscriber debe aparecer:

```txt
Conectado al broker MQTT
Suscrito al topic: uce/franco/hola-mundo
Esperando mensajes...
Mensaje recibido en uce/franco/hola-mundo: Hola Mundo desde MQTT
```

## Explicación final

Este proyecto demuestra el funcionamiento básico de MQTT.
El `publisher` no envía el mensaje directamente al `subscriber`, sino que lo publica en un **topic** dentro del broker. Luego, el broker se encarga de entregar ese mensaje a todos los clientes que estén suscritos a ese topic.

Con esta prueba se entiende la base del modelo **publish/subscribe**, que es muy utilizado en aplicaciones IoT, sensores, automatización y comunicación en tiempo real.
