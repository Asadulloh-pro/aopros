"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Messages = void 0;
class Messages {
    constructor(config) {
        this.messageAlert = config === null || config === void 0 ? void 0 : config.errorAlert;
    }
    errorHanle(error) {
        if (!error.response) {
            return Promise.reject(error);
        }
        if (error.response.status === 403 ||
            error.response.status === 401 ||
            error.response.status === 400) {
            //Invalid token, or expired state
            this.messageAlert(error.response.data.message, "danger");
            return;
        }
        // // const data = error.response.data
        if (error.response.status === 404) {
            // Not found
            this.messageAlert("404 Not foud", "danger");
        }
        if (error.response.status === 500) {
            this.messageAlert("Внутренняя ошибка сервера 500", "danger");
            return;
        }
        if (error.response.status === 400) {
            const errorBody = error.response.data;
            this.messageAlert(errorBody, "danger");
        }
        return Promise.reject(error);
    }
    successMessage(response) {
        if ((response === null || response === void 0 ? void 0 : response.status) === 201) {
            this.messageAlert(response === null || response === void 0 ? void 0 : response.statusText, "success");
        }
    }
}
exports.Messages = Messages;
exports.default = Messages;
//# sourceMappingURL=index.js.map