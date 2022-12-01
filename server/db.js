const Pool = require("pg").Pool

const pool = new Pool({
	user: "",
	password: "postgres",
	host: "localhost",
	port: 5432,
	database: "affaren",
})

module.exports = pool
