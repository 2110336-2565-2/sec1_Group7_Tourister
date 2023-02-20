import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { BookingInterface } from "@/interfaces/BookingInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllBookings = async () => {
    const query = undefined // TODO: discuss how will we query data
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking`)
    const res = axios_res.data as ApiResponseInterface<BookingInterface[]>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
} 

export const getBookingById = async (id: string) => {
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/booking/${id}`)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const createBooking = async (data: BookingInterface) => {
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/booking`, data) 
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const updateBookingById = async (id: string, data: any) => {
    const axios_res = await axios.put(`${appConfig.BACKEND_URL}/api/booking/${id}`, data) 
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}

export const deleteBookingById = async (id: string) => {
    const axios_res = await axios.delete(`${appConfig.BACKEND_URL}/api/booking/${id}`)
    const res = axios_res.data as ApiResponseInterface<BookingInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined)
    return res;
}