"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
class Messages {
    constructor(config) {
        this.messageAlert = config === null || config === void 0 ? void 0 : config.messageAlert;
    }
    errorHanle(error) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        if (!error.response) {
            return Promise.reject(error);
        }
        if (((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.statusCode) === 403 ||
            ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.statusCode) === 401 ||
            ((_f = (_e = error.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.statusCode) === 404 ||
            ((_h = (_g = error.response) === null || _g === void 0 ? void 0 : _g.data) === null || _h === void 0 ? void 0 : _h.statusCode) === 500 ||
            ((_k = (_j = error.response) === null || _j === void 0 ? void 0 : _j.data) === null || _k === void 0 ? void 0 : _k.statusCode) === 400) {
            this.messageAlert((_l = error.response.data) === null || _l === void 0 ? void 0 : _l.message, "danger");
            return;
        }
        if (((_o = (_m = error.response) === null || _m === void 0 ? void 0 : _m.data) === null || _o === void 0 ? void 0 : _o.statusCode) === 422) {
            const errorBody = (_q = (_p = error.response) === null || _p === void 0 ? void 0 : _p.data) === null || _q === void 0 ? void 0 : _q.message;
            errorBody.forEach((message) => {
                this.messageAlert(message, "danger");
            });
        }
        return Promise.reject(error);
    }
    successMessage(response) {
        var _a;
        if ((response === null || response === void 0 ? void 0 : response.status) === 201 || (response === null || response === void 0 ? void 0 : response.status) === 202 || (response === null || response === void 0 ? void 0 : response.status) === 204) {
            if (((_a = response === null || response === void 0 ? void 0 : response.statusText) === null || _a === void 0 ? void 0 : _a.length) > 2) {
                this.messageAlert(response === null || response === void 0 ? void 0 : response.statusText, "success");
            }
        }
    }
}
exports.Messages = Messages;
exports.default = Messages;
//# sourceMappingURL=index.js.map