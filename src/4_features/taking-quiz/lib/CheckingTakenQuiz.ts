import type {AnswerProp, QuizResponse} from "../../../5_entity/model/quiz/type.ts";


const arraysEqual = (arr1: number[], arr2: number[]) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

export const CheckTakenQuiz = (quiz: QuizResponse, selected: number[][]) => {
    let correct = 0;
    let wrong = 0;
    let missed = 0;
    const answers: AnswerProp[] = [];

    for (let i = 0; i < quiz.questions.length; i++) {
        const chosen = selected[i].sort((a, b) => a - b);
        const right = quiz.questions[i].answer;

        if (arraysEqual(chosen, right)) correct++;
        else if (!chosen || chosen.length === 0) missed++;
        else wrong++;

        answers.push({ questionIndex: i, selectedOptions: chosen });
    }

    return { correct, wrong, missed, answers };
};

export default CheckTakenQuiz;