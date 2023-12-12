import { API } from '@/api/index-instance';
import { AxiosResponseType } from '../types/util';

export const limitFirebaseRequest = (): AxiosResponseType => {
  return API.request({
    method: 'GET',
    url: '/limitRequests',
  });
};
