const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
        const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Server/route options here
    server.realm.modifiers.route.prefix = '/api'

    // Start server here
    server.route(routes);
    await server.start();

    console.log(`Running at ${server.info.uri}`);
};

init();
