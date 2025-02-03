FROM node:23

WORKDIR /app

COPY . /app

RUN yarn install

CMD ["yarn", "start"]

EXPOSE 9998