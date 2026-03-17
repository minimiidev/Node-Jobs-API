"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
class AuthRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        router.post("/login", auth_1.AuthController.login);
        router.post("/register", auth_1.AuthController.register);
        return router;
    }
}
exports.AuthRouter = AuthRouter;
//# sourceMappingURL=auth.js.map