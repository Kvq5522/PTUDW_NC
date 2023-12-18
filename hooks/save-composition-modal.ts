import { create } from "zustand";

interface SaveCompostionModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSaveCompositionModal = create<SaveCompostionModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));