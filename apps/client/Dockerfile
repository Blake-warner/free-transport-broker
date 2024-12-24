FROM node:latest

WORKDIR /app
COPY ./dist/apps/client .
ARG PORT=4200
ENV PORT=$PORT

EXPOSE $PORT
CMD ["node", "./server/server.mjs"]