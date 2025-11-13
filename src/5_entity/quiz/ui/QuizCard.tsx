import type {QuizResponse} from "../../model/quiz/type.ts";
import default_image from "../../../assets/default-quiz-image.png";
import { Star } from "lucide-react";

const QuizCard = ({quiz} : QuizResponse) => {


    return(
        <div className={"mx-auto h-[460px] max-w-[380px] w-full rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition flex flex-col bg-[rgb(32,32,60)] "}>
            <img className={"rounded-2xl h-[200px]"} src={default_image} />

            <div className={"p-[24px]"}>
                <p className={"max-w-fit px-4 py-2 bg-[rgb(33,36,75)] text-[rgb(41,68,213)] mb-[8px] rounded-lg"}> {quiz.subject} </p>
                <h1 className={"mb-[24px] text-[20px]"}> {quiz.title} </h1>
                <p className={"text-[rgb(170,172,182)] text-[16px] mb-[6px]"}> {quiz.description} </p>

                <div className={"flex justify-between mb-[8px]"}>
                    <p className={"text-[rgb(170,172,182)] text-[16px]"}> {quiz.questions.length} Questions </p>
                    <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-5 h-5 fill-transparent stroke-current" />
                        <span className="text-lg font-semibold">{quiz.rate.reduce((acc, num) => acc + num, 0) / quiz.rate.length}</span>
                    </div>
                </div>

                <p className={"text-[rgb(170,172,182)]"}> By {quiz.firstName} {quiz.lastName} </p>
            </div>
        </div>
    );
}

export default QuizCard;