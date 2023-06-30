import { StoreApi, UseBoundStore } from 'zustand';
import { Services } from '../services';
import { createDataType, DeleteDialog, drawerAction, getDataType, IAos_config, IPagination, NavigateFunction, StoreType } from '../types';
export default class Aos<ST_T> {
    services: Services;
    useAllStore: (type: keyof ST_T) => UseBoundStore<StoreApi<ST_T[keyof ST_T] | StoreType>>;
    useDialog: UseBoundStore<StoreApi<DeleteDialog>>;
    constructor(config: IAos_config<keyof ST_T, ST_T[keyof ST_T], {
        [P in keyof ST_T]: string;
    }>);
    fetchData<T>({ params, moduleName, stateName, path, setError, ignoreError, loading, }: getDataType<keyof ST_T, T>): Promise<any>;
    postData<T>({ data, moduleName, stateName, path, loading, refresh, option, }: createDataType<keyof ST_T, T>): Promise<unknown>;
    putData<T>({ data, moduleName, stateName, path, loading, refresh, option, }: createDataType<keyof ST_T, T>): Promise<unknown>;
    deleteData(moduleName: keyof ST_T, path: string, loading?: string): Promise<unknown>;
    onDelete(id: string | number, fn: (id: string | number) => void, message: {
        title: string;
        text: string;
    }): void;
    protected drawerAction<IN_T>({ type, info, moduleName, action, builderType, }: drawerAction<IN_T, keyof ST_T>): void;
    paginationConfig({ setSearchParams, searchParams, navigate, data, url, }: {
        setSearchParams: (name: string, value: string | number) => void;
        searchParams: {
            [k: string]: string | number;
        };
        navigate: NavigateFunction;
        data: {
            [k: string]: [];
        };
        url: string;
    }): void;
    tableConfig<T>({ searchParams, data, }: {
        searchParams: {
            [k: string]: string | number;
        };
        data: IPagination;
    }): {
        total: number;
        pageIndex: number;
        pageSize: number;
    };
}
//# sourceMappingURL=Aos.d.ts.map