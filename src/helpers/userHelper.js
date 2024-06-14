const connection = require('../helpers/db');
const util = require('util');

const createUser = async (username, email, password) => {
  const insertQuery = 'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)';
  const getQuery = 'SELECT * FROM USERS WHERE EMAIL = ?';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  await executeQuery(insertQuery, [username, email, password]);
  const result = await executeQuery(getQuery, [email]);
  return result[0];
};

const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM USERS WHERE EMAIL = ?';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  const result = await executeQuery(query, [email]);
  return result[0];
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM USERS WHERE ID = ?';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  const result = await executeQuery(query, [id]);
  return result[0];
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM USERS';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  const result = await executeQuery(query);
  return result;
};

const editUser = async (id, username, email, password) => {
  const updateQuery = 'UPDATE USERS SET USERNAME = ?, EMAIL = ?, PASSWORD = ? WHERE ID = ?';
  const getQuery = 'SELECT * FROM USERS WHERE EMAIL = ?';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  await executeQuery(updateQuery, [username, email, password, id]);
  const result = await executeQuery(getQuery, [email]);
  return result[0];
};

const deleteUser = async (id) => {
  const query = 'DELETE FROM USERS WHERE ID = ?';
  const executeQuery = await util.promisify(connection.query).bind(connection);
  await executeQuery(query, [id]);
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser
};
