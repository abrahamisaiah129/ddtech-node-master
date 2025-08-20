FROM node:18.17.0 as build

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5500

CMD [ "npm", "start" ]

