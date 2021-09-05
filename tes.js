const { Pool } = require('pg');

const pool = new Pool({
  user: 'developer',
  host: 'localhost',
  database: 'laptopdb',
  password: 'loop123',
  port: 5432,
});

const getAllEmloyess = async () => {
  const result = await pool.query('select * from karyawan');
  return result.rows;
};

console.log(getAllEmloyess());
