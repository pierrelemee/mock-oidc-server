import {Request, Response} from "express";


export function configuration(req: Request, res: Response) {
    const url = (path: string) => `${req.protocol}://${req.hostname}${path}`;
    res.json({
        jwks_uri: url('/jwks'),
        authorization_endpoint: url('/authorize'),
        token_endpoint: url('/token'),
        userinfo_endpoint: url('/userinfo'),
    })
}