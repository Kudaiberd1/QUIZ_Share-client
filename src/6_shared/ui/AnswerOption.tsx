import type {MouseEvent} from "react";

interface Props {
    label: string;
    text: string;
    selected: boolean;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

const AnswerOption = ( {label, text, selected, onClick } : Props ) => {
    return (
        <div className={`bg-[#0E1A2F] hover:bg-[#17325B] ${selected && "bg-[#17325B]"} text-[#E6ECF5] rounded-2xl p-4 flex items-center gap-4`} onClick={onClick}>
            <div className="w-8 h-8 rounded-full bg-[#2f3136] flex items-center justify-center text-sm font-semibold">
                {label}
            </div>
            <span className="text-lg">{text}</span>
        </div>
    );
};

export default AnswerOption;