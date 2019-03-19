FROM mhart/alpine-node:10

RUN apk add --update \
    curl \
    && rm -rf /var/cache/apk/*

RUN curl -s https://taskfile.org/install.sh | sh

EXPOSE 8081