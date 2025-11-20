import {Search} from "lucide-react";
import {useEffect, useState} from "react";
import api from "../../../6_shared/api/axiosInstance.ts";
import {useQuizStore} from "../../quiz/model/store.ts";

const QuizFilter = () => {

    const [findByTitle, setFindByTitle] = useState<string | undefined>();
    const [sortBy, setSortBy] = useState("LATEST");
    const [filterBySubject, setFilterBySubject] = useState<string | undefined>("");
    const [subjects, setSubjects] = useState<string[]>();
    const { updateQuizzes } = useQuizStore();

    useEffect(() => {
        api.get("/quiz/subjects")
            .then((res) => setSubjects(res.data))
            .catch((err) => console.log(err));
    },[])

    useEffect(() => {
        api.get(`/quiz/filter?${filterBySubject && `subject=${filterBySubject}`}&${sortBy && `filter=${sortBy}`}&${findByTitle && `text=${findByTitle}`}`).then((res) => updateQuizzes(res.data)).catch((err) => console.log(err, "from filtering"));
    },[filterBySubject, sortBy, findByTitle])


    return(
        <div className={"mb-[32px]"}>
            {/* Input */}
            <div className="flex mb-[32px] bg-[#1b1b3a] border border-[#2a2a4a] rounded-xl px-4 py-2 w-full max-w-full mx-auto shadow-sm focus-within:border-[#4c4cff] transition">
                <Search className="text-gray-400 mr-2 w-5 h-5" />
                <input
                    onChange={(e) => {setFindByTitle(e.target.value)}}
                    type="text"
                    placeholder="Search for quizzes by title."
                    className="bg-transparent text-gray-200 placeholder-gray-400 w-full focus:outline-none"
                />
            </div>

            {/* Filtering */}

            <div className={"flex justify-between"}>
                <div className={"flex space-x-[9px]"}>
                    <p className={"text-[18px] text-center my-auto"}> Categories: </p>
                    <select
                            value={filterBySubject}
                            onChange={(e) => setFilterBySubject(e.target.value)}
                            className={"border border-[rgb(27,42,138)] rounded-lg p-2 bg-[rgb(23,22,52)] cursor-pointer"}
                    >
                        <option value={""}> All </option>
                        {subjects?.map((subject, index) =>
                            <option key={index} value={subject}> {subject} </option>
                        )}
                    </select>
                </div>

                <div className="flex items-center space-x-2 border-[rgb(27,42,138)] border-1 rounded-lg p-2 bg-[rgb(23,22,52)]">
                    <label htmlFor="sort" className="text-gray-300">
                        Sort by:
                    </label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
                    >
                        <option value="LATEST"> Latest </option>
                        <option value="OLD"> Oldest </option>
                        <option value="RATE"> Most Popular </option>
                    </select>
                </div>
            </div>

        </div>
    )
}

export default QuizFilter;