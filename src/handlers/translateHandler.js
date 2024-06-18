const { uploadVideo, createHistory, translate, getTranslationHistoriesById } = require('../helpers/translateHelper');

const translateHandler = async (request, h) => {
    const user = request.auth.credentials.user;
    const video = request.payload ? request.payload.video : undefined;

    try {
        // Cek apakah video kosong atau undefined
        if (!video) {
            return h.response({
                status: false,
                message: 'Video field must not be empty',
            }).code(400);
        }

        const link = await uploadVideo(video, user.id);
        const result = await translate(link);
        
        if (result === null) {
            return h.response({
                status: false,
                message: 'Failed to translate video',
            }).code(500);
        }

        const history = await createHistory(user.id, link, result.result);

        return h.response({
            status: true,
            message: 'Video translated successfully',
            data: history
        }).code(200);
    } catch (error) {
        return h.response({
            status: false,
            message: 'Internal Server Error',
        }).code(500);
    }
};

const getTranslationHandler = async (request, h) => {
    const user = request.auth.credentials.user;
    try {
        const historyList = await getTranslationHistoriesById(user.id);

        return h.response({
            status: true,
            message: 'Translation history fetched successfully',
            data: historyList
        }).code(200);
    } catch (error) {
        return h.response({
            status: false,
            message: 'Internal Server Error',
        }).code(500);
    }
};

module.exports = { translateHandler, getTranslationHandler };