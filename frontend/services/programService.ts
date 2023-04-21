import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { ProgramFilterInterface } from "@/interfaces/filter/ProgramFilterInterface";
import { ProgramInterface } from "@/interfaces/ProgramInterface";
import {  isHttpStatusOk } from "@/utils/Utils";
import { filterObjectToQueryString } from "@/utils/FilterQueryString";
import axios from "axios";

export const getAllPrograms = async (filter: ProgramFilterInterface | undefined = undefined) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = filter != null ? '?' + filterObjectToQueryString(filter) : ""
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program/published${query}`, configs)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const getProgramById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program/${id}`,configs)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    // console.log(res)
    return res;
}

export const getAllProgramsFromGuide = async (userId: string, filter: ProgramFilterInterface | undefined = undefined) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = filter != null ? '?' + filterObjectToQueryString(filter) : ""
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program/byGuide/${userId}${query}`, configs)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const getAllDarftProgramsFromGuide = async (userId: string, filter: ProgramFilterInterface | undefined = undefined) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = filter != null ? '?' + filterObjectToQueryString(filter) : ""
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/program/draftByGuide/${userId}${query}`, configs)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const createProgram = async (data: ProgramInterface) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/program`, data, configs) 
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
}

export const updateProgramById = async (id: string, data: any) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/program/${id}`, data, configs) 
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
}

export const deleteProgramById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.delete(`${appConfig.BACKEND_URL}/api/program/${id}`, configs)
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
}

export const publishProgram = async (id: string, data: any, images: File[]) => {
    if(data.published != null) data.published = false;
    
    // length of image array must equal to total attractions
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/program/${id}`, data, configs) 
    const res = axios_res.data as ApiResponseInterface<ProgramInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")

    // upload images
    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
    }
    const axios_res2 = await axios.post(`${appConfig.BACKEND_URL}/api/program/upload/photos/${id}`, formData, configs)
    const res2 = axios_res2.data as ApiResponseInterface
    if(!isHttpStatusOk(res2.code)) throw new ApiErrorResponse(res2.message ?? "", res2.code, res2.errors ?? undefined, res2.tag ?? "")
    console.log("upload images success")

    return res;
}