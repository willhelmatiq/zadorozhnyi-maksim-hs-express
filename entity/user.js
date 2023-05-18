class User {
    constructor(name, login) {
        this._name = name;
        this._login = login;
    }
    get name() {
        return this._name
    }
    get login() {
        return this._login;
    }
}

module.exports = User;