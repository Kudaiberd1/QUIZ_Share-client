import type {MouseEvent} from "react";

interface Props {
    label: string;
    text: string;
    selected: boolean;
    correct: boolean;
    onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const TakenAnswerOption = ( {label, text, selected, correct, onClick } : Props ) => {
    console.log(selected, correct);
    return (
        <div
            className={`rounded-2xl p-4 flex items-center gap-4 text-[#E6ECF5] ${
                selected && correct ? "bg-green-700" :
                    selected && !correct ? "bg-red-700" :
                        !selected && correct ? "bg-green-700" :
                            "bg-[#0E1A2F] hover:bg-[#17325B]"
            }`}
            onClick={onClick}
        >
            <div className="w-8 h-8 rounded-full bg-[#2f3136] flex items-center justify-center text-sm font-semibold">
                {label}
            </div>
            <span className="text-lg">{text}</span>
        </div>
    );
};

export default TakenAnswerOption;