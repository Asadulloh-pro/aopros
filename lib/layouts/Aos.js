"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
class Aos {
    constructor(config) {
        this.services = new services_1.Services(config === null || config === void 0 ? void 0 : config.services);
        this.useAllStore = config.store;
        this.useDialog = config.useDialog;
    }
    fetchData({ params, moduleName, stateName, path, setError, ignoreError, loading = 'loading', }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleName);
            setState({ [loading]: true });
            try {
                const response = yield this.services.fetch(path, {
                    params,
                });
                if (stateName) {
                    setState({ [stateName]: response === null || response === void 0 ? void 0 : response.data });
                }
                else {
                    return response === null || response === void 0 ? void 0 : response.data;
                }
            }
            catch (err) {
                if (!ignoreError) {
                    if (setError) {
                        setError(err);
                    }
                    else {
                        setState({ statusError: err });
                    }
                }
            }
            finally {
                setState({ [loading]: false });
            }
        });
    }
    postData({ data, moduleName, stateName, path, loading, refresh = "refresh", }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleName);
            if (loading)
                setState({ [loading]: true });
            try {
                const result = yield this.services.create(path, data);
                if (stateName === 'drawer') {
                    setState({
                        [stateName]: {
                            isOpen: false,
                            type: '',
                        },
                    });
                }
                else if (stateName) {
                    setState({
                        [stateName]: result,
                    });
                }
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                if (loading)
                    setState({ [loading]: true });
                if (refresh)
                    setState((state) => ({ [refresh]: !state[refresh] }));
            }
        });
    }
    putData({ data, moduleName, stateName, path, loading, refresh = "refresh", }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleName);
            if (loading)
                setState({ [loading]: true });
            try {
                const result = yield this.services.update(path, data);
                if (stateName === 'drawer') {
                    setState({
                        [stateName]: {
                            isOpen: false,
                            type: '',
                        },
                    });
                }
                else if (stateName) {
                    setState({
                        [stateName]: result,
                    });
                }
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                if (loading)
                    setState({ [loading]: true });
                if (refresh)
                    setState((state) => ({ [refresh]: !state[refresh] }));
            }
        });
    }
    deleteData(moduleName, path, loading) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleName);
            if (loading)
                setState({ [loading]: true });
            try {
                const result = yield this.services.delete(path);
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                if (loading)
                    setState({ [loading]: true });
                setState((state) => ({
                    ["refresh"]: !state.refresh,
                }));
            }
        });
    }
    onDelete(id, fn, message) {
        const { getState } = this.useDialog;
        const deleteFn = () => {
            fn(id);
        };
        getState().setDeleteInfo({
            isOpen: true,
            info: {
                title: message === null || message === void 0 ? void 0 : message.title,
                text: message === null || message === void 0 ? void 0 : message.text,
            },
            fn: deleteFn,
        });
    }
    drawerAction({ type, info, moduleName, action, builderType, }) {
        const { setState } = this.useAllStore(moduleName);
        setState({
            drawer: {
                isOpen: action,
                type,
                info,
                builderType,
            },
        });
    }
    paginationConfig({ setSearchParams, searchParams, navigate, data, url, }) {
        var _a, _b;
        if ((data === null || data === void 0 ? void 0 : data.data) !== null && !((_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.length) && +(searchParams === null || searchParams === void 0 ? void 0 : searchParams.page) > 1) {
            setSearchParams('page', +(searchParams === null || searchParams === void 0 ? void 0 : searchParams.page) - 1 || 1);
        }
        else if (!((_b = data === null || data === void 0 ? void 0 : data.data) === null || _b === void 0 ? void 0 : _b.length) && +(searchParams === null || searchParams === void 0 ? void 0 : searchParams.page) === 1) {
            navigate(url);
        }
    }
    tableConfig({ searchParams, data, }) {
        const total = Number(data === null || data === void 0 ? void 0 : data.total_pages);
        const pageIndex = Number(searchParams === null || searchParams === void 0 ? void 0 : searchParams.page) || 1;
        const pageSize = Number(data === null || data === void 0 ? void 0 : data.page_size);
        return { total, pageIndex, pageSize };
    }
}
exports.default = Aos;
//# sourceMappingURL=Aos.js.map