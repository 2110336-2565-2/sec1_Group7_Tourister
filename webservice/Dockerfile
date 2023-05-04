FROM node:18-alpine
COPY . /app
RUN cd /app && npm install -g npm@latest && npm i --no-audit --silent --only=prod
EXPOSE 2000
ENTRYPOINT ["node", "/app/app.js"]