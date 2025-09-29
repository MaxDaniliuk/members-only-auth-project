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
  const query = "INSERT INTO posts (user_id, title, post) VALUES ($1, $2, $3)";
  return await pool.query(query, [user_id, title, post]);
}

async function selectPostsAuthorized() {
  const query =
    "SELECT users.username, posts.post_id, posts.title, posts.post, posts.created_at FROM posts INNER JOIN users ON posts.user_id = users.user_id ORDER BY posts.created_at DESC";
  const { rows } = await pool.query(query);
  return rows;
}

async function selectPostsUnauthorized() {
  const query =
    "SELECT post_id, title, post FROM  posts ORDER BY created_at DESC";
  const { rows } = await pool.query(query);
  return rows;
}

async function updateMembershipStatus(user_id) {
  const query = "UPDATE users SET ismember = true WHERE user_id = $1";
  return await pool.query(query, [user_id]);
}

async function deleteUserPost(post_id) {
  const query = "DELETE FROM posts WHERE post_id = $1";
  return await pool.query(query, [post_id]);
}

module.exports = {
  selectExistingUser,
  createNewUser,
  createNewPost,
  selectPostsAuthorized,
  selectPostsUnauthorized,
  updateMembershipStatus,
  deleteUserPost,
};
