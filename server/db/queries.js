const pool = require("./pool");

async function selectExistingUser(searchCriteria, value) {
  const query = `SELECT * FROM users WHERE ${searchCriteria} = $1`;
  const { rows } = await pool.query(query, [value]);
  return rows.length > 0 ? rows[0] : null;
}

async function createNewUser(fullname, email, username, hashedPassword) {
  const query = `INSERT INTO users (fullname, email, username, password, ismember, isadmin) VALUES ($1, $2, $3, $4, $5, $6)`;
  return await pool.query(query, [
    fullname,
    email,
    username,
    hashedPassword,
    false,
    false,
  ]);
}

module.exports = {
  selectExistingUser,
  createNewUser,
};
