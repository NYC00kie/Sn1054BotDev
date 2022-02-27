FROM node:14.19

WORKDIR /bot

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]
