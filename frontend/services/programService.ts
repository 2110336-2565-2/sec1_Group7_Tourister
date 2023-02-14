import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllPrograms = async () => {
    const query = undefined // TODO: discuss how will we query data
    const res = await axios.get(`${appConfig.BACKEND_URL}/api/program`) as ApiResponseInterface<ProgramInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
} 

export const getProgramById = async (id: number) => {
    const res = await axios.get(`${appConfig.BACKEND_URL}/api/program/${id}`) as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const createProgram = async (data: ProgramInterface) => {
    const res = await axios.post(`${appConfig.BACKEND_URL}/api/program`, data) as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const updateProgramById = async (id: number, data: any) => {
    const res = await axios.put(`${appConfig.BACKEND_URL}/api/program/${id}`, data) as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const deleteProgramById = async (id: number) => {
    const res = await axios.delete(`${appConfig.BACKEND_URL}/api/program/${id}`) as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}