import type { QuizResponse } from "../quiz/type.ts";

export interface DashboardQuiz extends QuizResponse {
    feedbackCount?: number;
}

export interface DashboardTakenQuiz {
    id: number;
    quiz: QuizResponse;
    result: {
        correct: number;
        wrong: number;
        skipped: number;
        percentage: number;
    };
    completedAt: string;
}

