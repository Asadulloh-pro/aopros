import { StoreApi, UseBoundStore } from 'zustand';
import { Services } from '../services';
import { createDataType, DeleteDialog, drawerAction, getDataType, IAos_config, NavigateFunction, StoreType } from '../types';
export default class Aos<ST_T> {
    services: Services;
    useAllStore: (type: keyof ST_T) => UseBoundStore<StoreApi<ST_T[keyof ST_T] | StoreType>>;
    apiUrls: {
        [P in keyof ST_T]: string;
    };
    useDialog: UseBoundStore<StoreApi<DeleteDialog>>;
    constructor(config: IAos_config<keyof ST_T, ST_T[keyof ST_T], {
        [P in keyof ST_T]: string;
    }>);
    getData<T>({ params, moduleType, stateName, path, customPath, setError, ignoreError }: getDataType<keyof ST_T, T>): Promise<any>;
    createData<T>({ data, moduleType, stateName, path, customPath, }: createDataType<keyof ST_T, T>): Promise<unknown>;
    updateData<T>({ data, moduleType, stateName, path, customPath, }: createDataType<keyof ST_T, T>): Promise<unknown>;
    deleteData(moduleType: keyof ST_T, path?: string, customPath?: string): Promise<unknown>;
    onDelete(id: string | number, fn: (id: string | number) => void): void;
    protected drawerAction<IN_T>({ type, info, moduleType, action, builderType, }: drawerAction<IN_T, keyof ST_T>): void;
    generateApi(moduleType: keyof ST_T, path?: string, customPath?: string): string;
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
    tableConfig({ searchParams, data, }: {
        searchParams: {
            [k: string]: string | number;
        };
        data: {
            [k: string]: string | number;
        };
    }): {
        total: number;
        pageIndex: number;
        pageSize: number;
    };
}
//# sourceMappingURL=Aos.d.ts.map