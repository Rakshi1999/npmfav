const pg = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: "5432",
    user: "postgres",
    database: "favnpm",
    password: "password",
    ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
  },
});

pg.select(1)
  .then((result) => {
    console.log("DB Connection successful!");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

pg.schema
  .hasTable("users")
  .then((exists) => {
    if (!exists) {
      return pg.schema.createTable("users", function (table) {
        table.increments("id").primary();
        table.string("name");
        table.string("email").unique().notNullable();
        table.string("password");
        table.specificType("packages", "text[]");
      });
    }
  })
  .then(() => {
    console.log("Table 'users' created or already exists!");
  })
  .catch((error) => {
    console.error("Error creating 'users' table:", error);
  });

module.exports = pg;
