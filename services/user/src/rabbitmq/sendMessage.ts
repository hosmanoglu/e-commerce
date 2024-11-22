import { mq } from './config';
import { Channel } from 'amqplib';
let channel: Channel | undefined;

export async function sendMessage(queueName: string, message: Object) {
  try {
    const connection = await mq;
    if (!connection) {
      throw new Error('Not connected to MQ Server');
    }
    if (!channel) {
      channel = await connection.createChannel();
    }

    channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });
  } catch (error) {
    console.error('Failed to send message:', error);
  }
}
