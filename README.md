# Kafka Hello World with TypeScript

A minimal "Hello World" project demonstrating Apache Kafka messaging using **KafkaJS** (the official Node.js/TypeScript client) and **Bitnami Kafka** running via Docker Compose.

## What This Project Does

- **Producer** (`producer.ts`) — Connects to Kafka, sends a message to the `hello-world` topic, then disconnects.
- **Consumer** (`consumer.ts`) — Connects to Kafka, subscribes to the `hello-world` topic from the beginning, and logs every received message.
- **Docker Compose** (`docker-compose.yml`) — Spins up a single-node Kafka broker using **KRaft** mode (no ZooKeeper dependency).

## What I Learned

### 1. Core Kafka Concepts
- **Topics** — Named channels where messages are organized. Both producer and consumer must agree on the topic name.
- **Producers** — Applications that publish messages to topics.
- **Consumers** — Applications that subscribe to topics and process messages.
- **Brokers** — Kafka servers that store and serve messages. Here we use a single broker at `localhost:9092`.
- **Consumer Groups** — A `groupId` allows multiple consumers to coordinate and share the workload of a topic.

### 2. KafkaJS (Official Node.js/TypeScript Client)
Based on the [official KafkaJS documentation](https://kafka.js.org/docs/getting-started):

```ts
import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
})
```

- Destructured import (`{ Kafka }`) is required — the default export does not exist.
- Configuration keys are **camelCase**: `clientId`, `groupId`.
- `producer.send()` uses the `messages` (plural) array — each message has a `value` (and optional `key`, `partition`, etc.).
- `consumer.run()` receives an object with `{ topic, partition, message }` — `message.value` is a `Buffer`, so call `.toString()`.

### 3. Kafka Without ZooKeeper (KRaft Mode)
- Apache Kafka 2.8+ supports KRaft mode, which removes the ZooKeeper dependency.
- Bitnami's Kafka image enables it with `KAFKA_ENABLE_KRAFT=yes`.
- Key environment variables:
  - `KAFKA_CFG_PROCESS_ROLES=broker,controller` — single node acts as both broker and controller.
  - `KAFKA_CFG_NODE_ID=1` — unique node identifier.
  - `KAFKA_CFG_CONTROLLER_QUORUM_VOTERS=1@kafka:9093` — defines the controller quorum.
  - `KAFKA_CFG_LISTENERS` — the interfaces Kafka binds to.
  - `KAFKA_CFG_ADVERTISED_LISTENERS` — what clients connect to (`localhost:9092`).

### 4. TypeScript Execution with `tsx`
- `tsx` is a zero-config runtime that executes TypeScript files directly (no compilation step needed).
- Scripts in `package.json` use `tsx` for simplicity.

### 5. Common Pitfalls (Fixed in This Project)

| Issue | File | Fix |
|---|---|---|
| Missing commas in `package.json` | `package.json` | Added required JSON commas |
| `import Kafka from 'kafkajs'` | `consumer.ts` | Changed to `import { Kafka } from 'kafkajs'` |
| `clientID` / `groupID` (uppercase) | `consumer.ts` | Changed to `clientId` / `groupId` |
| `message` (singular) | `producer.ts` | Changed to `messages` (plural) |
| Topic mismatch: `hola-mundo` vs `hello-world` | `consumer.ts` | Both now use `hello-world` |
| Template literal with single quotes | `consumer.ts` | Changed to backticks for string interpolation |
| `enviroment` typo | `docker-compose.yml` | Changed to `environment` |
| `PROCCESS_ROLES` typo | `docker-compose.yml` | Changed to `PROCESS_ROLES` |
| `broker, controller` (space after comma) | `docker-compose.yml` | Changed to `broker,controller` (no space) |

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for running Kafka)
- [Node.js](https://nodejs.org/) >= 18

## Getting Started

### 1. Start Kafka

```bash
npm run start:kafka
```

This runs `docker compose up -d` and starts a Kafka broker in the background.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Consumer

Open **Terminal 1**:

```bash
npm run start:consumer
```

The consumer connects and waits for messages on the `hello-world` topic.

### 4. Run the Producer

Open **Terminal 2**:

```bash
npm run start:producer
```

The producer sends a message and exits. You should see the message appear in the consumer's terminal.

### Expected Output

**Terminal 1 (Consumer):**
```
Consumer connected
Received message: Hello Kafka from TypeScript!
```

**Terminal 2 (Producer):**
```
Producer connected
Message sent successfully
```

### 5. Stop Kafka

```bash
docker compose down
```

## Project Structure

```
kafka-project/
├── docker-compose.yml   # Kafka broker config (KRaft mode)
├── package.json         # Dependencies and scripts
├── producer.ts          # Publishes a message to "hello-world"
├── consumer.ts          # Subscribes to "hello-world" and logs messages
├── tsconfig.json        # TypeScript configuration
└── README.md            # This file
```

## References

- [Apache Kafka Documentation](https://kafka.apache.org/documentation/)
- [KafkaJS Official Docs](https://kafka.js.org/docs/getting-started)
- [Bitnami Kafka Docker Image](https://hub.docker.com/r/bitnami/kafka)
