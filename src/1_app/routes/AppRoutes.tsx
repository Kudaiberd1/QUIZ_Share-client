import {Routes, Route} from "react-router-dom";
import HomePage from "../../2_page/HomePage/HomePage.tsx";

const AppRoute = () => {
    return(
        <Routes>
            <Route path={"/"} element={<HomePage />} />
        </Routes>
    )
}

export default AppRoute;