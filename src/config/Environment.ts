import "dotenv/config";
import { get } from "env-var";

export const Environment = {
    PORT: get('PORT').required().asPortNumber(),
    MONGO_URI: get('MONGO_URI').required().asString(),
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_LIFETIME: get('JWT_LIFETIME').required().asString()
}