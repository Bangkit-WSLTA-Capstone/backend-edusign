const connection = require('./db');
const util = require('util');
const axios = require('axios');

const getCourseLink = async (fileName) => {
    const query = 'SELECT * FROM COURSES WHERE COURSENAME = ?';
    const executeQuery = await util.promisify(connection.query).bind(connection);
    const queryResult = await executeQuery(query, [fileName]);
    return queryResult[0].filelink;
}

const getCourseContent = async (fileName) => {
    const link = await getCourseLink(fileName);
    const response = await axios.get(link);
    return response.data;
};

const getDictionary = async (letter) => {
    const query = 'SELECT * FROM LETTER_DICTIONARY WHERE USERID = ?';
    const executeQuery = await util.promisify(connection.query).bind(connection);
    const result = await executeQuery(query, [letter]);
    return result;
}

module.exports = { getCourseContent, getDictionary };