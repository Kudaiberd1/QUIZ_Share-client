import { create } from "zustand/react";
import type { QuizResponse } from "../../../5_entity/model/quiz/type.ts";

interface QuizStore {
    quiz: QuizResponse[] | null;
    setQuiz: (quiz: QuizResponse[]) => void;
    setQuizzes: (newQuiz: QuizResponse) => void;
    updateQuiz: (index: number, updatedQuiz: Partial<QuizResponse>) => void;
    updateQuizzes: (partial: Partial<QuizResponse[]>) => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
    quiz: null,

    setQuiz : (quiz) => {set({ quiz })},

    setQuizzes: (newQuiz) =>
        set((state) => ({
            quiz: state.quiz ? [...state.quiz, newQuiz] : [newQuiz],
        })),

    updateQuiz: (index, updatedQuiz) =>
        set((state) => ({
            quiz: state.quiz
                ? state.quiz.map((q, i) => (i === index ? { ...q, ...updatedQuiz } : q))
                : null,
        })),

    updateQuizzes: (partial) =>
        set(() => ({
            quiz: partial as QuizResponse[],
        })),
}));