"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("node:dns/promises"));
promises_1.default.setServers(["8.8.8.8"]);
//
//
const express_1 = __importDefault(require("express"));
const not_found_1 = require("./middleware/not-found");
const error_handler_1 = require("./middleware/error-handler");
const Environment_1 = require("./config/Environment");
const auth_1 = require("./routes/auth");
const jobs_1 = require("./routes/jobs");
const connect_1 = require("./db/connect");
const authentication_1 = require("./middleware/authentication");
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
// * App
const app = (0, express_1.default)();
// * Middlewares
app.use(express_1.default.json());
// ? Security
app.set("trust proxy", 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100
}));
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// * Routes
app.use("/api/v1/auth", auth_1.AuthRouter.routes);
app.use("/api/v1/jobs", authentication_1.AuthMiddleware, jobs_1.JobsRouter.routes);
// ? Catch Middlewares
app.use(not_found_1.notFound);
app.use(error_handler_1.errorHandlerMiddleware);
(() => main())();
async function main() {
    try {
        await (0, connect_1.connectDB)(Environment_1.Environment.MONGO_URI);
        console.log("Connected to DB");
        app.listen(Environment_1.Environment.PORT, () => console.log(`Server is listening on port ${Environment_1.Environment.PORT}...`));
    }
    catch (error) {
        console.log(error);
    }
}
;
//# sourceMappingURL=app.js.map