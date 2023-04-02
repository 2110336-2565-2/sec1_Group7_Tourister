import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";
import { TopUpTransactionDataInterface } from "@/interfaces/transaction/TopUpTransactionDataInterface";
import { UserInterface } from "@/interfaces/UserInterface";

export const chargeAndTopUpCoins = async (data: TopUpTransactionDataInterface) => {
    console.log(data)
    const configs = localStorage.getItem("accessToken") != undefined ? { headers: { 'Authorization' : `Bearer ${localStorage.getItem("accessToken")}`} } : {}
    const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/topup/coins`, data, configs )
    const res = axios_res.data as ApiResponseInterface<UserInterface>
    if(!isHttpStatusOk(res.code)) throw new ApiErrorResponse(res.message ?? "", res.code, res.errors ?? undefined, res.tag ?? "")
    return res;
}