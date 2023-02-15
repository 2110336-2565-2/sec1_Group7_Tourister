import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllPrograms = async () => {
    const query = undefined // TODO: discuss how will we query data
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program`)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
} 

export const getProgramById = async (id: string) => {
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program/${id}`)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const createProgram = async (data: ProgramInterface) => {
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/program`, data) 
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const updateProgramById = async (id: string, data: any) => {
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/program/${id}`, data) 
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const deleteProgramById = async (id: string) => {
    const axios_res = await axios.delete(`${appConfig.BACKEND_URL}/api/program/${id}`)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}