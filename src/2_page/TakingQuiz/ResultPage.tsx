import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import type { Feedback, Result } from "../../5_entity/model/quiz/type.ts";
import api from "../../6_shared/api/axiosInstance.ts";
import { useNavigate, useParams } from "react-router-dom";

const ResultPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [result, setResult] = useState<Result>();
    const [userFeedback, setUserFeedback] = useState<Feedback>();

    const [authorId, setAuthorId] = useState<number>();
    const [quizId, setQuizId] = useState<number>();
    const [percentage, setPercentage] = useState(0);

    useEffect(() => {
        if(result) {
            setPercentage((result?.correct / (result?.correct + result?.wrong + result?.skipped)) * 100);
        }
    },[])


    const getFeedback = async (authorId: number, quizId: number) => {
        setAuthorId(authorId);
        setQuizId(quizId);
        try {
            const res = await api.get("/quiz/feedback", {
                params: {
                    quizId: quizId,
                    authorId: authorId
                }
            });
            setUserFeedback(res.data);
        } catch (err) {
            console.log(quizId);
            console.log(err, "from feedback!");
        }
    }

    const handleSubmit = () => {
        console.log(feedback, rating, authorId, quizId);
        api.post("/quiz/feedback", {
            feedback: feedback,
            star: rating,
            authorId: authorId,
            quizId: quizId
        }).then((res) => setUserFeedback(res.data))
            .catch((err) => console.log(err, "from feedback post"));
    }

    useEffect(() => {
        api.get(`/quiz/result/${id}`)
            .then((res) => {
                setResult(res.data);
                getFeedback(res.data.authorId, res.data.quiz.id);
            })
            .catch((err) => console.log(err, "from Result page!"));
    }, [id]);


    return (
        <>
            {result !== undefined ?
                <div className={`flex min-h-screen`}>
                    <Sidebar selected={0} />
                    <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                        <Navbar />
                        <main className={"py-[27px] px-[48px] my-3 h-full mt-12"}>
                            <h1 className={"text-[36px] font-bold"}> Quiz Result </h1>

                            <div className={"h-screen w-full flex mt-[37px]"}>
                                <div className={"grid grid-cols-10 grid-row-3 gap-4 w-full"}>
                                    <div className={"col-span-7 row-span-1 bg-[rgb(30,30,57)] rounded-xl w-full p-[24px]"}>
                                        <h1 className={"text-[24px] font-semibold"}> Results for '{result.quiz.title}' </h1>
                                        <p className={"pt-[5px] font-bold"}><span
                                            className={"text-[60px] text-blue-700"}> {percentage}% </span> score </p>
                                        <p className={"text-[18px] text-neutral-400 pt-[12px]"}> You
                                            answered {result?.correct} out
                                            of {result.correct + result.wrong + result.skipped} questions correctly. </p>
                                        <div className="w-full h-3 bg-blue-200 rounded-xl overflow-hidden mt-[14px]">
                                            <div
                                                className="h-full bg-blue-600"
                                                style={{ width: `${percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                    <div className={"col-span-3 row-span-2 bg-[rgb(30,30,57)] rounded-xl w-full p-[24px]"}>
                                        <h1 className={"text-[20px]"}> Leave Your Feedback </h1>
                                        <p className={"text-[14px] text-neutral-400"}> Help us improve by rating this quiz. </p>
                                        <p className={"text-[14px] pt-[16px] font-bold"}> Your Rating </p>
                                        {userFeedback?.id ?
                                            (<>
                                                <div className="flex mt-[8px]">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={25}
                                                            className="cursor-pointer mr-[7px]"
                                                            color={star <= (userFeedback.star) ? "#3A5BFF" : "#E4E5E9"}
                                                        />
                                                    ))}
                                                </div>
                                                <div className={"mt-[16px]"}>
                                                    <p className={"text-[14px]"}> Comments (Anonymous) </p>
                                                    <textarea
                                                        className={"mt-2 h-[114px] border border-[rgb(47,51,66)] bg-[rgb(32,32,69)] rounded-xl w-full p-2"}
                                                        placeholder={"Write your feedback..."}
                                                        value={userFeedback.feedback}
                                                        disabled={true}
                                                    />
                                                </div>
                                            </>) :
                                            (<>
                                                <div className="flex mt-[8px]">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <FaStar
                                                            key={star}
                                                            size={25}
                                                            className="cursor-pointer mr-[7px]"
                                                            color={star <= (hover || rating) ? "#3A5BFF" : "#E4E5E9"}
                                                            onClick={() => setRating(star)}
                                                            onMouseEnter={() => setHover(star)}
                                                            onMouseLeave={() => setHover(0)}
                                                        />
                                                    ))}
                                                </div>
                                                <div className={"mt-[16px]"}>
                                                    <p className={"text-[14px]"}> Comments (Anonymous) </p>
                                                    <textarea
                                                        className={"mt-2 h-[114px] border border-[rgb(47,51,66)] bg-[rgb(32,32,69)] rounded-xl w-full p-2"}
                                                        placeholder={"Write your feedback..."}
                                                        onChange={(e) => setFeedback(e.target.value)} />
                                                </div>
                                                <button
                                                    className={`mt-[16px] rounded-xl w-full bg-blue-700 py-3 disabled:bg-blue-500 disabled:text-neutral-300 disabled:cursor-not-allowed`}
                                                    disabled={rating === 0 || feedback === ""} onClick={handleSubmit}> Submit Feedback
                                                </button>
                                            </>)
                                        }


                                    </div>
                                    <div
                                        className={"col-span-7 row-span-2 bg-[rgb(30,30,57)] rounded-xl text-4xl w-full p-[24px]"}>
                                        <h1 className={"text-[20px] "}> Your Performance Breakdown </h1>
                                        <div className={"flex justify-around mt-[11px]"}>
                                            <p className={"text-[36px] text-green-500 font-bold"}> {result.correct} </p>
                                            <p className={"text-[36px] text-red-500 font-bold"}> {result.wrong} </p>
                                            <p className={"text-[36px] text-yellow-500 font-bold"}> {result.skipped} </p>
                                        </div>
                                        <div className={"flex justify-around mt-[11px]"}>
                                            <p className={"text-neutral-400 text-[14px]"}> Correct </p>
                                            <p className={"text-neutral-400 text-[14px]"}> Incorrect </p>
                                            <p className={"text-neutral-400 text-[14px]"}> Skipped </p>
                                        </div>
                                        <div className={"flex flex-wrap gap-[10px] mt-[24px]"}>
                                            {result.statuses.map((item, index) => (
                                                <div
                                                    key={index + 1}
                                                    className={`w-[45px] h-[45px] text-[14px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer hover:scale-110 hover:shadow-lg text-black 
                                              ${item === "WRONG" ? "bg-red-500" : item === "CORRECT" ? "bg-green-500" : "bg-yellow-500"}
                                            `}
                                                        onClick={() => navigate(`/quiz/result/${id}/questions`)}
                                                >
                                                    {index + 1}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={"col-span-3 row-span-1 bg-[rgb(30,30,57)] rounded-xl w-full p-[24px]"}>
                                        <h1 className={"text-[20px] "}> What's Next? </h1>
                                        <button className={`my-[16px] rounded-xl w-full bg-blue-700 py-3 `} onClick={() => navigate("/")}> Back to Home</button>
                                        <button className={`mb-[16px] rounded-xl w-full bg-blue-700 py-3 `} onClick={() => navigate(`/quiz/${quizId}/taking`)}> Retake </button>
                                        <button className={`rounded-xl w-full bg-blue-700 py-3 `} onClick={() => navigate("/dashboard")}> View Dashboard</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div> : <div> Loading... </div>
            }
        </>
    )
}

export default ResultPage;