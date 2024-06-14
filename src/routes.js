const {registerHandler, loginHandler, logoutHandler} = require('./handlers/authHandler');
const {createUserHandler, getUserHandler, editUserHandler, deleteUserHandler} = require('./handlers/userHandler');

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
            auth: false,
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
];

module.exports = routes;