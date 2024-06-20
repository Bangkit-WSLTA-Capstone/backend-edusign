const {registerHandler, loginHandler, logoutHandler, refreshHandler} = require('./handlers/authHandler');
const {createUserHandler, getUserHandler, editUserHandler, deleteUserHandler} = require('./handlers/userHandler');
const {translateHandler, getTranslationHandler} = require('./handlers/translateHandler');
const {getCourseHandler, getDictionaryHandler, getAllCourseHandler} = require('./handlers/courseHandler');
const Joi = require('joi');


const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            description:"For testing API running",
            tags: ['api'],
            auth: false,
            response: {
                status: {
                    200: Joi.string().example("API running").description('Success response'),
                }
            }
        },
        handler: () => {return "API running"},
    },
    {
        method: 'GET',
        path: '/restricted',
        options: {
            description:"For testing token's validity",
            tags: ['api'],
            auth: 'my_jwt_strategy',
            response: {
                status: {
                    200: Joi.string().example("Protected API running").description('Success response'),
                    401: Joi.object({
                        status: false,
                        message: Joi.string().example("error message"),
                    }).description('Response for invalid credential'),
                }
            }
        },
        handler: () => {return "Protected API running"},
    },
    {
        method: 'POST',
        path: '/register',
        options: {
            tags: ['api'],
            auth: false,
            description:"For registering new user",
            validate: {
                payload: Joi.object({
                    username: Joi.string(),
                    email: Joi.string(),
                    password: Joi.string(),
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        status: true,
                        message: Joi.string(),
                        data: {
                            id: Joi.number(),
                            username: Joi.string(),
                            email: Joi.string(),
                            created_at: Joi.string(),
                            updated_at: Joi.string(),
                        }
                    }).description('Success response'),
                    400: Joi.object({
                        status: false,
                        message: Joi.string().example("Error message"),
                    }).description('Response for invalid or missing payload')
                }
            }
        },
        handler: registerHandler,
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            description:"For logging into account",
            tags: ['api'],
            auth: false,
            validate: {
                payload: Joi.object({
                    email: Joi.string(),
                    password: Joi.string(),
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        status: true,
                        message: Joi.string(),
                        data: {
                            access: Joi.string().example("Access token"),
                            refresh: Joi.string().example("Refresh token"),
                        }
                    }).description('Success response'),
                    400: Joi.object({
                        status: false,
                        message: Joi.string().example("Error message"),
                    }).description('Response for invalid/missing payload or wrong credentials')
                }
            }
        },
        handler: loginHandler,
    },
    {
        method: 'POST',
        path: '/logout',
        options: {
            auth: 'my_jwt_strategy',
        },
        handler: logoutHandler,
    },
    {
        method: 'POST',
        path: '/refresh',
        options: {
            description:"For refreshing access token",
            tags: ['api'],
            auth: 'my_jwt_strategy',
        },
        handler: refreshHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        options: {
            auth: false,
        },
        handler: getUserHandler,
    },
    {
        method: 'POST',
        path: '/users',
        options: {
            auth: false,
        },
        handler: createUserHandler,
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        options: {
            auth: false,
        },
        handler: editUserHandler,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        options: {
            auth: false,
        },
        handler: deleteUserHandler,
    },
    {
        method: 'POST',
        path: '/translate',
        options: {
            tags: ['api'],
            auth: 'my_jwt_strategy',
            description:"For translating video into text",
            payload: {
                parse: true,
                multipart: true,
                output: 'stream',
                maxBytes: 52428800, // 50 MB
            },
        },
        handler: translateHandler,
    },
    {
        method: 'GET',
        path: '/translate',
        options: {
            description:"For fetching translation history",
            tags: ['api'],
            auth: 'my_jwt_strategy',
        },
        handler: getTranslationHandler,
    },
    {
        method: 'GET',
        path: '/course/{fileName}',
        options: {
            description:"For fetching course content",
            tags: ['api'],
            auth: false,
            response: {
                status: {
                    200: Joi.string().example("Content of course's markdown file").description('Success response'),
                    400: Joi.object({
                        status: false,
                        message: Joi.string().example("error message"),
                    }).description('Response for invalid file name'),
                }
            }
        },
        handler: getCourseHandler,
    },
    {
        method: 'GET',
        path: '/course',
        options: {
            description:"For fetching course list",
            tags: ['api'],
            auth: false,
            response: {
                status: {
                    200: Joi.object({
                        status: true,
                        message: Joi.string(),
                        data: Joi.array().items(
                            Joi.object({
                                id: Joi.number(),
                                coursename: Joi.string().example("File name"),
                                filelink: Joi.string().example("Link to file"),
                                title: Joi.string().example("Course title"),
                                description: Joi.string().example("Course description"),
                                created_at: Joi.string().example("timestamp"),
                                updated_at: Joi.string().example("timestamp"),
                            }), 
                        ).example([
                            {
                                id: 0,
                                coursename: "File name",
                                filelink: "Link to file",
                                title: "Course title",
                                description: "Course description",
                                created_at: "timestamp",
                                updated_at: "timestamp",
                            },
                            {
                                id: 1,
                                coursename: "File name",
                                filelink: "Link to file",
                                title: "Course title",
                                description: "Course description",
                                created_at: "timestamp",
                                updated_at: "timestamp",
                            }
                        ])
                    }).description('Success response'),
                    400: Joi.object({
                        status: false,
                        message: Joi.string().example("Error message"),
                    }).description('Response for invalid/missing parameter')
                }
            }
        },
        handler: getAllCourseHandler,
    },
    {
        method: 'GET',
        path: '/dictionary/{letter}',
        options: {
            description:"For fetching dictionary reference",
            tags: ['api'],
            auth: false,
            validate: {
                params: Joi.object({
                    letter: Joi.string().example("A")
                })
            },
            response: {
                status: {
                    200: Joi.object({
                        status: true,
                        message: Joi.string(),
                        data: {
                            id: Joi.number(),
                            filelink: Joi.string().example("Link to letter picture"),
                            letter: Joi.string().example("Referenced letter"),
                            created_at: Joi.string().example("timestamp"),
                            updated_at: Joi.string().example("timestamp"),
                        }
                    }).description('Success response'),
                    400: Joi.object({
                        status: false,
                        message: Joi.string().example("Error message"),
                    }).description('Response for invalid/missing parameter')
                }
            }
        },
        handler: getDictionaryHandler,
    }
];

module.exports = routes;