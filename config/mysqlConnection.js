const mysql = require('mysql2')
const envEnvConfig =require("../nodeEnvConfig")
envEnvConfig.envEnvConfig()

const mysqlConnection = mysql.createConnection({
   host: process.env.DB_HOST,
   user: process.env.DB_USERNAME,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_DATABASE,
   multipleStatements: true,
})

mysqlConnection.connect((err) => {
   if (err) {
      console.error(
         `Error while connecting to the database: "${process.env.DB_DATABASE}" in "${process.env.DB_HOST}" with user "${process.env.DB_USERNAME}"`,
         err
      )
      return
   }
   console.log(
      `Connected to the database "${process.env.DB_DATABASE}" in "${process.env.DB_HOST}" with user "${process.env.DB_USERNAME}" successfully!`
   )
})
module.exports = mysqlConnection
