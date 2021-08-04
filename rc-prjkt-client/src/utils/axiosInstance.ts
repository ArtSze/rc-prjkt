import axios, { AxiosRequestConfig } from 'axios';

export const baseURL = 'https://rc-project-jjtv5.ondigitalocean.app/';
export const authURL = baseURL + '/auth';

const config: AxiosRequestConfig = { baseURL };
export const axiosInstance = axios.create(config);
