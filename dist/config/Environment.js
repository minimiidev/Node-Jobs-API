"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
require("dotenv/config");
const env_var_1 = require("env-var");
exports.Environment = {
    PORT: (0, env_var_1.get)('PORT').required().asPortNumber(),
    MONGO_URI: (0, env_var_1.get)('MONGO_URI').required().asString(),
    JWT_SECRET: (0, env_var_1.get)('JWT_SECRET').required().asString(),
    JWT_LIFETIME: (0, env_var_1.get)('JWT_LIFETIME').required().asString()
};
//# sourceMappingURL=Environment.js.map