const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
        const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    // Setup JWT
    await server.register(Jwt);

    server.auth.strategy('my_jwt_strategy', 'jwt', {
        keys: process.env.JWT_SECRET_KEY,
        verify: {
            aud: false,
            iss: false,
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        //TODO: Probably refactor and move this somewhere else
        validate: (artifacts, request, h) => {
            const userId = artifacts.decoded.payload.user.id;

            // TODO: Connect to profile API and get user credential + Check if user exists
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    // Set the strategy
    server.auth.default('my_jwt_strategy');

    // Server/route options here
    server.realm.modifiers.route.prefix = '/api'

    // Start server here
    server.route(routes);
    await server.start();

    console.log(`Running at ${server.info.uri}`);
};

init();
