import TakenAnswerOption from "./TakenAnswerOption.tsx";


interface Props {
    title: string;
    options: string[];
    answers: number[];
    questionIndex: number;
    userAnswers: number[];
}

const TakenQuestionOptions = ({title, options, answers, questionIndex, userAnswers} : Props) => {

    const alphabet = "ABCDEFGH";
    const multipleChoice = answers.length>1;

    console.log(options, answers, userAnswers, questionIndex);

    return (
        <>
            <p className={"text-[24px] mb-[21px]"}> {title} </p>
            {multipleChoice && <p className={"text-neutral-400 my-3 text-sm"}> Multiple choice </p>}
            <div className={"space-y-[16px] mb-[41px]"}>
                {options.map((option, index) =>
                    <TakenAnswerOption
                        label={alphabet[index]}
                        text={option}
                        selected={userAnswers.includes(index)}
                        correct={answers.includes(index)}
                        onClick={() => {}}
                    />
                )}
            </div>
        </>
    )
}

export default TakenQuestionOptions;