// Import handlers here
//const {} = require('./handlers/');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: () => {return "API running"},
    },
];

module.exports = routes;