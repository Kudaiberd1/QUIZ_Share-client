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
    takeTimeLimit: number;
}

interface Question {
    id: number;
    question: string;
    variants: Variant[];
    answer: number[];
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
    id?: number;
    title: string;
    description: string;
    difficulty: string;
    subject: string;
    privacy: string;
    questions: QuestionProp[];
    authorId: number;
    takeTimeLimit?: number;
}

export interface AnswerProp {
    questionIndex: number;
    selectedOptions: number[];
}

export interface Result {
    id: number;
    quiz: QuizProp;
    userAnswers: AnswerProp[];
    statuses: string[];
    correct: number;
    wrong: number;
    skipped: number;
    rating: number;
    authorId: number;
}

export interface Feedback {
    id: number;
    feedback: string;
    star: number;
    authorId: number;
    toUserId: number;
    quizId: number;
    readed: boolean;
    createdAt: string;
}