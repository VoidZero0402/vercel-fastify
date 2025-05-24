const Fastify = require("fastify");

const fastify = Fastify({
    logger: true,
});

fastify.get("/", (req, reply) => {
    reply.send({
        message: "Hello From Fastify",
    });
});

module.exports = async function handler(req, reply) {
    await fastify.ready();
    fastify.server.emit("request", req, reply);
};
