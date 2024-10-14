import { IBackendTokens } from "./backend.interface";
import { IUser } from "./user.interface";

export interface ILoggedData {
    user: IUser;
    backendTokens: IBackendTokens;
}
