FROM node:22.11.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

RUN echo "DATABASE_URL: $DATABASE_URL"


#RUN npx prisma migrate deploy
#RUN DATABASE_URL=postgresql://postgres:postgres@172.17.0.2:5432/user-db npx prisma migrate deploy
RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "dev"]


