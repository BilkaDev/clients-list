import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {

}
export class NotFoundError extends Error {

}

export function handleError(err : Error ,req : Request,res : Response,next : NextFunction) {


    if (err instanceof NotFoundError){

        res
            .status(404)
            .render('error',{
            message: 'there is no such client'
        })
        return
    }

    console.error(err.message)
     res.status(err instanceof ValidationError ? 400 : 500);

    res.render('error',{
        message: err instanceof ValidationError ? err.message as string : 'Sorry, please try again later'
    })
}

