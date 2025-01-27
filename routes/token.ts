import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {codes} from "../models/authentication";


export function token(req: Request, res: Response) {
    const {
        grant_type, // 'authorization_code',
        client_id,
        client_secret,
        redirect_uri,
        code
    } = req.body;

    const access_token = jwt.sign({}, null);
    codes.get(code).access_token = access_token

    res.json({
        access_token,
        token_type: 'Bearer',
        expires_in: 60,
        id_token: '<ID_TOKEN>'
    })
}