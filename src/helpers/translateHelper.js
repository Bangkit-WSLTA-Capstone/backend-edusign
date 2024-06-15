const connection = require('./db');
const axios = require('axios');
const {format} = require('date-fns');
const bucket = require('./bucket')
const util = require('util');

const uploadVideo = async (videoStream, userId) => {
    const formattedDate = format(new Date(), 'yyyyMMdd-HHmmss');
    const gcsname = `${formattedDate}-${userId}.mp4`;
    const destination = `video/${gcsname}`;

    return new Promise((resolve, reject) => {
        const file = bucket.file(destination);
        videoStream.pipe(file.createWriteStream())
            .on('error', (err) => {
                reject(err);
            })
            .on('finish', () => {
                const objectUrl = `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${destination}`;
                resolve(objectUrl);
            });
    });
};


const translate = async (link) => {
    try {
        const response = await axios.post(process.env.ML_API_URL, {link: link}, {
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return 'Failed to fetch data';
    }
};

const createHistory = async (userId, link, result) => {
    const insertQuery = 'INSERT INTO TRANSLATION_HISTORIES (USERID, FILELINK, RESULT) VALUES (?, ?, ?)';
    const getQuery = 'SELECT * FROM TRANSLATION_HISTORIES WHERE FILELINK = ?';
    const executeQuery = await util.promisify(connection.query).bind(connection);
    await executeQuery(insertQuery, [userId, link, result]);
    const queryResult = await executeQuery(getQuery, [link]);
    return queryResult[0];
};

const getTranslationHistoriesById = async (userId) => {
    const query = 'SELECT * FROM TRANSLATION_HISTORIES WHERE USERID = ?';
    const executeQuery = await util.promisify(connection.query).bind(connection);
    const result = await executeQuery(query, [userId]);
    return result;
}

module.exports = { uploadVideo, createHistory, translate, getTranslationHistoriesById };
