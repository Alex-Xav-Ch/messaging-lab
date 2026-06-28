import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'hello-consumer',
    brokers: ['localhost:9092']
})

const consumer = kafka.consumer({ groupId: 'hello-group' })

async function run() {
    await consumer.connect()
    console.log('Consumer connected')

    await consumer.subscribe({ topic: 'hello-world', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log(`Received message: ${message.value.toString()}`)
        },
    })
}

run().catch(console.error)