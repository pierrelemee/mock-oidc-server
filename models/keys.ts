import {exportJWK, generateKeyPair, KeyLike} from "jose";
import {v4 as uuidv4} from 'uuid';

class SignatureKey {
    public kid: string;
    public alg: string;
    public privateKey: KeyLike;
    public publicKey: KeyLike;

    constructor(alg: string, privateKey: KeyLike, publicKey: KeyLike) {
        this.alg = alg;
        this.kid = uuidv4();
        this.privateKey = privateKey;
        this.publicKey = publicKey;
    }

    public static async generate(alg: string): Promise<SignatureKey> {
        const {publicKey, privateKey} = await generateKeyPair(alg)

        return new SignatureKey(alg, privateKey, publicKey);
    }

    public async asJWK(): Promise<object> {
        return {
            ...((await exportJWK(this.publicKey)) as object),
            kid: this.kid,
            alg: this.alg,
        }
    }
}

const keyset: Map<string, SignatureKey> = new Map<string, SignatureKey>();

(await Promise.all(['PS256', 'ES256', 'RS256'].map((alg) => SignatureKey.generate(alg)))).forEach(
    (key: SignatureKey) => keyset.set(key.alg, key)
);

export {keyset, SignatureKey};