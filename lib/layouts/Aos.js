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
        this.apiUrls = config.apiUrls;
        this.useDialog = config.useDialog;
        this.showSnakebar = config.showSnakebar;
    }
    getData({ params, moduleType, stateName, path, customPath, setError, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleType);
            setState({ loading: true });
            try {
                const response = yield this.services.fetch(this.generateApi(moduleType, path, customPath), {
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
                if (setError) {
                    setError(err);
                }
                else {
                    setState({ statusError: err });
                }
            }
            finally {
                setState({ loading: false });
            }
        });
    }
    createData({ data, moduleType, stateName, path, customPath, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleType);
            try {
                const result = yield this.services.create(this.generateApi(moduleType, path, customPath), data);
                if (stateName) {
                    setState({
                        [stateName]: {
                            isOpen: false,
                            type: '',
                        },
                    });
                }
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                setState((state) => ({ refresh: !state.refresh }));
            }
        });
    }
    updateData({ data, moduleType, stateName, path, customPath, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleType);
            try {
                const result = yield this.services.update(this.generateApi(moduleType, path, customPath), data);
                if (stateName) {
                    setState({
                        [stateName]: {
                            isOpen: false,
                            type: '',
                        },
                    });
                }
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                setState((state) => ({ refresh: !state.refresh }));
            }
        });
    }
    deleteData(moduleType, path, customPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const { setState } = this.useAllStore(moduleType);
            try {
                const result = yield this.services.delete(this.generateApi(moduleType, path, customPath));
                return result;
            }
            catch (err) {
                return err;
            }
            finally {
                setState((state) => ({ refresh: !state.refresh }));
            }
        });
    }
    onDelete(id, fn) {
        const { getState } = this.useDialog;
        const deleteFn = () => {
            fn(id);
            setTimeout(() => {
                this.showSnakebar({
                    title: 'Successfuly Deleted',
                    text: 'Counrty successfuly deleted',
                    type: 'success',
                });
            });
        };
        getState().setDeleteInfo({
            isOpen: true,
            info: {
                title: 'Delete counrty',
                text: 'Counrtyni delete qilishga aminmisan ?',
            },
            fn: deleteFn,
        });
    }
    drawerAction({ type, info, moduleType, action, builderType, }) {
        const { setState } = this.useAllStore(moduleType);
        setState({
            drawer: {
                isOpen: action,
                type,
                info,
                builderType,
            },
        });
    }
    generateApi(moduleType, path, customPath) {
        const url = customPath ? customPath : this.apiUrls[moduleType];
        if (path)
            return url + path;
        else
            return url;
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