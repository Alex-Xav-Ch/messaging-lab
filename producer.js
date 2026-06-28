const amqp = require("amqplib");

async function producer() {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  const queue = "hello";
  const message =
    process.argv.slice(2).join(" ") || "Hola Mundo desde RabbitMQ #2";

  await channel.assertQueue(queue, {
    durable: true,
  });

  channel.sendToQueue(queue, Buffer.from(message), {
    persistent: true,
  });

  console.log("Message sent:", message);

  await channel.close();
  await connection.close();
}

producer().catch((error) => {
  console.error(error);
  process.exit(1);
});
