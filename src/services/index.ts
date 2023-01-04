import { AxiosRequestConfig } from "axios";
import axios, { AxiosInstance } from "axios";
import authHeader from "./auth-headers";
import Messages from "./Messages";
import { IServices } from "../types";

export class Services {
  api: AxiosInstance;
  messages: Messages;

  constructor(config: IServices) {
    const base_url = config?.baseUrl;
    // Action Messages
    this.messages = new Messages(config.messageConfig);
    // Action Messages

    this.api = axios.create({
      baseURL: base_url,
    });

    this.api.interceptors.request.use(function (config) {
      config.headers = { ...authHeader(), ...config.headers };
      return config;
    });

    this.api.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response) => {
        this.messages.successMessage(response);
        return response;
      },
      (error) => {
        this.messages.errorHanle(error);
      }
    );
  }

  public fetch(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, "url" | "method">
  ) {
    return this.api({
      ...options,
      url: endpoint,
      method: "GET",
    });
  }

  public create(
    endpoint: string,
    data: AxiosRequestConfig["data"],
    options?: Omit<AxiosRequestConfig, "url" | "method" | "data">
  ) {
    return this.api({
      ...options,
      url: endpoint,
      method: "POST",
      data,
    });
  }

  public update(
    endpoint: string,
    data: AxiosRequestConfig["data"],
    options?: Omit<AxiosRequestConfig, "url" | "method" | "data">
  ) {
    return this.api({
      ...options,
      url: endpoint,
      method: "PUT",
      data,
    });
  }

  public updateWithpatch(
    endpoint: string,
    data: AxiosRequestConfig["data"],
    options?: Omit<AxiosRequestConfig, "url" | "method" | "data">
  ) {
    return this.api({
      ...options,
      url: endpoint,
      method: "PATCH",
      data,
    });
  }

  public delete(
    endpoint: string,
    options?: Omit<AxiosRequestConfig, "url" | "method">
  ) {
    return this.api({
      ...options,
      url: endpoint,
      method: "DELETE",
    });
  }
}
