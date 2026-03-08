import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL 
  ? `${process.env.NEXT_PUBLIC_API_URL}/api` 
  : '/api';

export const instance = axios.create({
  baseURL,
  withCredentials: true,
});