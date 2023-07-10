import { IRole } from "./Role";

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    image: {
        public_id: string;
        url: string;
    };
    role: IRole;
    password: string;
}