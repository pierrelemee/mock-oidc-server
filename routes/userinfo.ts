import {Request, Response} from "express";
import {codes} from "@/models/authentication.ts";


export function userinfo(req: Request, res: Response) {
    const access_token = req.header('Authorization').split(' ').at(1);

    const auth = codes.values().find((auth) => auth.access_token == access_token)

    return res.json({
        ...auth.user.data
    })
}