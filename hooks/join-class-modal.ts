import { create } from "zustand";

interface JoinClassModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useJoinClassModal = create<JoinClassModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));