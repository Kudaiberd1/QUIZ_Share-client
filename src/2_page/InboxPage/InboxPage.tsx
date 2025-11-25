import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import MessageTabs from "../../4_features/message-tabs/ui/MessageTabs.tsx";
import {useEffect, useState} from "react";
import api from "../../6_shared/api/axiosInstance.ts";
import MessageCard from "../../4_features/message-card/ui/MessageCard.tsx";
import {useMessagesStore} from "../../4_features/message-card/model/store.ts";
import {useQuizStore} from "../../4_features/quiz/model/store.ts";

const InboxPage = () => {

    const [error, setError] = useState<string | undefined>();

    const { setFeedbacks } = useMessagesStore();
    const { setQuiz } = useQuizStore();


    useEffect(() => {
        api.get("/user/inbox")
            .then((res) => {setFeedbacks(res.data)})
            .catch((err) => {
                console.error("Error loading dashboard data:", err);
                setError("Failed to load data. Please try again later.");
            })

        api.get("/quiz")
            .then((res) => setQuiz(res.data))
            .catch((err) => console.log(err, "from fetching quizzes"));

    }, [])

    return (
        <div className="flex min-h-screen">
            <Sidebar selected={3} />
            <div className="flex-1 flex flex-col md:ms-[304px]">
                <Navbar />
                <main className="py-8 px-6 md:px-12 my-3 h-full mt-12">
                    <h1 className={"text-4xl mb-[35px]"}> Feedback Inbox </h1>

                    <MessageTabs />

                    <div className={"mt-[26px] space-y-[16px]"}>
                        {error ? (
                                <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                                    <p className="text-red-400 text-lg">{error}</p>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                    >
                                        Retry
                                    </button>
                                </div>
                            )
                            :
                            (<MessageCard />)
                        }

                    </div>

                </main>
            </div>
        </div>
    )
}

export default InboxPage;