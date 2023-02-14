export interface ApiResponseInterface<T = unknown | undefined> {
    code: number;
    message?: string;
    data?: T;
    errors?: string;
}