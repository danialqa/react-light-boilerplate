FROM node:erbium

ARG API_URL

ENV HOME_DIR=/usr/src/app \
    SERVER_PORT=8080 \
    API_URL=${API_URL}

COPY . ${HOME_DIR}

WORKDIR ${HOME_DIR}

RUN set -x \
    && yarn install --pure-lockfile \
    && yarn build \
    && yarn cache clean

EXPOSE 8080
CMD [ "yarn", "start" ]
