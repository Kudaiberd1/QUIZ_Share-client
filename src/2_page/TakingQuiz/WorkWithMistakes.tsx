import {useNavigate, useParams} from "react-router-dom";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import api from "../../6_shared/api/axiosInstance.ts";
import {useEffect, useState} from "react";
import TakenQuestionOption from "../../6_shared/ui/TakenQuestionOption.tsx";
import type {ResultPageProp} from "../../5_entity/model/quiz/type.ts";

const WorkWithMistakes = () => {

    const { id } = useParams<{ id: string }>();
    const [result, setResult] = useState<ResultPageProp>();

    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/quiz/result/${id}`)
            .then((res) => {
                setResult(res.data);
            })
            .catch((err) => console.log(err, "from Result page!"));
    }, [id]);

    return (
        <>
            {result ?
        <div className={`flex min-h-screen`}>
            <div className={"flex-1 flex flex-col"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full items-center"}>

                    <div className={"md:bg-[#0f1236] p-4 mx-auto max-w-[800px] rounded-lg mt-[80px] justify-between"}>
                        <p className={"border flex border-gray-400 rounded-xl py-1 px-3 max-w-fit cursor-pointer hover:bg-[#0f1236]/100"} onClick={() => navigate(`/quiz/result/${id}`)}> {"<--"} </p>
                        <div>
                        </div>
                    </div>

                    <div className={"md:bg-[#0f1236] md:p-[60px] mx-auto max-w-[800px] rounded-lg mt-[15px]"}>
                        {result?.quiz.questions.map((question, index) => <div key={index}>
                            <div className={"flex justify-between"}>
                                <p className={"text-neutral-400"}>Question: {index+1}/5</p>
                            </div>

                            <div className={"mt-[41px]"}>
                                <TakenQuestionOption
                                    title={question.question}
                                    options={question.variants.map(v => v.option)}
                                    answers={question.answer}
                                    questionIndex={index}
                                    userAnswers={result.userAnswers[index]?.selectedOptions || []}
                                />
                            </div>
                        </div>)}
                    </div>

                </main>
            </div>
        </div> :
                <div> Loading... </div>
            }
        </>
    )
}

export default WorkWithMistakes;