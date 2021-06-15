const { getRandomJoke } = require('../utils/get-joke');

async function routes(fastify, options) {

    fastify.get('/', async (request, reply) => {

        reply
            .code(200)
            .type('text/html')
            .send('This is an API endpoint to demo the integration of Sentry with Fastify. To get a joke, visit the endpoint <a href="/joke">Get Joke</a>. To trigger the error, visit the endpoint <a href="/joke-with-error">Trigger Error</a>');
    })

    fastify.get('/joke', async (request, reply) => {
        const joke = await getRandomJoke();
        const response = {
            status: 200,
            setup: joke.setup,
            punch: joke.punchline
        }
        reply
            .code(200)
            .send(response);
    })

    fastify.get('/joke-with-error', async (request, reply) => {
        foo();
        reply
            .send();
    })

    fastify.get('/*', async (request, reply) => {
        reply
            .redirect('/');
    })

}

module.exports = routes;
