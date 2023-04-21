import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { NotificationInterface } from "@/interfaces/NotificationInterface";
import {  isHttpStatusOk } from "@/utils/Utils";
import { filterObjectToQueryString } from "@/utils/FilterQueryString";
import axios from "axios";


export const getAllNotificationsFromUser = async (userId: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = undefined // TODO: discuss how will we query data
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/notification/notify/${userId}`, configs)
    
    const res = axios_res.data as ApiResponseInterface<NotificationInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const readAllNotificationsFromUser = async (userId: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/notification/readAll/${userId}`, {}, configs)
    
    const res = axios_res.data as ApiResponseInterface<NotificationInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const readNotificationsById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    console.log(configs)
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/notification/read/${id}`, {}, configs)
    
    const res = axios_res.data as ApiResponseInterface<NotificationInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
} 

export const deleteNotificationById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.delete(`${appConfig.BACKEND_URL}/api/notification/${id}`, configs)
    const res = axios_res.data as ApiResponseInterface<NotificationInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
}