const { getCourseContent, getDictionary, getAllCourses } = require('../helpers/courseHelper');

const getCourseHandler = async (request, h) => {
    const fileName = request.params.fileName;
    const content = await getCourseContent(fileName);
    return h.response(content).type('text/plain'); 
};

const getAllCourseHandler = async (request, h) => {
    const result = await getAllCourses();
    return h.response({
        status: true,
        message: 'Courses successfully fetched',
        data: result
    });
}

const getDictionaryHandler = async (request, h) => {
    const letter = request.params.letter;
    const dictionary = await getDictionary(letter);

    return h.response({
        status: true,
        message: 'Dictionary content fetched',
        data: dictionary
    }).code(200);        
};

module.exports = { getCourseHandler, getDictionaryHandler, getAllCourseHandler };
