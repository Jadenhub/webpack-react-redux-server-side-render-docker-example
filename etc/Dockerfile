#Build STAGE
FROM node:12 AS builder

WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json .

# RUN npm install for node js dependencies
RUN npm install

COPY . .

RUN npm run build \
    && rm -rf node_modules \
    && npm install --only=production \
    && mkdir -p dist/src/translations \
    && cp -r node_modules ./dist \
    && cp -r public ./dist \
    && cp -r build ./dist \
    && cp -r ./src/translations ./dist/src

# FINAL STAGE
FROM node:12
ENV API_HOST=https://jsonplaceholder.typicode.com
ENV SERVER_PORT=3000
ENV SERVICE_HOST=http://localhost:3000

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/dist .

EXPOSE 3000

CMD [ "node", "./build/bundle.js"]