import { instance } from './api';
import { User } from '../../types/user';
import { Note } from '../../types/note';

export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export const register = async (data: any) => {
  const res = await instance.post<User>('/auth/register', data);
  return res.data;
};

export const login = async (data: any) => {
  const res = await instance.post<User>('/auth/login', data);
  return res.data;
};

export const logout = async () => {
  await instance.post('/auth/logout');
};

export const checkSession = async () => {
  const res = await instance.get<User | null>('/auth/session');
  return res.data;
};

export const getMe = async () => {
  const res = await instance.get<User>('/users/me');
  return res.data;
};

export const updateMe = async (data: { username: string }) => {
  const res = await instance.patch<User>('/users/me', data);
  return res.data;
};

export const fetchNotes = async (params: any) => {
  const res = await instance.get<NotesResponse>('/notes', { params });
  return res.data;
};

export const fetchNoteById = async (id: string) => {
  const res = await instance.get<Note>(`/notes/${id}`);
  return res.data;
};

export const getNoteById = fetchNoteById;

export const createNote = async (data: any) => {
  const res = await instance.post<Note>('/notes', data);
  return res.data;
};

export const deleteNote = async (id: string) => {
  const res = await instance.delete(`/notes/${id}`);
  return res.data;
};

export const updateNote = async (id: string, data: any) => {
  const res = await instance.patch<Note>(`/notes/${id}`, data);
  return res.data;
};