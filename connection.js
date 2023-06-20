const mysql = require('mysql')
const db = mysql.createConnection({
    hostname: "localhost",
    user: "root",
    password: "",
    database: 'ems'
})
db.connect((err) => {
    if(err) throw err
    console.log("Db connected")
})

module.exports = db