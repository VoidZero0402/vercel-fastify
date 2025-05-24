"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const fastify_1 = require("fastify");
const fastify = (0, fastify_1.default)({
    logger: true,
});
fastify.get("/", async (req, reply) => {
    reply.send({
        message: "Hello From Fastify",
        data: {
            users: [],
        },
    });
});
if (process.env.NODE_ENV === "development") {
    async function run() {
        await fastify.ready();
        await fastify.listen({ port: 4000 });
        console.log("Fastify Running On Port 4000");
    }
    run();
}
async function handler(req, reply) {
    await fastify.ready();
    fastify.server.emit("request", req, reply);
}
