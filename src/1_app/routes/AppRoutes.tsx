import {Routes, Route} from "react-router-dom";
import HomePage from "../../2_page/HomePage/HomePage.tsx";
import Register from "../../2_page/Authorization/Register.tsx";
import Login from "../../2_page/Authorization/Login.tsx";
import ProtectedRoute from "../../6_shared/lib/ProtectedRoute.tsx";
import {ToastContainer} from "react-toastify";
import AddQuizPage from "../../2_page/AddQuiz/AddQuizPage.tsx";
import QuizPage from "../../2_page/QuizPage/QuizPage.tsx";
import LogOut from "../../2_page/LogOut.tsx";
import TakingQuizPage from "../../2_page/TakingQuiz/TakingQuizPage.tsx";
import ResultPage from "../../2_page/TakingQuiz/ResultPage.tsx";
import DashboardPage from "../../2_page/Dashboard/DashboardPage.tsx";
import InboxPage from "../../2_page/InboxPage/InboxPage.tsx";
import LoginCallBack from "../../2_page/Authorization/LoginCallBack.tsx";
import WorkWithMistakes from "../../2_page/TakingQuiz/WorkWithMistakes.tsx";

const AppRoute = () => {
    return(
        <>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"/add"} element={<AddQuizPage />}/>
                    <Route path={"/quiz/:id"} element={<QuizPage />} />
                    <Route path={"/quiz/:id/taking"} element={<TakingQuizPage />} />
                    <Route path={"/quiz/result/:id"} element={<ResultPage />} />
                    <Route path={"/dashboard"} element={<DashboardPage />} />
                    <Route path={"/messages"} element={<InboxPage />} />
                    <Route path={"/quiz/result/:id/questions"} element={<WorkWithMistakes />} />
                </Route>
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
                <Route path={"/oauth"} element={<LoginCallBack />} />
                <Route path={"/logout"} element={<LogOut />} />
            </Routes>
        </>

    )
}

export default AppRoute;