const {registerHandler, loginHandler, logoutHandler} = require('./handlers/authHandler');
const {createUserHandler, getUserHandler, editUserHandler, deleteUserHandler} = require('./handlers/userHandler');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {return "API running"},
    },
    {
        method: 'POST',
        path: '/register',
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
        handler: logoutHandler,
    },
    {
        method: 'GET',
        path: '/users/{id}',
        handler: getUserHandler,
    },
    {
        method: 'POST',
        path: '/users',
        handler: createUserHandler,
    },
    {
        method: 'PATCH',
        path: '/users/{id}',
        handler: editUserHandler,
    },
    {
        method: 'DELETE',
        path: '/users/{id}',
        handler: deleteUserHandler,
    },
];

module.exports = routes;