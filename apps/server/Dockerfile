FROM node:latest

WORKDIR /api
COPY ./dist/apps/server .
ARG PORT=3000
ENV PORT=$PORT

#RUN npm install --legacy-peer-deps
# dependencies for nestjs
RUN npm install reflect-metadata rxjs tslib mysql2 @nestjs/platform-express 
EXPOSE $PORT
CMD node ./main.js