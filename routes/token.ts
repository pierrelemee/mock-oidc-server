import {Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {codes} from "@/models/authentication.ts";
import {keyset} from "@/models/keys.ts";


export function token(req: Request, res: Response) {
    const {
        grant_type, // 'authorization_code',
        client_id,
        client_secret,
        redirect_uri,
        code
    } = req.body;

    const authentication = codes.get(code)
    const access_token = jwt.sign({}, keyset.get('RS256').privateKey, {
        algorithm: 'RS256',
        header: {kid: keyset.get('RS256').kid, alg: 'RS256'}
    });
    const id_token = jwt.sign({
        nonce: authentication.nonce,
    }, keyset.get('RS256').privateKey, {algorithm: 'RS256', header: {kid: keyset.get('RS256').kid, alg: 'RS256'}});
    authentication.access_token = access_token

    res.json({
        access_token,
        token_type: 'Bearer',
        expires_in: 60,
        id_token
    })
}