import { create } from "zustand/react";
import type {QuizResponse} from "../../model/quiz/type.ts";

interface QuizStore {
    quiz: QuizResponse[] | null;
    setQuiz: (quiz: QuizResponse[]) => void;
    updateQuiz: (partial: Partial<QuizResponse[]>) => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
    quiz: null,

    setQuiz : (quiz) => {set({ quiz })},

    updateQuiz: (partial) =>
        set(() => ({
            quiz: partial as QuizResponse[],
        })),
}));
