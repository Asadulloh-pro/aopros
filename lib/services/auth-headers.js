"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authHeader() {
    var _a, _b;
    const tokenLocal = localStorage.getItem('auth');
    const auth = tokenLocal && JSON.parse(tokenLocal);
    const token = (_b = (_a = auth === null || auth === void 0 ? void 0 : auth.state) === null || _a === void 0 ? void 0 : _a.session) === null || _b === void 0 ? void 0 : _b.token;
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    else {
        return {};
    }
}
exports.default = authHeader;
//# sourceMappingURL=auth-headers.js.map