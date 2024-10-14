export interface IUser {
    id?: string;
    uuid: string;
    name: string;
    email: string;
    createdAt: Date | string;
    updatedAt: Date | string;
    changePassword: boolean;
}