const createUser = (username, email, password) => {
    const insertQuery = `INSERT INTO USERS (USERNAME, EMAIL, PASSWORD) VALUES (${username}, ${email}, ${password});`;
    const getQuery = `SELECT FROM USERS WHERE USERNAME = ${username};`;
    //TODO: implement db logic
}

const getUserByEmail = (email) => {
    const query = `SELECT FROM USERS WHERE EMAIL = ${email};`;
    //TODO: implement db logic
}

const getUserById = (id) => {
    const query = `SELECT FROM USERS WHERE ID = ${id};`;
    //TODO: implement db logic
}

const getAllUsers = () => {
    const query = `SELECT * FROM USERS;`;
    //TODO: implement db logic
}

const editUser = (id, username, email, password) => {
    const updateQuery = `UPDATE USERS SET USERNAME = ${username}, EMAIL = ${email}, PASSWORD = ${password} WHERE ID = ${id};`;
    const getQuery = `SELECT FROM USERS WHERE USERNAME = ${username};`;    
    //TODO: implement db logic
}

const deleteUser = (id) => {
    const query = `DELETE FROM USERS WHERE ID = ${id};`;
    //TODO: implement db logic
}

module.exports = createUser, getUserByEmail, getUserById, getAllUsers, editUser, deleteUser;