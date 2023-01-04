import { AxiosRequestConfig } from "axios";
import { AxiosInstance } from "axios";
import Messages from "./Messages";
import { IServices } from "../types";
export declare class Services {
    api: AxiosInstance;
    messages: Messages;
    constructor(config: IServices);
    fetch(endpoint: string, options?: Omit<AxiosRequestConfig, "url" | "method">): Promise<import("axios").AxiosResponse<any, any>>;
    create(endpoint: string, data: AxiosRequestConfig["data"], options?: Omit<AxiosRequestConfig, "url" | "method" | "data">): Promise<import("axios").AxiosResponse<any, any>>;
    update(endpoint: string, data: AxiosRequestConfig["data"], options?: Omit<AxiosRequestConfig, "url" | "method" | "data">): Promise<import("axios").AxiosResponse<any, any>>;
    updateWithpatch(endpoint: string, data: AxiosRequestConfig["data"], options?: Omit<AxiosRequestConfig, "url" | "method" | "data">): Promise<import("axios").AxiosResponse<any, any>>;
    delete(endpoint: string, options?: Omit<AxiosRequestConfig, "url" | "method">): Promise<import("axios").AxiosResponse<any, any>>;
}
//# sourceMappingURL=index.d.ts.map