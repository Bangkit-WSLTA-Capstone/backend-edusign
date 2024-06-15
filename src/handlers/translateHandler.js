const { uploadVideo, createHistory, translate, getTranslationHistoriesById } = require('../helpers/translateHelper');

const translateHandler = async (request, h) => {
    const user = request.auth.credentials.user
    const video = request.payload.video;
    try {
        const link = await uploadVideo(video, user.id);
        const result = await translate(link);
        const history = await createHistory(user.id, link, result.result);
    
        return h.response({
            status: true,
            message: 'Video translated successfully',
            data: history
        }).code(200);        
    } catch (error) {
        return h.response({
            status: false,
            message: error.message,
        }).code(500);   
    }
};

const getTranslationHandler = async (request, h) => {
    const user = request.auth.credentials.user
    const historyList = await getTranslationHistoriesById(user.id);

    return h.response({
        status: true,
        message: 'Translation history fetched successfully',
        data: historyList
    }).code(200);        
};

module.exports = { translateHandler, getTranslationHandler };
