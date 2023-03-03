import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { BookingInterface } from "@/interfaces/BookingInterface";
import { BookingFilterInterface } from "@/interfaces/filter/BookingFilterInterface";
import { filterObjectToQueryString } from "@/utils/FilterQueryString";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllBookings = async () => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = undefined // TODO: discuss how will we query data
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking`, configs)
    
    const res = axios_res.data as ApiResponseInterface<BookingInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    // console.log(res)
    return res;
} 

export const getBookingById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking/${id}`, configs)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const getAllBookingsFromTourist = async (userId: string, filter: BookingFilterInterface | undefined = undefined) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = filter != null ? '?' + filterObjectToQueryString(filter) : ""
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking/byTourist/${userId}${query}`, configs)
    
    const res = axios_res.data as ApiResponseInterface<BookingInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    // console.log(res)
    return res;
}

export const getAllBookingsAcceptedInProgram = async (programId: string, filter: BookingFilterInterface | undefined = undefined) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const query = filter != null ? '?' + filterObjectToQueryString(filter) : ""
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking/acceptedInProgram/${programId}${query}`, configs)
    
    const res = axios_res.data as ApiResponseInterface<BookingInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    // console.log(res)
    return res;
}

export const createBooking = async (data: BookingInterface) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/booking`, data, configs) 
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const deleteBookingById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.delete(`${appConfig.BACKEND_URL}/api/booking/${id}`, configs)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const acceptBookingById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/booking/accept/${id}`,{},  configs)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const declineBookingById = async (id: string) => {
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/booking/decline/${id}`,{}, configs)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}