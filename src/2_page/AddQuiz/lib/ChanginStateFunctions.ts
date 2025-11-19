import type {QuestionProp} from "../../../5_entity/model/quiz/type.ts";

interface Prop {
    qIndex: number;
    setQuestions: React.Dispatch<React.SetStateAction<QuestionProp[]>>;
}

export const addOption = ({ qIndex, setQuestions} : Prop ) => {
    setQuestions(prev =>
        prev.map((q, i) =>
            i === qIndex
                ? { ...q, variants: [...q.variants, ""] }
                : q
        )
    );
};

export const deleteQuestion = ({ qIndex, setQuestions} : Prop) => {
    setQuestions(prev => prev.filter((_, i) => i !== qIndex));
};

export const deleteOption = (qIndex: number, optionIndex: number, setQuestions: React.Dispatch<React.SetStateAction<QuestionProp[]>>) => {
    setQuestions(prev =>
        prev.map((q, i) =>
            i === qIndex
                ? {
                    ...q,
                    variants: q.variants.filter((_, oi) => oi !== optionIndex)
                }
                : q
        )
    );
};

export const updateQuestionField = (
    qIndex: number,
    field: keyof QuestionProp,
    value: string | string[],
    setQuestions: React.Dispatch<React.SetStateAction<QuestionProp[]>>
) => {
    setQuestions(prev =>
        prev.map((q, i) =>
            i === qIndex ? { ...q, [field]: value } : q
        )
    );
};


export const updateVariant = (
    qIndex: number,
    variantIndex: number,
    newValue: string,
    setQuestions: React.Dispatch<React.SetStateAction<QuestionProp[]>>
) => {
    setQuestions(prev =>
        prev.map((q, i) =>
            i === qIndex
                ? {
                    ...q,
                    variants: q.variants.map((v, vi) =>
                        vi === variantIndex ? newValue : v
                    )
                }
                : q
        )
    );
};

export const toggleAnswer = (
    qIndex: number,
    optionIndex: number,
    setQuestions: React.Dispatch<React.SetStateAction<QuestionProp[]>>
) => {
    setQuestions(prev =>
        prev.map((q, i) =>
            i === qIndex
                ? {
                    ...q,
                    answer: q.answer.includes(optionIndex)
                        ? q.answer.filter(a => a !== optionIndex)
                        : [...q.answer, optionIndex]
                }
                : q
        )
    );

};