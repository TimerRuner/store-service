import {NextFunction, Request, Response} from "express";

const ApiError = require("../error/ApiError")


module.exports = (err: typeof ApiError | Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof ApiError) {
        res.status(err.status).json({message: err.message})
    }
    res.status(500).json({message: err.message})
}