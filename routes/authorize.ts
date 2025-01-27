import {Request, Response} from "express";
import {users} from "../models/user";
import {Authentication, codes} from "../models/authentication";
import {v4 as uuidv4} from 'uuid';


export function authorize(req: Request, res: Response) {
    if (req.method === 'GET') {
        const {
            response_type, client_id, redirect_uri, scope, claims, state, nonce
        } = req.query

        const code = uuidv4();
        const auth = new Authentication()
        auth.code = code;
        auth.state = state as string;
        auth.nonce = nonce as string;

        codes.set(code, auth)

        res.render('authorize.html.twig', {
            users,
            response_type, client_id,
            redirect_uri, scope, claims,
            state, nonce, code
        });
    }

    if (req.method === 'POST') {
        const {
            response_type, client_id, redirect_uri, scope, claims, state, nonce, sub, code
        } = req.body

        codes.get(code).user = users.find((u) => u.sub == sub);

        res.redirect(`${redirect_uri}?code=${code}&state=${state}`);
    }
}