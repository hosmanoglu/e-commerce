import { Channel } from 'amqplib';
import { mq } from './config';

const RABBITMQ_USER_QUEUE = process.env.RABBITMQ_USER_QUEUE as string;

let channel: Channel | undefined;

export async function receiveMessage(queueName: string, handler: Function) {
  try {
    const connection = await mq;
    if (!connection) {
      throw new Error('Not connected to MQ Server');
    }
    if (!channel) {
      channel = await connection.createChannel();
    }
    channel.assertQueue(queueName, { durable: true });

    channel.consume(queueName, async msg => {
      try {
        if (msg !== null) {
          await handler(JSON.parse(msg.content.toString()));
          if (channel) {
            channel.ack(msg);
          }
        }
      } catch (error) {
        console.error('wrong Message', error);
      }
    });
  } catch (error) {
    console.error('Failed to receive messages:', error);
  }
}
