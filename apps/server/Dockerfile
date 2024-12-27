FROM node:18
WORKDIR /app
COPY dist/apps/server .
ENV PORT=3000
EXPOSE ${PORT}
RUN npm install --omit=dev --legacy-peer-deps
# dependencies that nestjs needs
RUN npm install reflect-metadata tslib rxjs mysql2 @nestjs/platform-express --legacy-peer-deps
CMD node ./main.js