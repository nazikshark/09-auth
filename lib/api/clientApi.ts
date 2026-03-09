import { api } from '@/app/api/api';
import { Note } from '@/types/note';
import { User } from '@/types/user';

export const clientApi = {
  login: async (credentials: Pick<User, 'email'> & { password: string }): Promise<User> => {
    const { data } = await api.post<User>('/auth/login', credentials);
    return data;
  },

  register: async (userData: Omit<User, 'id'> & { password: string }): Promise<User> => {
    const { data } = await api.post<User>('/auth/register', userData);
    return data;
  },

  fetchNotes: async (params?: Record<string, string | number | boolean>): Promise<Note[]> => {
    const { data } = await api.get<Note[]>('/notes', { params });
    return data;
  },

  createNote: async (noteData: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const { data } = await api.post<Note>('/notes', noteData);
    return data;
  },

  deleteNote: async (id: string): Promise<Note> => {
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data;
  },

  updateMe: async (updates: Partial<User>): Promise<User> => {
    const { data } = await api.patch<User>('/users/me', updates);
    return data;
  }
};