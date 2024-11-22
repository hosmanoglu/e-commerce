import client  from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL as string;

async function connect() {
  try {
    return await client.connect(RABBITMQ_URL);
  } catch (error) {
    console.error(error);
    console.error(`Not connected to MQ Server`);
  }
}

const mq = connect();

export { mq };
