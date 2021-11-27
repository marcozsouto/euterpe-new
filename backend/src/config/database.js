module.exports = {
  "username": "root",
  "password": "Mv@811437",
  "database": "euterpe",
  "host": "host.docker.internal",
  "dialect": "mysql",
  "port": '3306',
  "autoreconnect": true,
  dialectOptions: {
    connectTimeout: 60000
  },
  "define": {
    "timestamps": true,
    "underscored": true,
    "underscoredAll": true,
  }
}