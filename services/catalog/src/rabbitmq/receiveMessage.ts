import { Channel } from 'amqplib';
import { mq } from './config';

const RABBITMQ_CATALOG_QUEUE = process.env.RABBITMQ_CATALOG_QUEUE as string;



export async function receiveMessage(queueName: string, handler: Function) {
  try {
    const connection = await mq;
    if (!connection) {
      throw new Error('Not connected to MQ Server');
    }
    
    const channel = await connection.createChannel();
    

    channel.assertQueue(queueName, { durable: true });
    channel.prefetch(1);
    channel.consume(queueName, async msg => {
      try {
        if (msg !== null) {
          handler(JSON.parse(msg.content.toString()));
          if (channel) {
            channel.ack(msg);
          }
        }
      } catch (error) {
        console.error('wrong Message', error);
        console.error('wrong Message', error);
      }
    });
  } catch (error) {
    console.error('Failed to receive messages:', error);
  }
}
