"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobsController = void 0;
const Job_1 = require("../models/Job");
const http_status_codes_1 = require("http-status-codes");
class JobsController {
    static getAllJobs = async (req, res) => {
        const jobs = await Job_1.jobModel.find({ createdBy: req.user?.userId }).sort("createdAt");
        res.status(http_status_codes_1.StatusCodes.OK).json({ jobs });
    };
    static getJob = async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        const job = await Job_1.jobModel.findOne({ _id: id, createdBy: userId });
        if (!job) {
            throw new Error(`No job with id ${id} found`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ job });
    };
    static createJob = async (req, res) => {
        const { company, position } = req.body;
        const user = req.user;
        try {
            const job = await Job_1.jobModel.create({ company, position, createdBy: user.userId });
            res.status(http_status_codes_1.StatusCodes.CREATED).json({ job });
        }
        catch (error) {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
        }
    };
    static updateJob = async (req, res) => {
        const { id } = req.params;
        const { company, position } = req.body;
        const { userId } = req.user;
        if (!company || !position) {
            throw new Error("Please provide company and position");
        }
        const job = await Job_1.jobModel.findOneAndUpdate({ _id: id, createdBy: userId }, { company, position }, {
            new: true,
            runValidators: true
        });
        if (!job) {
            throw new Error(`No job with id ${id} found`);
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({ job });
    };
    static deleteJob = async (req, res) => {
        const { id } = req.params;
        const { userId } = req.user;
        await Job_1.jobModel.findByIdAndDelete({ _id: id, createdBy: userId }).then((job) => {
            if (!job) {
                throw new Error(`No job with id ${id} found`);
            }
            res.status(http_status_codes_1.StatusCodes.OK).json({ job });
        }).catch((error) => {
            res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error });
        });
    };
}
exports.JobsController = JobsController;
//# sourceMappingURL=jobs.js.map