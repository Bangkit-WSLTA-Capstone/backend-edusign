// Import handlers here
const {registerHandler} = require('./handlers/authHandler');

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
        handler: loginHandler,
    },
    {
        method: 'POST',
        path: '/logout',
        handler: logoutHandler,
    },
];

module.exports = routes;