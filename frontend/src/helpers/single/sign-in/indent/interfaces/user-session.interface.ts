export interface IUserSession {
    id?: string;
    uuid: string;
    name: string;
    email: string;
    createdAt: string; 
    updatedAt: string;
    changePassword: boolean;
    accessToken?: string;
    refreshToken?: string;
}
