import dns from "node:dns/promises";
dns.setServers(["8.8.8.8"]);
//
//
import express from 'express'
import { notFound } from './middleware/not-found';
import { errorHandlerMiddleware } from './middleware/error-handler';
import { Environment } from './config/Environment';
import { AuthRouter } from './routes/auth';
import { JobsRouter } from './routes/jobs';
import { connectDB } from './db/connect';
import { AuthMiddleware } from "./middleware/authentication";

import helmet from "helmet";
import cors from "cors";
import rateLimiter from "express-rate-limit";

// * App
const app = express();
// * Middlewares
app.use(express.json());
// ? Security
app.set("trust proxy", 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(helmet());
app.use(cors());
// * Routes
app.use("/api/v1/auth", AuthRouter.routes);
app.use("/api/v1/jobs", AuthMiddleware, JobsRouter.routes);
// ? Catch Middlewares
app.use(notFound);
app.use(errorHandlerMiddleware);


(() => main())()

async function main() {
    try {
        await connectDB(Environment.MONGO_URI)
        console.log("Connected to DB")
        app.listen(Environment.PORT, () =>
            console.log(`Server is listening on port ${Environment.PORT}...`)
        );
    } catch (error) {
        console.log(error);
    }
};


