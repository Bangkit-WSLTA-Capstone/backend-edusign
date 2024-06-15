const { uploadVideo, createHistory, translate } = require('../helpers/translateHelper');

const translateHandler = async (request, h) => {
    const { payload } = request;
    const { file } = payload;

    const result = 'Dummy result';
    const link = 'http://dummy-link.com';

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
