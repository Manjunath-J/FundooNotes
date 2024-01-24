const amqp = require('amqplib');

export async function publishMessage() {
    // Connect to RabbitMQ server
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
  
    // Declare a queue
    const queueName = 'myQueue';
    await channel.assertQueue(queueName, { durable: false });
  
    // Send a message to the queue
    const message = 'Connected to RabbitMQ!';
    channel.sendToQueue(queueName, Buffer.from(message));
  
    console.log(`Sent: ${message}`);
  
    // Close the connection
    setTimeout(() => {
      connection.close();
      // process.exit(0);
    }, 500);
  }

  