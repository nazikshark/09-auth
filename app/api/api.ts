import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ac.goit.global/text-notes',
  withCredentials: true,
});