import axios from "axios"
import appConfig from "@/configs/appConfig"
import { isHttpStatusOk } from "@/utils/Utils"
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface"

export const verifyToken = async (token: string, role: string = "") => {
    const configs = token != undefined ? { headers: { 'Authorization' : `Bearer ${token}`} } : {}
    const axios_res = await axios.get(`${appConfig.BACKEND_URL}/auth/verifyToken${role != "" ? '/'+role : ""}`, configs)
    const res = axios_res.data as ApiResponseInterface
    console.log(res)
    if(isHttpStatusOk(res.code)) return true
    else return false
}