export class Auth {
    static loadToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    static saveUser(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static removeUser() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static isLoggedIn() {
        return null; // tokenNotExpired();
    }
}