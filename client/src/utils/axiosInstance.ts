import axios, { AxiosRequestConfig } from 'axios';
import { paramsSerializer } from '../utils/paramParser';

export const baseURL = '/api';

export const authURL = baseURL + '/auth';

const config: AxiosRequestConfig = { baseURL, withCredentials: true, paramsSerializer };
export const axiosInstance = axios.create(config);
