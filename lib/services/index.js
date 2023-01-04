"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Services = void 0;
const axios_1 = __importDefault(require("axios"));
const auth_headers_1 = __importDefault(require("./auth-headers"));
const Messages_1 = __importDefault(require("./Messages"));
class Services {
    constructor(config) {
        const base_url = config === null || config === void 0 ? void 0 : config.baseUrl;
        // Action Messages
        this.messages = new Messages_1.default(config.messageConfig);
        // Action Messages
        this.api = axios_1.default.create({
            baseURL: base_url,
        });
        this.api.interceptors.request.use(function (config) {
            config.headers = Object.assign(Object.assign({}, (0, auth_headers_1.default)()), config.headers);
            return config;
        });
        this.api.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
        this.api.interceptors.response.use((response) => {
            this.messages.successMessage(response);
            return response;
        }, (error) => {
            this.messages.errorHanle(error);
        });
    }
    fetch(endpoint, options) {
        return this.api(Object.assign(Object.assign({}, options), { url: endpoint, method: "GET" }));
    }
    create(endpoint, data, options) {
        return this.api(Object.assign(Object.assign({}, options), { url: endpoint, method: "POST", data }));
    }
    update(endpoint, data, options) {
        return this.api(Object.assign(Object.assign({}, options), { url: endpoint, method: "PUT", data }));
    }
    updateWithpatch(endpoint, data, options) {
        return this.api(Object.assign(Object.assign({}, options), { url: endpoint, method: "PATCH", data }));
    }
    delete(endpoint, options) {
        return this.api(Object.assign(Object.assign({}, options), { url: endpoint, method: "DELETE" }));
    }
}
exports.Services = Services;
//# sourceMappingURL=index.js.map