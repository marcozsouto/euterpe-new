require('dotenv/config');

module.exports = {
  "username": process.env.DB_USERNAME,
  "password": process.env.DB_PASSOWORD,
  "database": "euterpe",
  "host": "host.docker.internal",
  "dialect": "mysql",
  "operatorsAliases": '1',
  "port": '3306',
  "autoreconnect": true,
  "define": {
    "timestamps": true,
  }
}