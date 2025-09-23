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

async function createNewPost(user_id, title, post) {
  const query =
    "INSERT INTO posts (user_id, title, post) VALUES ($1, $2, $3) RETURNING *";
  const { rows } = await pool.query(query, [user_id, title, post]);
  return rows.length > 0 ? rows[0] : null;
}

async function selectPostsAuthorized() {
  const query =
    "SELECT users.username, posts.post_id, posts.title, posts.post, posts.created_at FROM posts INNER JOIN users ON posts.user_id = users.user_id";
  const { rows } = await pool.query(query);
  return rows;
}

async function selectPostsUnauthorized() {
  const query = "SELECT post_id, title, post FROM  posts";
  const { rows } = await pool.query(query);
  return rows;
}

module.exports = {
  selectExistingUser,
  createNewUser,
  createNewPost,
  selectPostsAuthorized,
  selectPostsUnauthorized,
};
