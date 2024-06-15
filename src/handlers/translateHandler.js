const { uploadVideo, createHistory, translate } = require('../helpers/translateHelper');

const translateHandler = async (request, h) => {
    const user = request.auth.credentials.user
    const video = request.payload.video;

    const result = 'Dummy result';
    const link = await uploadVideo(video, user.id);

    const history = {
        id: 100,
        userId: user.Id,
        fileLink: link,
        result: result
    };

    return h.response({
        status: 'success',
        data: history
    }).code(200);
};

module.exports = { translateHandler };
