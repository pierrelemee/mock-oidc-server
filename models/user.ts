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
        return this._data;
    }

    get description(): string {
        return JSON.stringify(this._data, null, 2);
    }

    public static from(o: any): User {
        const {_title, sub, ..._data} = o;

        return new User(_title, sub, _data)
    }
}

const users = [
    {
        _title: "User 1",
        sub: 'cace7c82-fb4d-4e8e-a56e-550d5d7b52ee',
        email: 'user1@example.com',
    },
    {
        _title: "User 2",
        sub: 'dde1f6b6-7da8-4506-873f-f3ec61e30c20',
        email: 'user3@example.com',
    },
    {
        _title: "User 3",
        sub: 'f388bd40-ac17-453e-8980-7a3cf7bf6244',
        email: 'user3@example.com',
    }
].map((u) => User.from(u));

export {User, users}