FROM node:slim

WORKDIR /app

COPY *.json .

RUN npm install

CMD [ "npm", "run", "dev"]