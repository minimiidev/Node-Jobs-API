"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsRouter = void 0;
const express_1 = require("express");
const jobs_1 = require("../controllers/jobs");
class JobsRouter {
    static get routes() {
        const router = (0, express_1.Router)();
        router.route("/")
            .get(jobs_1.JobsController.getAllJobs)
            .post(jobs_1.JobsController.createJob);
        router.route("/:id")
            .get(jobs_1.JobsController.getJob)
            .delete(jobs_1.JobsController.deleteJob)
            .patch(jobs_1.JobsController.updateJob);
        return router;
    }
}
exports.JobsRouter = JobsRouter;
//# sourceMappingURL=jobs.js.map