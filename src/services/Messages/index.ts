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
      error.response.status === 403 ||
      error.response.status === 401 ||
      error.response.status === 400
    ) {
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

  public successMessage(response: AxiosResponse) {
    if (response?.status === 201 || response?.status === 202) {
      this.messageAlert(response?.statusText, "success");
    }
  }
}

export default Messages;
