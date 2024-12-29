const { Pool } = require("pg")
const fs = require("fs")
const path = require("path")

const pool = new Pool({
	user: "",
	password: "postgres",
	host: "localhost",
	port: 5432,
	database: "affaren",
})

async function runMigrations() {
	const migrationFiles = fs
		.readdirSync(path.join(__dirname, "../migrations"))
		.sort()

	for (const file of migrationFiles) {
		try {
			const sql = fs.readFileSync(
				path.join(__dirname, "../migrations", file),
				"utf8"
			)
			console.log(`Running migration: ${file}`)
			await pool.query(sql)
			console.log(`Completed migration: ${file}`)
		} catch (err) {
			console.error(`Error running migration ${file}:`, err)
			process.exit(1)
		}
	}

	await pool.end()
}

runMigrations()
