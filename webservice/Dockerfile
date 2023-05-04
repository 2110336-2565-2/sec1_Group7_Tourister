FROM node:18-alpine
WORKDIR /app

COPY . .
COPY .env .env
RUN npm install -g npm@latest && npm i --no-audit --silent --only=prod
EXPOSE 8080
ENTRYPOINT ["npm", "start"]