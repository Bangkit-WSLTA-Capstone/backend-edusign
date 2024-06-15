const {registerHandler, loginHandler, logoutHandler} = require('./handlers/authHandler');
const {createUserHandler, getUserHandler, editUserHandler, deleteUserHandler} = require('./handlers/userHandler');
const {translateHandler, getTranslationHandler} = require('./handlers/translateHandler');

const routes = [
    {
        method: 'GET',
        path: '/',
        options: {
            auth: false,
        },
        handler: () => {return "API running"},
    },
    {
        method: 'GET',
        path: '/restricted',
        options: {
            auth: 'my_jwt_strategy',
        },
        handler: () => {return "Protected API running"},
    },
    {
        method: 'POST',
        path: '/register',
        options: {
            auth: false,
        },
        handler: registerHandler,
    },
    {
        method: 'POST',
        path: '/login',
        options: {
            auth: false,
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
            auth: 'my_jwt_strategy',
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
            auth: 'my_jwt_strategy',
        },
        handler: getTranslationHandler,
    }
];

module.exports = routes;