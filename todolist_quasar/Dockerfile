
FROM node:19 AS builder

WORKDIR /app

COPY . .
RUN npm install

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
