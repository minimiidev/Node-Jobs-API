import { Request, Response } from "express"
import { jobModel } from "../models/Job"
import { StatusCodes } from "http-status-codes"


export class JobsController {

    static getAllJobs = async (req: Request, res: Response) => {
        const jobs = await jobModel.find({ createdBy: req.user?.userId as string }).sort("createdAt")

        res.status(StatusCodes.OK).json({ jobs })
    }

    static getJob = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req.user as any;

        const job = await jobModel.findOne({ _id: id, createdBy: userId })

        if (!job) {
            throw new Error(`No job with id ${id} found`)
        }

        res.status(StatusCodes.OK).json({ job })
    }

    static createJob = async (req: Request, res: Response) => {
        const { company, position } = req.body;
        const user = req.user;

        try {
            const job = await jobModel.create({ company, position, createdBy: user!.userId })

            res.status(StatusCodes.CREATED).json({ job })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error })
        }
    }

    static updateJob = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { company, position } = req.body;
        const { userId } = req.user as any;

        if (!company || !position) {
            throw new Error("Please provide company and position")
        }

        const job = await jobModel.findOneAndUpdate({ _id: id, createdBy: userId }, { company, position }, {
            new: true,
            runValidators: true
        })

        if (!job) {
            throw new Error(`No job with id ${id} found`)
        }

        res.status(StatusCodes.OK).json({ job })
    }

    static deleteJob = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { userId } = req.user as any;

        await jobModel.findByIdAndDelete({ _id: id, createdBy: userId }).then((job) => {
            if (!job) {
                throw new Error(`No job with id ${id} found`)
            }
            res.status(StatusCodes.OK).json({ job })
        }).catch((error) => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: error })
        })
    }
}