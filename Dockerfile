FROM node:15

RUN npm install -g npm@latest

RUN mkdir /app
WORKDIR /app
ADD data /app/data
ADD src /app/src
ADD index.js /app/index.js
ADD package.json /app/package.json

RUN apt-get update && \
    apt-get -y install ghostscript

RUN apt-get update && \
    apt-get -y install imagemagick

RUN npm install

EXPOSE 4000
CMD ["npm", "run", "start"]