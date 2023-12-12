import axios, { AxiosInstance } from 'axios';

interface Options {
  [key: string]: unknown;
}

const APP_BASE_URL = process.env.VUE_APP_API_BASE_URL;

const defaultHeaders = {
  'Content-Type': 'application/json',
};

export const createInstance = (
  url: string = APP_BASE_URL,
  options: Options = {},
): AxiosInstance => {
  const mergedOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
    },
  };

  const instance = axios.create({
    baseURL: url,
    ...mergedOptions,
  });

  instance.defaults.timeout = 300000;

  return instance;
};

const API = createInstance(`${APP_BASE_URL}`, { defaultHeaders });
export { API };
