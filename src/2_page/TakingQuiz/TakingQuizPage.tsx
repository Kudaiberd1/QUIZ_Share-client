import Navbar from "../../3_widget/navbar/Navbar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../6_shared/api/axiosInstance.ts";
import type { QuizResponse } from "../../5_entity/model/quiz/type.ts";
import QuestionOptions from "../../6_shared/ui/QuestionOptions.tsx";
import { useSelectStore } from "../../4_features/taking-quiz/model/store.ts";
import Timer from "../../4_features/timer/Timer.tsx";
import CheckingTakenQuiz from "../../4_features/taking-quiz/lib/CheckingTakenQuiz.ts";
import { useUserStore } from "../../4_features/auth/model/store.ts";

const TakingQuizPage = () => {

    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [quiz, setQuiz] = useState<QuizResponse>();

    const [pageIndex, setPageIndex] = useState(0);
    const selected = useSelectStore(state => state.selected);
    const { setSelected } = useSelectStore();
    const user = useUserStore(state => state.user);

    const answeredCount = selected?.filter(arr => arr.length > 0).length;
    const totalQuestions = quiz?.questions.length ?? 1;
    const progress = (answeredCount / totalQuestions) * 100;


    useEffect(() => {
        api.get(`/quiz/${id}`)
            .then((res) => {
                setQuiz(res.data);
                const empty = Array(res.data.questions.length).fill([] as number[]);
                setSelected(empty);
            })
            .catch((err) => console.log("Error from taking quiz page", err));
    }, [])

    const handleSubmit = () => {
        const result = CheckingTakenQuiz(quiz, selected);
        api.post("/quiz/result", {
            quiz: quiz.id,
            userAnswers: result.answers,
            correct: result.correct,
            wrong: result.wrong,
            skipped: result.missed,
            authorId: user.id
        }).then((res) => { navigate(`/quiz/result/${res.data.id}`) })
            .catch((err) => console.log(err, "from taken quiz page"));
    }

    return (
        <div className={`flex min-h-screen`}>
            <div className={"flex-1 flex flex-col"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full items-center"}>

                    <div className={"md:bg-[#0f1236] md:p-[60px] mx-auto max-w-[800px] rounded-lg mt-[80px]"}>
                        <div className={"flex justify-between"}>
                            <p className={"text-[14px] text-neutral-400"}>Progress: {pageIndex + 1}/5</p>
                            {quiz && <Timer seconds={quiz?.takeTimeLimit} onComplete={() => navigate(`/quiz/${id}/result`)} />}
                        </div>
                        <div className="w-full h-2 bg-blue-200 rounded overflow-hidden mt-[18px]">
                            <div
                                className="h-full bg-blue-600"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className={"mt-[41px]"}>
                            {quiz?.questions.map((question, index) =>
                                pageIndex == index && <QuestionOptions title={question.question} options={question.variants} answers={question.answer} questionIndex={index} key={index} />
                            )}


                            <div>
                                <div className={"border-t border-neutral-700"}></div>
                                <div className="flex justify-between my-[25px]">
                                    {pageIndex != 0 ?
                                        <button
                                            className="
                                              border border-gray-500
                                              px-[16px] py-[10px]
                                              rounded-lg
                                              text-gray-300
                                              transition
                                              hover:bg-gray-700 hover:border-transparent hover:text-white
                                            "
                                            onClick={() => setPageIndex(pageIndex - 1)}
                                        >
                                            Previous
                                        </button>
                                        : <div></div>}

                                    {pageIndex != (quiz?.questions.length) - 1 ?
                                        <button
                                            className="
                                                  px-[16px] py-[10px]
                                                  bg-blue-700
                                                  text-white
                                                  rounded-lg
                                                  transition
                                                  hover:bg-blue-600 hover:shadow-lg"
                                            onClick={() => setPageIndex(pageIndex + 1)}
                                        >
                                            Next Question
                                        </button>
                                        :
                                        <button
                                            className="
                                                  px-[16px] py-[10px]
                                                  bg-blue-700
                                                  text-white
                                                  rounded-lg
                                                  transition
                                                  hover:bg-blue-600 hover:shadow-lg"
                                            onClick={() => handleSubmit()}
                                        >
                                            Finish Quiz
                                        </button>
                                    }
                                </div>

                            </div>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    )
}

export default TakingQuizPage;