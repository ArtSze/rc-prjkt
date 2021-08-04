import axios, { AxiosRequestConfig } from 'axios';

export const baseURL = 'https://rc-project-jjtv5.ondigitalocean.app/api';
export const authURL = baseURL + '/auth';

const config: AxiosRequestConfig = {
    baseURL,
    headers: { 'X-Requested-With': 'XMLHttpRequest', 'Access-Control-Allow-Origin': '*' },
};
export const axiosInstance = axios.create(config);
