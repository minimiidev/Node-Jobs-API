import { Router } from "express";
import { JobsController } from "../controllers/jobs";



export class JobsRouter {

    static get routes() {
        const router = Router()

        router.route("/")
            .get(JobsController.getAllJobs)
            .post(JobsController.createJob)

        router.route("/:id")
            .get(JobsController.getJob)
            .delete(JobsController.deleteJob)
            .patch(JobsController.updateJob)

        return router
    }
}