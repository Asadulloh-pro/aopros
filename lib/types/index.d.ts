import { AxiosHeaders } from 'axios';
import { StoreApi, UseBoundStore } from 'zustand';
export interface IErrorHandle {
    messageAlert: (message: string) => void;
}
type getParamsType = {
    [k: string]: string;
};
export type getDataType<MD_T, AST_T> = {
    params?: getParamsType;
    moduleType: MD_T;
    stateName?: keyof AST_T;
    path?: string;
    customPath?: string;
    setError?: (error: unknown) => void;
    ignoreError?: boolean;
};
export type createDataType<MD_T, AST_T> = {
    data: any;
    params?: getParamsType;
    moduleType: MD_T;
    stateName: keyof AST_T;
    path?: string;
    customPath?: string;
};
export interface IShowSnakebar {
    title: string;
    text: string;
    type: 'success' | 'info' | 'warning' | 'danger';
}
export type Delete = {
    isOpen: boolean;
    info?: {
        title: string;
        text: string;
    };
    fn?: () => void;
};
export type DeleteDialog = {
    deleteInfo: Delete;
    setDeleteInfo: (state: Delete) => void;
};
export interface IServices {
    headers?: AxiosHeaders;
    messageConfig: IErrorHandle;
    baseUrl: string;
}
export type IAos_config<MD_T, ST_T, API_T> = {
    services: IServices;
    store: (type: MD_T) => UseBoundStore<StoreApi<ST_T | StoreType>>;
    apiUrls: API_T;
    useDialog: UseBoundStore<StoreApi<DeleteDialog>>;
};
export type drawerAction<IN_T, MD_T> = {
    action: boolean;
    moduleType: MD_T;
    type: string;
    info?: IN_T;
    builderType?: string;
};
export interface IFetch<T> {
    data: T[] | null;
    page_size: number;
    total_elements: number;
    total_pages: number;
}
export type StoreType = {
    data?: any | null;
    loading: boolean;
    refresh: boolean;
    statusError: any;
    setData?: (value: any | null) => void;
    setLoading: (value: boolean) => void;
    setRefresh: () => void;
    setStatusError: (value: any) => void;
    drawer: DrawerType;
    setDrawer: (value: DrawerType) => void;
};
export type DrawerType = {
    isOpen: boolean;
    type: string;
    info?: any;
    builderType?: string | null;
};
export interface Path {
    pathname: string;
    search: string;
    hash: string;
}
export declare type RelativeRoutingType = 'route' | 'path';
export interface NavigateOptions {
    replace?: boolean;
    state?: any;
    preventScrollReset?: boolean;
    relative?: RelativeRoutingType;
}
export declare type To = string | Partial<Path>;
export interface NavigateFunction {
    (to: To, options?: NavigateOptions): void;
    (delta: number): void;
}
export {};
//# sourceMappingURL=index.d.ts.map