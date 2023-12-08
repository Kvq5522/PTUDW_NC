import { create } from "zustand";

interface InviteTeacherModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useInviteTeacherModal = create<InviteTeacherModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));