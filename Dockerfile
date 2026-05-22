FROM node:24-slim AS node-builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm i

COPY . .
RUN npm run build

FROM nginx:1-alpine
WORKDIR /app

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

COPY --from=node-builder /app/dist /usr/share/nginx/html

