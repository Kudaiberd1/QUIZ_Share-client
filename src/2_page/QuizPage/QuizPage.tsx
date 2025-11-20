import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import default_image from "../../assets/default-quiz-image.png"
import {FaStar, FaStarHalfAlt} from 'react-icons/fa';
import RatingStats from "../../6_shared/ui/RatingStats.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../6_shared/api/axiosInstance.ts";
import type {QuizResponse} from "../../5_entity/model/quiz/type.ts";

const QuizPage = () => {

    const { id } = useParams<{ id: string }>();

    const [quiz, setQuiz] = useState<QuizResponse>();

    const [average, setAverage] = useState<number>(0);

    useEffect(() => {
        api.get(`/quiz/${id}`).then((res) => {
            setQuiz(res.data);
            const avg = res.data.rate.reduce((acc, num, i) => (acc*i) + num, 0)
                / res.data.rate.reduce((acc, num) => acc + num, 0);
            setAverage(avg);
        });
    }, [id]);


    return (
        <div className={`flex min-h-screen`}>
            <Sidebar selected={0} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full mt-12"}>
                    <h1 className={"text-[36px] font-bold mb-[29px]"}> Quiz page </h1>


                    <div className={"bg-[#0f1236] w-full rounded-lg p-[21px]"}>
                        <h1 className={"text-[30px]"}> {quiz?.title} </h1>
                        <div className={"md:flex justify-between"}>
                            {/* Quiz detail */}
                            <div className={"max-w-[683px]"}>
                                <p className={"text-gray-400 text-[16px] mb-2"}> {quiz?.description} </p>
                                <p> Subject: Scince Questions: {quiz?.questions.length} {quiz?.takeTimeLimit && `Time: ${quiz?.takeTimeLimit} seconds`}  </p>
                                <div className={"flex gap-[6px] my-2"} style={{ alignItems: "center"}}>
                                    <div className={"flex gap-[4px]"}>
                                        <FaStar color={average>0 ? "#3A5BFF" : ""} size={20} />
                                        <FaStar color={average>1 ? "#3A5BFF" : ""} size={20} />
                                        <FaStar color={average>2 ? "#3A5BFF" : ""} size={20} />
                                        <FaStar color={average>3 ? "#3A5BFF" : ""} size={20} />
                                        <FaStar color={average>4 ? "#3A5BFF" : ""} size={20} />
                                    </div>
                                    <span className={"text-[#D0D0D0] text-[16px]"}>
                                        {average} ({quiz?.rate.reduce((acc, num) => acc + num, 0)} ratings)
                                      </span>
                                </div>
                                <button className={"mt-3 px-[32px] py-1 bg-[rgb(42,69,215)] text-[18px] rounded-lg"}> Start Quiz </button>
                            </div>
                            {/* Quiz image */}
                            <div className={"object-cover"}>
                                <img className={"rounded-lg max-w-[380px] object-cover"} src={quiz?.imageUrl || default_image} />
                            </div>
                        </div>
                    </div>

                    <h1 className={"text-[24px] mt-[24px]"}> Student Feedback </h1>

                    <div className={"mt-[45px] max-w-[693px] w-full rounded-lg py-auto pb-[54px]"}>
                        {quiz && <RatingStats ratings={quiz.rate} totalRatings={quiz.rate.reduce((acc, num) => acc + num, 0)} />}
                    </div>

                </main>
            </div>
        </div>
    )
}

export default QuizPage;
