import { create } from "zustand";

interface CreateClassModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useCreateClassModal = create<CreateClassModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));