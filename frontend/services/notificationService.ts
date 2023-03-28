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
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
} 