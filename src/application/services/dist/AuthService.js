"use strict";
exports.__esModule = true;
exports.AuthService = void 0;
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.login = function (username, password) {
        if (username === 'user' && password === '123') {
            this.isAuthenticated = true;
            return true;
        }
        return false;
    };
    AuthService.logout = function () {
        this.isAuthenticated = false;
    };
    AuthService.isLoggedIn = function () {
        return this.isAuthenticated;
    };
    AuthService.isAuthenticated = false;
    return AuthService;
}());
exports.AuthService = AuthService;
