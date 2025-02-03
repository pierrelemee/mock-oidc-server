import * as process from "node:process";
import * as fs from 'node:fs';

class User {
    protected _title: string;

    constructor(title: string, sub: string, data: Map<string, string | boolean | number>) {
        this._title = title;
        this._sub = sub;
        this._data = data;
    }

    private _sub: string;

    get sub(): string {
        return this._sub;
    }

    private _data: Map<string, string | boolean | number>;

    get data(): Map<string, string | boolean | number> {
        return {...this._data, sub: this._sub};
    }

    get description(): string {
        return JSON.stringify(this._data, null, 2);
    }

    public static from(o: any): User {
        const {_title, sub, ..._data} = o;

        return new User(_title, sub, _data)
    }
}

let data: any;

for (const path of [process.env.USERS, process.cwd() + process.env.USERS]) {
    if (fs.existsSync(path)) {
        try {
            data = JSON.parse(fs.readFileSync(path).toString());
        } catch (e) {
        }
    }
}

if (!data) {
    try {
        data = JSON.parse(process.env.USERS);
    } catch (e) {
    }
}

if (!data) {
    throw new Error('Impossible to parse user data');
}


const users = data.map((u) => User.from(u));

export {User, users}