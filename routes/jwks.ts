import {Request, Response} from "express";

import {keyset, SignatureKey} from "@/models/keys.ts";


export async function jwks(req: Request, res: Response) {
    return res.json({keys: await Promise.all(keyset.values().map((key: SignatureKey) => key.asJWK()))})
}