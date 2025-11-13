import {useEffect, useState} from "react";
import api from "../../../6_shared/api/axiosInstance.ts";
import type {QuizResponse} from "../../model/quiz/type.ts";
import QuizCard from "./QuizCard.tsx";

const QuizList = () => {

    const [quizzes, setQuizzes] = useState<QuizResponse[]>();

    useEffect(() => {
        api.get("/quiz")
            .then((res) => {setQuizzes(res.data)})
            .catch((err) => console.log(err, "from fetching quizzes"));
    },[]);

    return (
        <div className={"flex flex-wrap gap-6"}>
            {quizzes?.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
            ))}
        </div>
    )
}

export default QuizList;