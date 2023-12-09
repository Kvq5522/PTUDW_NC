import { create } from "zustand";

interface InviteStudentModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useInviteStudentModal = create<InviteStudentModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));