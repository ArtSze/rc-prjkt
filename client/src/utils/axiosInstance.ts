import axios, { AxiosRequestConfig } from 'axios';
import { paramsSerializer } from '../utils/paramParser';

export const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/api' : '/api';

export const authURL = baseURL + '/auth';

const config: AxiosRequestConfig = { baseURL, withCredentials: true, paramsSerializer };
export const axiosInstance = axios.create(config);
