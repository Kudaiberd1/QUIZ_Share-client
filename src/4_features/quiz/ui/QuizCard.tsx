import type { QuizResponse } from "../../../5_entity/model/quiz/type.ts";
import default_image from "../../../assets/default-quiz-image.png";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {useEffect, useState} from "react";

const difficultyColor: Record<string, string> = {
    EASY: "text-green-400 bg-green-400/10",
    MEDIUM: "text-yellow-400 bg-yellow-400/10",
    HARD: "text-red-400 bg-red-400/10",
};

const QuizCard = ({ quiz }: { quiz: QuizResponse }) => {
    const navigate = useNavigate();
    const [avgRate, setAvgRate] = useState(0.0);

    useEffect(() => {
        let avg = 0;
        let sm=0;
        for(let i = 0;i < quiz.rate.length; i++){
            avg+=(quiz.rate[i]*(i+1));
            sm+=quiz.rate[i];
        }
        if(sm!=0)
            avg=avg/sm;

        setAvgRate(avg);
    },[quiz])


    return (
        <div
            className="mx-auto md:mx-0 group cursor-pointer h-[480px] w-full max-w-[380px] rounded-2xl overflow-hidden
                 bg-[#1E2039] shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
        >
            <div className="w-full h-[200px] overflow-hidden">
                <img
                    src={quiz.imageUrl || default_image}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    alt="quiz preview"
                />
            </div>

            <div className="p-6 flex flex-col h-[280px] justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-lg text-sm bg-[#2A2D4A] text-blue-400">
              {quiz.subject}
            </span>

                        <span
                            className={`px-3 py-1 text-sm rounded-lg ${
                                difficultyColor[quiz.difficulty]
                            }`}
                        >
              {quiz.difficulty}
            </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-xl font-semibold mb-3 text-white line-clamp-1">
                        {quiz.title}
                    </h1>

                    {/* Description */}
                    <p className="text-[15px] text-gray-400 line-clamp-2">
                        {quiz.description || "No description"}
                    </p>
                </div>

                {/* Bottom Section */}
                <div>
                    {/* Questions + Rating */}
                    <div className="flex justify-between items-center mt-4 mb-2">
                        <p className="text-gray-300 text-[15px]">
                            {quiz.questions.length} Questions
                        </p>

                        <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="w-5 h-5 fill-yellow-400 stroke-yellow-400" />
                            <span className="font-semibold text-lg">{avgRate}</span>
                        </div>
                    </div>

                    {/* Author */}
                    <p className="text-gray-400 text-[15px]">
                        By {quiz.firstName} {quiz.lastName}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default QuizCard;
