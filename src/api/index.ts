import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const baseUrl = '/api';

export const get = (
  path: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> => {
  return axios.get(`${baseUrl}${path}`, config);
};

export const post = (
  path: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<any>> => axios.post(`${baseUrl}${path}`, data, config);

export default {
  get,
  post,
};
