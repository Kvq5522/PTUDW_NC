import { create } from "zustand";

interface GradeReviewModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useGradeReviewModal = create<GradeReviewModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));