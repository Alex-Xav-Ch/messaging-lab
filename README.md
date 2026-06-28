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

```md

```

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
