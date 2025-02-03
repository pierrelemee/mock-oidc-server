import {User} from "./user.ts";

export class Authentication {


    public state: string;
    public nonce: string;
    public code: string;
    public user: User | null;
    public access_token: string;
}

export const codes: Map<string, Authentication> = new Map;