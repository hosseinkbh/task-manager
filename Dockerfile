FROM node:22-alpine

WORKDIR /task-manager

COPY package*.json ./

RUN yarn --verbose --production=false

COPY . .

EXPOSE 3000

CMD ["yarn","start"]