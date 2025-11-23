import { create } from "zustand/react";
import type { DashboardQuiz, DashboardTakenQuiz } from "../../../5_entity/model/dashboard/type.ts";

interface DashboardQuizStore {
    myQuizzes: DashboardQuiz[] | null;
    takenQuizzes: DashboardTakenQuiz[] | null;
    loading: boolean;
    error: string | null;
    setMyQuizzes: (quizzes: DashboardQuiz[]) => void;
    setTakenQuizzes: (quizzes: DashboardTakenQuiz[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useDashboardQuizStore = create<DashboardQuizStore>((set) => ({
    myQuizzes: null,
    takenQuizzes: null,
    loading: false,
    error: null,
    setMyQuizzes: (quizzes) => set({ myQuizzes: quizzes }),
    setTakenQuizzes: (quizzes) => set({ takenQuizzes: quizzes }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
}));

