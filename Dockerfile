FROM node:8-alpine

# Port Application listens on
EXPOSE 8848

# Copy app and install packages
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm install -g knex

# Default app commands
ENTRYPOINT ["npm"]
CMD ["run", "start:dev"]
