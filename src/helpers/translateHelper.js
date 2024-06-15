const db = require('./db');
const uploadVideo = (video) => {
    // Dummy implementation
    return 'http://dummy-link.com';
};

const createHistory = (userId, link, result) => {
    // Dummy implementation
    return {
        id: 'some-random-id',
        userId: userId,
        fileLink: link,
        result: result
    };
};

const translate = (fileLink) => {
    // Dummy implementation
    return 'Dummy result';
};

module.exports = { uploadVideo, createHistory, translate };
