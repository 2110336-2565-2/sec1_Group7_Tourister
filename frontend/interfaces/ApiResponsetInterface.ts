import { UserInterface } from "./UserInterface";

export interface ApiResponseInterface<T = unknown | undefined> {
    code: number;
    message?: string;
    data?: T;
    errors?: string;
}

export interface ApiLoginResponseInterface extends ApiResponseInterface {
    code: number;
    message?: string;
    data?: UserInterface;
    token?: string;
    errors?: string;
}