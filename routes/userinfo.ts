import {Request, Response} from "express";
import {codes} from "../models/authentication";


export function userinfo(req: Request, res: Response) {
    const access_token = req.header('Authorization').split(' ').at(1);

    const auth = Array.from(codes.values()).find((auth) => auth.access_token == access_token)

    res.json({
        ...auth.user.data
    })
}