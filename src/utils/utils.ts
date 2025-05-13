import axios from 'axios';

// Base API request function
export async function apiReq<T = any>(
  endPoint: string,
  data: Record<string, any> = {},
  method: 'get' | 'post' | 'put' | 'delete' = 'get',
  headers: Record<string, string> = {},
  requestOptions: Record<string, any> = {},
): Promise<T> {
  const response = await axios({
    url: endPoint,
    method,
    headers,
    data: method === 'get' ? undefined : data,
    params: method === 'get' ? data : undefined,
    ...requestOptions,
  });
  return response.data;
}
// Specific API methods
export const apiGet = <T = any>(
  endPoint: any,
  params: Record<string, any> = {},
  headers: Record<string, string> = {},
) => apiReq<T>(endPoint, params, 'get', headers);

export const apiPost = <T = any>(
  endPoint: any,
  data: Record<string, any>,
  headers: Record<string, string> = {},
) => apiReq<T>(endPoint, data, 'post', headers);

export const apiDelete = <T = any>(
  endPoint: any,
  data: Record<string, any> = {},
  headers: Record<string, string> = {},
) => apiReq<T>(endPoint, data, 'delete', headers);

export const apiPut = <T = any>(
  endPoint: any,
  data: Record<any, any>,
  headers: Record<string, string> = {},
) => apiReq<T>(endPoint, data, 'put', headers);
