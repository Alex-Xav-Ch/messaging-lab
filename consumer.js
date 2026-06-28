const amqp = require("amqplib");

async function consumer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "hello";

  await channel.assertQueue(queue, {
    durable: true,
  });

  console.log("Waiting for messages...");

  channel.consume(queue, (msg) => {
    const message = msg.content.toString();

    console.log("Message received:", message);

    channel.ack(msg);
  });
}

consumer().catch((error) => {
  console.error(error);
  process.exit(1);
});
