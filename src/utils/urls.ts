// src/api/urls.ts

export const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const getApiUrl = (endpoint: string) => `${API_BASE_URL}${endpoint}`;
export const GET_USERS =(page:number)=> getApiUrl(`/users?_page=${page}&_limit=5`);

