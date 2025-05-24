const Fastify = require("fastify");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
const { UserModel } = require("./user.model");

const fastify = Fastify({
    logger: true,
});

fastify.get("/", async (req, reply) => {
    const users = await UserModel.find({});

    reply.send({
        message: "Hello From Fastify",
        data: {
            users,
        },
    });
});

async function connectToMongo() {
    try {
        await mongoose.connect("mongodb+srv://vercel-deploy:VercelDeploy0204@cluster0.4cgrhth.mongodb.net/");
        console.log(`MongoDB Connected On ${mongoose.connections[0].host}`);
    } catch (err) {
        console.log(err);
        console.log("MongoDB Connection Error");
    }
}

if (process.env.NODE_ENV === "development") {
    async function run() {
        await connectToMongo();
        await fastify.ready();
        await fastify.listen({ port: 4000 });
        console.log("Fastify Running On Port 4000");
    }

    run();
}

module.exports = async function handler(req, reply) {
    await fastify.ready();
    await connectToMongo();
    fastify.server.emit("request", req, reply);
};
