import { create } from "zustand";

interface GradeReassessmentModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useGradeReassessmentModal = create<GradeReassessmentModalState>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
}));