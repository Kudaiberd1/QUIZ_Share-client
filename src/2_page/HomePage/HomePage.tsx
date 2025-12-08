import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import QuizFilter from "../../4_features/quiz-filter/ui/QuizFilter.tsx";
import QuizList from "../../4_features/quiz/ui/QuizList.tsx";
import {useMessagesStore} from "../../4_features/message-card/model/store.ts";
import {useQuizStore} from "../../4_features/quiz/model/store.ts";
import {useEffect} from "react";
import api from "../../6_shared/api/axiosInstance.ts";

const HomePage = () => {

    const { setFeedbacks } = useMessagesStore();
    const { setQuiz } = useQuizStore();


    useEffect(() => {
        api.get("/user/inbox")
            .then((res) => {setFeedbacks(res.data)})
            .catch((err) => {
                console.error("Error loading dashboard data:", err);
            })

        api.get("/quiz")
            .then((res) => setQuiz(res.data))
            .catch((err) => console.log(err, "from fetching quizzes"));

    }, [])

    return (
        <div className={`flex min-h-screen`}>
            <Sidebar selected={0} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full mt-12"}>
                    <h1 className={"text-[36px] font-bold mb-[29px]"}> Discover Quizzes </h1>

                    <QuizFilter />

                    <QuizList />

                </main>
            </div>
        </div>
    );
}

export default HomePage;