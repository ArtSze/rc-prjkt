import axios, { AxiosRequestConfig } from 'axios';

export const baseURL = 'http://localhost:4000';
export const authURL = baseURL + '/auth';

const config: AxiosRequestConfig = { baseURL };
export const axiosInstance = axios.create(config);
