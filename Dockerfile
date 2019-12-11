FROM node:10.17.0-alpine3.10

COPY . /opt/x3-stock-graphql-demo-app
WORKDIR /opt/x3-stock-graphql-demo-app

RUN npm install && \
    npm run build && \
    npm prune --production && \
    rm -rf lib

CMD npm run start-prod
