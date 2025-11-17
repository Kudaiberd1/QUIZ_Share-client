export interface QuizResponse {
    id: number;
    title: string;
    difficulty: string;
    subject: string;
    description: string;
    privacy: string;
    questions: Question[];
    userId: number;
    firstName: string;
    lastName: string;
    rate: number[];
}

interface Question {
    id: number;
    question: string;
    variants: Variant[];
    answer: string[];
}

interface Variant {
    id: number;
    option: string;
}

export interface QuestionProp {
    question: string;
    variants: string[];
    answer: number[];
}