import appConfig from "@/configs/appConfig";
import ApiErrorResponse from "@/exceptions/ApiErrorResponse";
import { ApiLoginResponseInterface, ApiResponseInterface } from "@/interfaces/ApiResponsetInterface";
import { UserInterface } from "@/interfaces/UserInterface";
import { isHttpStatusOk } from "@/utils/Utils";
import axios from "axios";

export const getAllUsers = async () => {
  const query = undefined; // TODO: discuss how will we query data
  const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/user`);
  const res = axios_res.data as ApiResponseInterface<UserInterface[]>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const getUserById = async (id: string) => {
  const axios_res = await axios.get(`${appConfig.BACKEND_URL}/api/user/${id}`);
  const res = axios_res.data as ApiResponseInterface<UserInterface>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const createUser = async (data: UserInterface) => {
  const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/user`, data);
  const res = axios_res.data as ApiResponseInterface<UserInterface>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const registerUser = async (data: UserInterface) => {
  const axios_res = await axios.post(`${appConfig.BACKEND_URL}/api/user`, data);
  const res = axios_res.data as ApiResponseInterface<UserInterface>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const updateUserById = async (id: string, data: any) => {
  const axios_res = await axios.put(
    `${appConfig.BACKEND_URL}/api/user/${id}`,
    data
  );
  const res = axios_res.data as ApiResponseInterface<UserInterface>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const deleteUserById = async (id: string) => {
  const axios_res = await axios.delete(
    `${appConfig.BACKEND_URL}/api/user/${id}`
  );
  const res = axios_res.data as ApiResponseInterface<UserInterface>;
  if (!isHttpStatusOk(res.code))
    throw new ApiErrorResponse(
      res.message ?? "",
      res.code,
      res.errors ?? undefined
    );
  return res;
};

export const userLogin = async (email: string, password: string) => {
    const axios_res = await axios.post(
        `${appConfig.BACKEND_URL}/auth/login`,
        {
            email: email,
            password: password,
        }
    )
    const res = axios_res.data as ApiLoginResponseInterface;
    if (!isHttpStatusOk(res.code))
        throw new ApiErrorResponse(
            res.message ?? "",
            res.code,
            res.errors ?? undefined
        );
    return res;
}
