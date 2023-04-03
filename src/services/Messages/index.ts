import { AxiosResponse } from "axios";
import { IErrorHandle } from "../../types";

export class Messages {
  messageAlert: (message: string, type: "danger" | "success") => void;
  constructor(config: IErrorHandle) {
    this.messageAlert = config?.messageAlert;
  }
  public errorHanle(error: any) {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response?.data?.statusCode === 403 ||
      error.response?.data?.statusCode  === 401 ||
      error.response?.data?.statusCode  === 404 ||
      error.response?.data?.statusCode  === 500 ||
      error.response?.data?.statusCode  === 400
    ) {
      this.messageAlert(error.response.data?.message, "danger");
      return;
    }

    if (error.response?.data?.statusCode === 422) {
      const errorBody = error.response?.data?.message;
      errorBody.forEach((message: string) => {
        this.messageAlert(message, "danger");
      });

    }

    return Promise.reject(error);
  }

  public successMessage(response: AxiosResponse) {
    if (response?.status === 201 || response?.status === 202  || response?.status === 204) {
      if(response?.statusText?.length > 2) {
        this.messageAlert(response?.statusText, "success");
      }
    }
  }
}

export default Messages;
