const fastify = require('fastify')({
    logger: true
});
const PORT = process.env.port || 3000;
require('dotenv').config();
const Sentry = require("@sentry/node");
Sentry.init({
    dsn: process.env.SENTRY_DSN,
});

fastify.setErrorHandler(async (error, request, reply) => {
    // Logging locally
    console.log(error);
    // Sending error to be logged in Sentry
    Sentry.captureException(error);
    reply.status(500).send({ error: "Something went wrong" });
})


fastify.register(require('./routes/default-route'));

const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
}

start();