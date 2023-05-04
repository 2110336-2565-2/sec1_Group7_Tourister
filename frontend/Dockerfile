FROM node:18.8.0-alpine as build
WORKDIR /app
COPY package*.json /app/
RUN npm install --silent
COPY ./ /app/
RUN npm run build

EXPOSE 3001
CMD [ "npm","run","start" ]
