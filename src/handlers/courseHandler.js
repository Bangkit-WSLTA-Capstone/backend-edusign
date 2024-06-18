const { getCourseContent, getDictionary, getAllCourses } = require('../helpers/courseHelper');

const getCourseHandler = async (request, h) => {
    const fileName = request.params.fileName;

    try {
        // Cek apakah fileName kosong atau undefined
        if (!fileName) {
            return h.response({
                status: false,
                message: 'fileName parameter must not be empty',
            }).code(400);
        }

        const content = await getCourseContent(fileName);
        return h.response(content).type('text/plain');
    } catch (error) {
        return h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        }).code(500);
    }
};

const getAllCourseHandler = async (request, h) => {
    try {
        const result = await getAllCourses();
        return h.response({
            status: true,
            message: 'Courses successfully fetched',
            data: result
        }).code(200);
    } catch (error) {
        return h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        }).code(500);
    }
}

const getDictionaryHandler = async (request, h) => {
    const letter = request.params.letter;

    try {
        // Cek apakah letter kosong atau undefined
        if (!letter) {
            return h.response({
                status: false,
                message: 'letter parameter must not be empty',
            }).code(400);
        }

        const dictionary = await getDictionary(letter);
        
        // Cek apakah dictionary kosong atau undefined
        if (!dictionary || dictionary.length === 0) {
            return h.response({
                status: false,
                message: 'Dictionary content not found',
            }).code(404);
        }

        return h.response({
            status: true,
            message: 'Dictionary content fetched',
            data: dictionary
        }).code(200);
    } catch (error) {
        return h.response({
            status: false,
            message: `Internal Server Error: ${error.message}`,
        }).code(500);
    }
};

module.exports = { getCourseHandler, getDictionaryHandler, getAllCourseHandler };