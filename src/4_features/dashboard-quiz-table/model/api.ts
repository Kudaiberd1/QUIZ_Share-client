import api from "../../../6_shared/api/axiosInstance.ts";
import type { QuizResponse, Result } from "../../../5_entity/model/quiz/type.ts";

export const fetchUserQuizzes = async (userId: number) => {
    try {
        let quizzes: QuizResponse[] = [];
        
        const response = await api.get<QuizResponse[]>("/quiz");
        quizzes = response.data.filter((quiz) => quiz.userId === userId);

        const quizzesWithFeedback = await Promise.all(
            quizzes.map(async (quiz) => {
                try {
                    const feedbackResponse = await api.get(`/quiz/feedback/${quiz.id}`);
                    return { ...quiz, feedbackCount: Array.isArray(feedbackResponse.data) ? feedbackResponse.data.length : 0 };
                } catch {
                    return { ...quiz, feedbackCount: 0 };
                }
            })
        );
        
        return quizzesWithFeedback;
    } catch (error) {
        console.error("Error fetching user quizzes:", error);
        throw error;
    }
};

export const fetchTakenQuizzes = async (userId: number) => {
    try {
        let results: Result[] = [];
        
        try {
            const response = await api.get<Result[]>(`/quiz/result/user/${userId}`);
            results = response.data;
        } catch(error) {
            console.error("Error fetching User's taken quiz:", error);
            throw error;
        }

        return results.map((result) => {
            const quizResponse: QuizResponse = {
                id: result.quiz.id || 0,
                title: result.quiz.title,
                difficulty: result.quiz.difficulty,
                subject: result.quiz.subject,
                description: result.quiz.description,
                privacy: result.quiz.privacy,
                questions: result.quiz.questions.map((q, idx) => ({
                    id: idx,
                    question: q.question,
                    variants: q.variants.map((v, vIdx) => ({ id: vIdx, option: v })),
                    answer: q.answer,
                })),
                imageUrl: "",
                userId: result.quiz.authorId,
                firstName: "",
                lastName: "",
                rate: [],
                takeTimeLimit: result.quiz.takeTimeLimit || 0,
            };

            return {
                id: result.id,
                quiz: quizResponse,
                result: {
                    correct: result.correct,
                    wrong: result.wrong,
                    skipped: result.skipped,
                    percentage: Math.round(
                        (result.correct / (result.correct + result.wrong + result.skipped)) * 100
                    ),
                },
                completedAt: new Date().toISOString(),
            };
        });
    } catch (error) {
        console.error("Error fetching taken quizzes:", error);
        return [];
    }
};

