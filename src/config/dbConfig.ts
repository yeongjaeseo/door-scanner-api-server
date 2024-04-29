import pg from 'pg';

const dbConfig = {
  host: process.env.CLOUDSQL_HOST,
  port: process.env.CLOUDSQL_PORT ? parseInt(process.env.CLOUDSQL_PORT, 10) : 5432,
  database: process.env.CLOUDSQL_DB,
  user: process.env.CLOUDSQL_USER_ROADSCANNER,
  password: process.env.CLOUDSQL_PASS_ROADSCANNER,
};

// Create the Pool outside of the async function to avoid scope issues
const db = new pg.Pool(dbConfig);

export default db;