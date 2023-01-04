"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authHeader() {
    const tokenLocal = localStorage.getItem('token');
    const token = tokenLocal && JSON.parse(tokenLocal);
    if (token) {
        return { Authorization: `Bearer ${token}` };
    }
    else {
        return {};
    }
}
exports.default = authHeader;
//# sourceMappingURL=auth-headers.js.map