import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import QuizFilter from "../../4_features/quiz-filter/ui/QuizFilter.tsx";

const HomePage = () => {

    return (
        <div className={`flex min-h-screen`}>
            <Sidebar />
            <div className={"flex-1 flex flex-col"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full"}>
                    <h1 className={"text-[36px] font-bold mb-[29px]"}> Discover Quizzes </h1>

                    <QuizFilter />


                </main>
            </div>
        </div>
    );
}

export default HomePage;