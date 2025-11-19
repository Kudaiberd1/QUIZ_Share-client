export interface QuizResponse {
    id: number;
    title: string;
    difficulty: string;
    subject: string;
    description: string;
    privacy: string;
    questions: Question[];
    imageUrl: string;
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

export interface QuizProp {
    title: string;
    description: string;
    difficulty: string;
    subject: string;
    privacy: string;
    question: QuestionProp[];
    authorId: number;
}