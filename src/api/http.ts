import axios, { AxiosError, AxiosResponse } from "axios";

const axiosConfig = axios.create({ baseURL: process.env.REACT_APP_API_URL, withCredentials: true });

const axiosResponseBody = <T>(response: AxiosResponse<T>) => response.data;
const axiosErrorBody = (error: AxiosError) => {
    throw error?.response?.data;
}

export const http = {
    get: <T>(url: string, params?: Record<string, string>) =>
        axiosConfig.get<T>(url, { params }).then(axiosResponseBody).catch(axiosErrorBody),
    post: <T>(url: string, body: any) =>
        axiosConfig.post<T>(url, body).then(axiosResponseBody).catch(axiosErrorBody),
    put: <T>(url: string, body: any) =>
        axiosConfig.put<T>(url, body).then(axiosResponseBody).catch(axiosErrorBody),
    delete: <T>(url: string) =>
        axiosConfig.delete<T>(url).then(axiosResponseBody).catch(axiosErrorBody)
}