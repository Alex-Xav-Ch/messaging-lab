# RabbitMQ Hello World with JavaScript

This project is a small messaging lab that demonstrates a basic producer and consumer flow using RabbitMQ, Node.js, and the `amqplib` package.

> Note: the current implementation uses RabbitMQ with JavaScript, not Kafka with TypeScript.

## What This Project Does

The project starts a RabbitMQ broker with Docker Compose and provides two Node.js scripts:

- `producer.js` sends a message to a RabbitMQ queue named `hello`.
- `consumer.js` listens to the `hello` queue and prints received messages in the console.

The default producer message is:

```text
Hola Mundo desde RabbitMQ
```

You can also send a custom message from the command line.

## What I Learned

- How to run RabbitMQ locally using Docker Compose.
- How to connect a Node.js application to RabbitMQ.
- How to create or assert a queue before using it.
- How to publish messages to a queue with a producer.
- How to consume and acknowledge messages with a consumer.
- How producer and consumer processes communicate through a message broker instead of calling each other directly.

## Prerequisites

Before running the project, make sure you have:

- Node.js installed.
- npm installed.
- Docker installed and running.
- Docker Compose available.

## Getting Started

Install project dependencies:

```bash
npm install
```

Start RabbitMQ:

```bash
npm run rabbit:start
```

Start the consumer in one terminal:

```bash
npm run consumer
```

Send a message from another terminal:

```bash
npm run producer
```

Send a custom message:

```bash
node producer.js "Hello from RabbitMQ"
```

Stop RabbitMQ when you finish:

```bash
npm run rabbit:stop
```

## Project Structure

```text
messaging-lab/
|-- consumer.js          # Receives messages from the RabbitMQ queue
|-- docker-compose.yml   # Runs RabbitMQ with the management plugin
|-- package-lock.json    # Dependency lock file
|-- package.json         # npm scripts and dependencies
|-- producer.js          # Sends messages to the RabbitMQ queue
`-- README.md            # Project documentation
```

## Images

<img width="1079" height="71" alt="image" src="https://github.com/user-attachments/assets/d56928ef-8d37-40c3-83af-d692e9a044b4" />

<img width="909" height="335" alt="image" src="https://github.com/user-attachments/assets/63ba39ba-4343-418f-b7f8-eb570fe5b6ff" />

<img width="759" height="346" alt="image" src="https://github.com/user-attachments/assets/a6309bc5-7795-48e8-abf4-3e923ac7ae5c" />

<img width="583" height="605" alt="image" src="https://github.com/user-attachments/assets/ac4bf71a-0cbe-46ed-94dc-80af7a2840a6" />

<img width="914" height="351" alt="image" src="https://github.com/user-attachments/assets/bf54b7af-2c5c-4b08-844a-bda4f7b2e874" />


## RabbitMQ Management UI

RabbitMQ Management is available at:

```text
http://localhost:15672
```

Default credentials:

```text
Username: guest
Password: guest
```
