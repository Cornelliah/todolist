FROM node:19-alpine AS builder

WORKDIR /app


COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build




FROM node:19-alpine

WORKDIR /app


COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/package*.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/src /app/src
COPY --from=builder /app/tsconfig.json /app/



EXPOSE 3000

CMD ["node", "dist/main"]
