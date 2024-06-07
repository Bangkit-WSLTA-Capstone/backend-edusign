const connection = require('../helpers/db');

const isValidCallback = (callback) => {
  return callback && typeof callback === 'function';
};

const createUser = (username, email, password, callback) => {
  const insertQuery = 'INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES (?, ?, ?)';
  connection.query(insertQuery, [username, email, password], (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results);
  });
};

const getUserByEmail = (email, callback) => {
  const query = 'SELECT * FROM USERS WHERE EMAIL = ?';
  connection.query(query, [email], (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results[0]);
  });
};

const getUserById = (id, callback) => {
  const query = 'SELECT * FROM USERS WHERE ID = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results[0]);
  });
};

const getAllUsers = (callback) => {
  const query = 'SELECT * FROM USERS';
  connection.query(query, (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results);
  });
};

const editUser = (id, username, email, password, callback) => {
  const updateQuery = 'UPDATE USERS SET USERNAME = ?, EMAIL = ?, PASSWORD = ? WHERE ID = ?';
  connection.query(updateQuery, [username, email, password, id], (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results);
  });
};

const deleteUser = (id, callback) => {
  const query = 'DELETE FROM USERS WHERE ID = ?';
  connection.query(query, [id], (err, results) => {
    if (err) {
      if (isValidCallback(callback)) return callback(err);
      throw new TypeError('callback is not a function');
    }
    if (isValidCallback(callback)) callback(null, results);
  });
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  editUser,
  deleteUser
};
