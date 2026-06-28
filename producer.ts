import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'hello-producer',
    brokers: ['localhost:9092']
})

const producer = kafka.producer()

async function run() {
    await producer.connect()
    console.log('Producer connected')

    await producer.send({
        topic: 'hello-world',
        messages: [
            { value: 'Hello Kafka from TypeScript!' }
        ],
    })

    console.log('Message sent successfully')
    await producer.disconnect()
}

run().catch(console.error)