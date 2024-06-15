const { uploadVideo, createHistory, translate } = require('../helpers/translateHelper');

const translateHandler = async (request, h) => {
    const { payload } = request;
    const { file } = payload;

    // Hardcoded response for now
    const result = 'Dummy result'; // This should come from the translate function
    const link = 'http://dummy-link.com'; // This should come from the uploadVideo function

    // Hardcoded history object for now
    const history = {
        id: 'some-random-id',
        userId: 1,
        fileLink: link,
        result: result
    };

    return h.response({
        status: 'success',
        data: history
    }).code(200);
};

module.exports = { translateHandler };
