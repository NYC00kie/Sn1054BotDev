FROM node:18

WORKDIR /bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
