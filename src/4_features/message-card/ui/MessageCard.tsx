import {useUserStore} from "../../auth/model/store.ts";
import {useQuizStore} from "../../quiz/model/store.ts";
import {FaStar} from "react-icons/fa";
import FilterMessage from "../lib/filterMessage.ts";
import api from "../../../6_shared/api/axiosInstance.ts";

const MessageCard = () => {

    const feedbacks = FilterMessage();
    const user = useUserStore((state) => state.user);
    const quizList = useQuizStore((s) => s.quiz);

    const getQuizById = (id: number) => {
        return quizList?.find((q) => q.id === id);
    };

    const markAsRead = (id: number) => {
        api.post(`/user/inbox/${id}`);
    }

    return (
        <>
            {feedbacks?.map((feedback) => (
                <div className={"bg-gray-700/30 p-[22px] rounded-lg w-full hover:bg-gray-700/50"} key={feedback.id} onMouseEnter={() => markAsRead(feedback.id)}>

                    <div className={"flex justify-between mb-[13px]"}>
                        <div>
                            <h3 className={"text-[18px]"}> {user?.firstName} {user?.lastName} </h3>
                            <p className={"text-neutral-400 text-[14px]"}> {getQuizById(feedback.quizId)?.title} </p>
                        </div>
                        <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <FaStar
                                    key={star}
                                    className={`w-[16px] h-[16px] ${star <= feedback.star
                                        ? "text-blue-500"
                                        : "text-gray-600"
                                    }`}
                                />
                            ))}
                            <span className={"pl-3 text-[16px]"} >{feedback.star.toFixed(1)}</span>
                        </div>
                    </div>

                    <p className={"text-[18px]"}> {feedback.feedback} </p>

                    <div className={"flex justify-end"}>
                        <p className={"text-neutral-400 text-[14px]"}> 2 hours ago </p>
                    </div>
                </div>
            ))}
        </>
    )
}

export default MessageCard;