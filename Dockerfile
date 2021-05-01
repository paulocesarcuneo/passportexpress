FROM node:16-alpine
WORKDIR /opt/app
COPY package*.json ./
RUN npm install
COPY . .
CMD [ "node", "app.js" ]
