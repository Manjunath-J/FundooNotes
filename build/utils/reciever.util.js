// const amqp = require('amqplib');

// export async function consumeMessage() {
//   // Connect to RabbitMQ server
//   const connection = await amqp.connect('amqp://localhost');
//   const channel = await connection.createChannel();

//   // Declare a queue
//   const queueName = 'myQueue';
//   await channel.assertQueue(queueName, { durable: false });

//   // Receive messages from the queue
//   channel.consume(queueName, (message) => {
//     if (message !== null) {
//       console.log(`Received: ${message.content.toString()}`);
//       channel.ack(message);
//     }
//   });

//   console.log('Waiting for messages. To exit press CTRL+C');
// }
"use strict";