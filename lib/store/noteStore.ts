import { create } from 'zustand';

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteState {
  draft: NoteDraft;
  setDraft: (draft: Partial<NoteDraft>) => void;
  resetDraft: () => void;
}

const initialDraft = { title: '', content: '', tag: '' };

export const useNoteStore = create<NoteState>((set) => ({
  draft: initialDraft,
  setDraft: (newDraft) => set((state) => ({ 
    draft: { ...state.draft, ...newDraft } 
  })),
  resetDraft: () => set({ draft: initialDraft }),
}));