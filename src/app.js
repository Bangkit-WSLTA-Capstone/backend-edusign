const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const Jwt  = require('@hapi/jwt');
const { getUserById } = require('./helpers/userHelper');
require('dotenv').config()

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: `${process.env.HOST}` || '0.0.0.0',
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
            exp: true
        },
        validate: async (artifacts, request, h) => {
            const userId = artifacts.decoded.payload.id;
            const user = await getUserById(userId);
            if (user.id === undefined) return {isValid: false};
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload }
            };
        }
    });

    // Set the strategy
    server.auth.default('my_jwt_strategy');
    
    // Server/route options here
    server.realm.modifiers.route.prefix = '/api'

    server.ext('onPreResponse', (request, h) => {
        const response = request.response;

        if (response.isBoom) {
            const error = response.output.payload;
            return h.response({ status: false, message: `An error occurred: ${error.message}` }).code(response.output.statusCode);
        }

        return h.continue
    });

    // Start server here
    server.route(routes);
    await server.start();

    console.log(`Running at ${server.info.uri}`);
};

init();
