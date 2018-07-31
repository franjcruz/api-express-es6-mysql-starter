# api express mysql

## Prerequisites

* [Node.js](https://npmpkg.com/en/docs/install) - 6.9.0 or above
* [NPM](https://docs.npmjs.com/getting-started/installing-node) - 3.10.8 or above

## Setup

Clone the repository, install the dependencies and get started right away.

    $ git clone https://github.com/franjcruz/api-express-node-es6-mysql.git <application-name>
    $ npm install

Make a copy of `.env.example` as `.env` and update your application details and database credentials. Now, run the migrations and seed the database.

    $ npm run migrate
    $ npm run seed

Finally, start the application.

    $ npm run start:dev (For development)
    $ npm start (For production)

Navigate to http://localhost:8848/api-docs/ to verify installation.

## Creating new Migrations and Seeds

These are the commands to create a new migration and corresponding seed file.

    $ npm run make:migration <name>
    $ npm run make:seeder <name>

Example,

    $ npm run make:migration create_tags_table
    $ npm run make:seeder 02_insert_tags

## Setup Using Docker

Use [docker-compose](https://docs.docker.com/compose/) to quickly bring up a stack with pre-configured Postgres database container. Data is ephemeral and containers will disappear when stack is removed.

Specific configuration for Docker is in `.env.docker`

* `0.0.0.0` as `$APP_HOST` to expose app on Docker network interface
* Pre-configured Postgres settings - can be updated to point to another Postgres host

Bring up stack,

    $ docker-compose up

Navigate to http://localhost:8848/api-docs/ to verify application is running from docker.

Bring down stack,

    $ docker-compose down

## Tests

To run the tests you need to create a separate test database. Don't forget to update your `.env` file to include the name of the test database and run the migrations.

    $ NODE_ENV=test npm migrate
    $ npm test

Run tests with coverage.

    $ npm run test:coverage
