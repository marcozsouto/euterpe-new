require("dotenv/config")

const config: any = {
     dialect: "mysql",
     host: "host.docker.internal",
     username: process.env.DB_USERNAME,
     password: process.env.DB_PASSOWORD,
     database: "euterpe",
     operatorsAliases: "1",
     port: 3306,
     autoreconnect: true,
     define: {
          timestamps: true,
     },
}

export default config
