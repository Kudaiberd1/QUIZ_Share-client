import AnswerOption from "./AnswerOption.tsx";
import {useState} from "react";
import {useSelectStore} from "../../4_features/taking-quiz/model/store.ts";

interface Options{
    id: number;
    option: string;
}

interface Props {
    title: string;
    options: Options[];
    answers: number[];
    questionIndex: number;
}

const QuestionOptions = ({title, options, answers, questionIndex} : Props) => {

    const alphabet = "ABCDEFGH";
    const multipleChoice = answers.length>1;
    const { setSelected } = useSelectStore();
    const selected = useSelectStore(state => state.selected);
    const [selecteds, setSelecteds] = useState<number[][]>(selected ?? []);

    const setSelect = (index: number) => {
        const updated = [...selecteds];
        if (!updated[questionIndex]) updated[questionIndex] = [];

        updated[questionIndex] = updated[questionIndex].includes(index)
            ? updated[questionIndex].filter(i => i !== index)
            : [...updated[questionIndex], index];

        console.log(updated);
        setSelecteds(updated);
        setSelected(updated);
    };

    return (
        <>
            <p className={"text-[24px] mb-[21px]"}> {title} </p>
            {multipleChoice && <p className={"text-neutral-400 my-3 text-sm"}> Multiple choice </p>}
            <div className={"space-y-[16px] mb-[41px]"}>
                {options.map((option, index) =>
                    <AnswerOption label={alphabet[index]} text={option.option} selected={selecteds[questionIndex].includes(index)} onClick={() => {setSelect(index);}} key={index} />
                )}
            </div>
        </>
    )
}

export default QuestionOptions;