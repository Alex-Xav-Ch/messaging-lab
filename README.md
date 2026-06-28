# Express Webhook Receiver

This project is a minimal Node.js and Express application that exposes a webhook endpoint. It receives JSON payloads through an HTTP `POST` request, prints the received data in the terminal, and returns a confirmation response.

## What This Project Does

The server starts on port `3000` and provides one endpoint:

```text
POST /webhook
```

When a request is sent to this endpoint, the application:

- Parses the request body as JSON.
- Logs the received payload in the console.
- Responds with a success message.
- Returns the same data that was received.

Example response:

```json
{
  "message": "Webhook received successfully",
  "data": {
    "event": "test",
    "message": "Hello webhook"
  }
}
```

## What I Learned

- How to create a basic HTTP server with Express.
- How to define a `POST` route.
- How to receive JSON data using `express.json()`.
- How a webhook endpoint can receive external event data.
- How to test a webhook locally with tools such as Postman, Insomnia, or `curl`.

## Prerequisites

Before running this project, make sure you have:

- Node.js installed.
- npm installed.

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the webhook server:

```bash
npm run webhook
```

The server will run at:

```text
http://localhost:3000
```

Webhook endpoint:

```text
POST http://localhost:3000/webhook
```

## Testing the Webhook

You can test the endpoint with `curl`:

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -d "{\"event\":\"test\",\"message\":\"Hello webhook\"}"
```

You can also test it with Postman or Insomnia:

1. Select the `POST` method.
2. Use the URL `http://localhost:3000/webhook`.
3. Set the body type to JSON.
4. Send a payload like this:

```json
{
  "event": "test",
  "message": "Hello webhook"
}
```

## Project Structure

```text
messaging-lab/
|-- .gitignore
|-- package-lock.json
|-- package.json       # Project dependencies and npm scripts
|-- README.md          # Project documentation
`-- webhook.js         # Express webhook server
```

## Scripts

Run the webhook server:

```bash
npm run webhook
```

This script executes:

```bash
node webhook.js
```

## Main Dependency

This project uses:

- `express`: Web framework used to create the webhook endpoint.

## Images
<img width="1117" height="287" alt="image" src="https://github.com/user-attachments/assets/e02eac8f-3c91-4461-8977-711aa6389629" />

