const db = require('./db');
const uploadVideo = (video) => {
    return 'http://dummy-link.com';
};

const createHistory = (userId, link, result) => {
    
    return {
        id: 'some-random-id',
        userId: userId,
        fileLink: link,
        result: result
    };
};

const translate = (fileLink) => {
    
    return 'Dummy result';
};

module.exports = { uploadVideo, createHistory, translate };
