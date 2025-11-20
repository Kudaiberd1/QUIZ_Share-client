import {useEffect} from "react";
import api from "../../../6_shared/api/axiosInstance.ts";
import QuizCard from "./QuizCard.tsx";
import {useQuizStore} from "../model/store.ts";

const QuizList = () => {

    const { setQuiz } = useQuizStore();
    const quizzes = useQuizStore((state) => state.quiz);

    useEffect(() => {
        api.get("/quiz")
            .then((res) => setQuiz(res.data))
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