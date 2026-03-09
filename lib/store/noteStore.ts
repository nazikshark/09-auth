import { create } from 'zustand';

interface NoteState {
  notes: any[];
  setNotes: (notes: any[]) => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
}));