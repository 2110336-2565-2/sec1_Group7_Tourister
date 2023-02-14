import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllUsers = async () => {
    const query = undefined // TODO: discuss how will we query data
    const res = await axios.get(`${appConfig.BACKEND_URL}/api/user`) as ApiResponseInterface<UserInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
} 

export const getUserById = async (id: number) => {
    const res = await axios.get(`${appConfig.BACKEND_URL}/api/user/${id}`) as ApiResponseInterface<UserInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const createUser = async (data: UserInterface) => {
    const res = await axios.post(`${appConfig.BACKEND_URL}/api/user`, data) as ApiResponseInterface
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const registerUser = async (data: UserInterface) => {
    const res = await axios.post(`${appConfig.BACKEND_URL}/api/user`, data) as ApiResponseInterface
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const updateUserById = async (id: number, data: any) => {
    const res = await axios.put(`${appConfig.BACKEND_URL}/api/user/${id}`, data) as ApiResponseInterface<UserInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const deleteUserById = async (id: number) => {
    const res = await axios.delete(`${appConfig.BACKEND_URL}/api/user/${id}`) as ApiResponseInterface<UserInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}
