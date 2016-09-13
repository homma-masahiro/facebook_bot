FROM node:4.1.2

ENV TZ=JST-9

RUN apt-get update
RUN apt-get -y install ntpdate
RUN npm update -g npm

RUN mkdir /facebook_bot
WORKDIR /facebook_bot
COPY src/package.json .
