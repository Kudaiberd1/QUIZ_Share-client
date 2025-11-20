import {Routes, Route} from "react-router-dom";
import HomePage from "../../2_page/HomePage/HomePage.tsx";
import Register from "../../2_page/Authorization/Register.tsx";
import Login from "../../2_page/Authorization/Login.tsx";
import ProtectedRoute from "../../6_shared/lib/ProtectedRoute.tsx";
import {ToastContainer} from "react-toastify";
import AddQuizPage from "../../2_page/AddQuiz/AddQuizPage.tsx";
import QuizPage from "../../2_page/QuizPage/QuizPage.tsx";

const AppRoute = () => {
    return(
        <>
            <ToastContainer />
            <Routes>
                <Route element={<ProtectedRoute/>}>
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"/add"} element={<AddQuizPage />}/>
                    <Route path={"/quiz/:id"} element={<QuizPage />} />
                </Route>
                <Route path={"/register"} element={<Register />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </>

    )
}

export default AppRoute;