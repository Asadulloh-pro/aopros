import { AxiosResponse } from "axios";
import { IErrorHandle } from "../../types";
export declare class Messages {
    messageAlert: (message: string, type: "danger" | "success") => void;
    logout: () => void;
    constructor(config: IErrorHandle);
    errorHanle(error: any): Promise<never> | undefined;
    successMessage(response: AxiosResponse): void;
}
export default Messages;
//# sourceMappingURL=index.d.ts.map