import { cookies } from 'next/headers';
import { instance } from './api';
import { User } from '../../types/user';
import { Note } from '../../types/note';

const getHeaders = async () => {
  const cookieStore = await cookies();
  return { Cookie: cookieStore.toString() };
};

export const serverApi = {
  async checkSession() {
    const headers = await getHeaders();
    const { data } = await instance.get<User | null>('/auth/session', { headers });
    return data;
  },
  async getMe() {
    const headers = await getHeaders();
    const { data } = await instance.get<User>('/users/me', { headers });
    return data;
  },
  async fetchNotes(params: any) {
    const headers = await getHeaders();
    const { data } = await instance.get<Note[]>('/notes', { params, headers });
    return data;
  },
  async fetchNoteById(id: string) {
    const headers = await getHeaders();
    const { data } = await instance.get<Note>(`/notes/${id}`, { headers });
    return data;
  },
};