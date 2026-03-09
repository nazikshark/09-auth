import { cookies } from 'next/headers';
import { api } from '@/app/api/api';
import { Note } from '@/types/note';
import { User } from '@/types/user';
import { AxiosResponse } from 'axios';

export const serverApi = {
  checkSession: async (): Promise<AxiosResponse<User>> => {
    const cookieStore = await cookies();
    return await api.get<User>('/auth/session', {
      headers: { Cookie: cookieStore.toString() },
    });
  },

  getUser: async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await api.get<User>('/users/me', {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  },

  fetchNotes: async (params?: Record<string, string | number>): Promise<Note[]> => {
    const cookieStore = await cookies();
    const { data } = await api.get<Note[]>('/notes', {
      params,
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  },

  getNoteById: async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const { data } = await api.get<Note>(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return data;
  }
};