import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import {useState, useEffect} from "react";
import QuestionAccordion from "./QuestionAccordion.tsx";
import type {QuestionProp, QuizProp} from "../../5_entity/model/quiz/type.ts";
import {
    addOption,
    deleteOption,
    deleteQuestion, toggleAnswer,
    updateQuestionField,
    updateVariant
} from "./lib/ChanginStateFunctions.ts";
import trash_icon from "../../6_shared/ui/icons/trash.svg"
import {useUserStore} from "../../4_features/auth/model/store.ts";
import api from "../../6_shared/api/axiosInstance.ts";
import {useNavigate} from "react-router-dom";
import {useQuizStore} from "../../4_features/quiz/model/store.ts";


const AddQuizPage = () => {
    const [value, setValue] = useState("public");
    const [show, setShow] = useState(0);
    const [questions, setQuestions] = useState<QuestionProp[]>([{question: "", variants: ["", ""], answer: [] }]);
    const [quiz, setQuiz] = useState<QuizProp>({title: "", description: "", difficulty: "EASY", subject: "", privacy: "PUBLIC", authorId: 0, question: []});
    const [choosen, setChoosen] = useState(0);
    const [image, setImage] = useState(null);
    const [sendImage, setSendImage] = useState(null);
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);

    const { setQuizzes } = useQuizStore();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file){
            setImage(URL.createObjectURL(file));
            setSendImage(file);
        }
    };

    const validateForm = () => {
        const newErrors: {[key: string]: string} = {};

        if (!quiz.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!quiz.difficulty) {
            newErrors.difficulty = "Difficulty is required";
        }

        if (!quiz.subject.trim()) {
            newErrors.subject = "Subject is required";
        }

        if (!quiz.privacy) {
            newErrors.privacy = "Privacy setting is required";
        }

        if (!questions.length) {
            newErrors.questions = "At least one question is required";
        } else {
            questions.forEach((q, index) => {
                if (!q.question.trim()) {
                    newErrors[`question_${index}`] = "Question text is required";
                }
                if (!q.variants.length) {
                    newErrors[`question_${index}_variants`] = "At least one option is required";
                } else {
                    q.variants.forEach((variant, vIndex) => {
                        if (!variant.trim()) {
                            newErrors[`question_${index}_variant_${vIndex}`] = "Option text is required";
                        }
                    });
                }

                if (!q.answer || q.answer.length === 0) {
                    newErrors[`question_${index}_answer`] = "At least one answer must be selected";
                }
            });

        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    useEffect(() => {
        const valid = validateForm();
        setIsValid(valid);
    }, [quiz, questions]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValid) {
            return;
        }

        const quizPayload = {
            ...quiz,
            authorId: user.id,
            question: questions
        };

        const formData = new FormData();

        if (sendImage) {
            formData.append("file", sendImage);
        }

        formData.append(
            "data",
            new Blob([JSON.stringify(quizPayload)], { type: "application/json" })
        );

        try {
            const res = await api.post("/quiz", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            setQuizzes(res.data);
            navigate("/");
        } catch (err) {
            console.log(err, "from quiz create");
        }
    };

    return(
        <div className={`flex min-h-screen`}>
            <Sidebar selected={1} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className="py-6 px-4 mt-15 md:py-[27px] md:px-12 my-3 h-full">
                    <h1 className={"text-[32px] md:text-[36px] mb-6 md:mb-[27px]"}> Create New Quiz </h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col md:flex-row md:space-x-5 space-y-6 md:space-y-0 mb-6 md:mb-[24px]">
                            {/* Quiz details */}
                            <div className="rounded-xl p-[24px] bg-[rgb(30,30,56)] max-h-[856px] w-full md:max-w-[360px]">
                                <h1 className="text-[22px] mb-4 md:mb-[16px]"> Quiz Details </h1>
                                <div className="w-full md:max-w-[300px]">
                                    <p className="text-[16px] mb-2 font-medium"> Quiz title </p>
                                    <input
                                        className="bg-[rgb(10,14,27)] p-2 mb-1 rounded-lg w-full md:max-w-[300px] border-1 border-gray-800"
                                        placeholder="Quiz title..."
                                        onChange={(e) => setQuiz({...quiz, title: e.target.value})}
                                    />
                                    {errors.title && <p className="text-red-500 text-sm mb-4 md:mb-[16px]">{errors.title}</p>}

                                    <p className="text-[16px] mb-2 font-medium"> Description </p>
                                    <textarea
                                        className="bg-[rgb(10,14,27)] p-2 mb-5 md:mb-[20px] rounded-lg w-full md:max-w-[300px] border-1 border-gray-800"
                                        placeholder="Description..."
                                        onChange={(e) => setQuiz({...quiz, description: e.target.value})}
                                    />

                                    <p className="text-[16px] mb-2 font-medium"> Difficulty </p>
                                    <div className="flex border-1 border-gray-800 rounded mb-1 md:mb-[4px]">
                                        <button type="button" className={`bg-[rgb(10,10,24)] rounded-l w-full px-auto py-1 ${choosen==0 && "bg-[rgb(32,35,54)] text-[rgb(128,191,249)]"}`} onClick={() => {setChoosen(0); setQuiz({...quiz, difficulty: "EASY"}) }}> Easy </button>
                                        <button type="button" className={`bg-[rgb(10,10,24)] w-full px-auto py-1 ${choosen==1 && "bg-[rgb(32,35,54)] text-[rgb(128,191,249)]"}`} onClick={() => {setChoosen(1); setQuiz({...quiz, difficulty: "MEDIUM"}) }}> Medium </button>
                                        <button type="button" className={`bg-[rgb(10,10,24)] rounded-r w-full px-auto py-1 ${choosen==2 && "bg-[rgb(32,35,54)] text-[rgb(128,191,249)]"}`} onClick={() => {setChoosen(2); setQuiz({...quiz, difficulty: "HARD"}) }}> Hard </button>
                                    </div>
                                    {errors.difficulty && <p className="text-red-500 text-sm mb-4 md:mb-[16px]">{errors.difficulty}</p>}

                                    <label className="text-[16px] font-medium">Quiz Image</label>
                                    <div
                                        className="mt-2 mb-2.5 w-full h-40 bg-[#15162C] border border-[#2A2D43] rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-[#1e2037] transition relative overflow-hidden"
                                    >
                                        {/* Image preview */}
                                        {image && (
                                            <img
                                                src={image}
                                                alt="Preview"
                                                className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                            />
                                        )}

                                        {!image && (
                                            <div className="flex flex-col items-center text-gray-400">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-10 w-10 mb-2 opacity-60"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M3 16l6-6 4 4 8-8M14 14l1 1"
                                                    />
                                                </svg>
                                                <p className="text-sm">Click to choose image</p>
                                                <p className="text-xs opacity-60">PNG, JPG (max 5MB)</p>
                                            </div>
                                        )}

                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                    </div>

                                    <p className="text-[16px] mb-2 font-medium"> Subject </p>
                                    <input
                                        className="bg-[rgb(10,14,27)] p-2 mb-1 rounded-lg w-full md:max-w-[300px] border-1 border-gray-800"
                                        placeholder="Subject..."
                                        onChange={(e) => setQuiz({...quiz, subject: e.target.value})}
                                    />
                                    {errors.subject && <p className="text-red-500 text-sm mb-4 md:mb-[16px]">{errors.subject}</p>}

                                    <p className="text-[16px] mb-2 w-full max-w-[300px] font-medium"> Visibility </p>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="public"
                                                checked={value === "public"}
                                                onChange={() => {setValue("public"); {
                                                    if (value == "public") {
                                                        setQuiz({...quiz, privacy: "PUBLIC"})
                                                    } else {
                                                        setQuiz({...quiz, privacy: "PRIVATE"})
                                                    }} }}
                                                className="h-4 w-4 accent-blue-500"
                                            />
                                            <span>Public</span>
                                        </label>

                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="visibility"
                                                value="private"
                                                checked={value === "private"}
                                                onChange={() => setValue("private")}
                                                className="h-4 w-4 accent-blue-500"
                                            />
                                            <span>Private</span>
                                        </label>
                                    </div>
                                    {errors.privacy && <p className="text-red-500 text-sm mb-4 md:mb-[16px]">{errors.privacy}</p>}
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="rounded-xl p-4 md:p-[24px] bg-[rgb(30,30,56)] w-full">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between mb-4 md:mb-[18px] gap-3 sm:gap-0">
                                    <h1 className="text-[22px]"> Questions </h1>
                                    <p className="border p-2 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px] cursor-pointer w-full sm:w-auto text-center" onClick={() => setQuestions([...questions, {question: "", variants: ["", ""], answer: [] }])}> Add new question </p>
                                </div>
                                {errors.questions && <p className="text-red-500 text-sm mb-2 md:mb-[8px]">{errors.questions}</p>}

                                {questions.map((question, index) =>
                                    <>
                                        <QuestionAccordion title={`Question ${index+1}: ${question.question}`} key={index} >
                                            <div className="mt-4 md:mt-[18px]">
                                                <p className="text-[16px] pb-4 md:pb-[16px]"> Question </p>
                                                <textarea className="bg-[rgb(10,14,27)] w-full mb-1 rounded-lg p-2" placeholder="Question description..." onChange={(e) => updateQuestionField(index, "question", e.target.value, setQuestions)} />
                                                {errors[`question_${index}`] && <p className="text-red-500 text-sm mb-3 md:mb-[12px]">{errors[`question_${index}`]}</p>}
                                                <p className="mb-4 md:mb-[18px]"> Options </p>
                                                {errors[`question_${index}_variants`] && <p className="text-red-500 text-sm mb-2 md:mb-[8px]">{errors[`question_${index}_variants`]}</p>}
                                                <div className="space-y-3">
                                                    {question.variants.map((option, oIndex) =>
                                                        <>
                                                            <div className="flex border-2 border-[rgb(36,40,63)] bg-[rgb(10,14,27)] p-1 pl-3 rounded-lg" key={oIndex} onMouseEnter={() => setShow(oIndex+1)} onMouseLeave={() => setShow(0)}>
                                                                <input type="checkbox" className="accent-white w-4 h-4 my-auto mr-3" onChange={() => toggleAnswer(index, oIndex, setQuestions)} />
                                                                <input className="p-2 rounded-lg bg-[rgb(10,14,27)] w-full" placeholder="Option..." onChange={(e) => updateVariant(index, oIndex, e.target.value, setQuestions)} />
                                                                <img src={trash_icon} className={`text-red-500 p-2 ${(show!=oIndex+1 || question.variants.length==2) && "hidden" } `} onClick={() => deleteOption(index, oIndex, setQuestions)} />
                                                            </div>
                                                            {errors[`question_${index}_variant_${oIndex}`] ? <p key={`error_${index}_${oIndex}`} className="text-red-500 text-sm mb-2 md:mb-[8px]">{errors[`question_${index}_variant_${oIndex}`]}</p> : null}
                                                        </>
                                                    )}

                                                    <div className="justify-end flex space-x-2">
                                                        <p className="p-2 border bg-red-500 border-red-500 rounded-lg mt-4 cursor-pointer w-full max-w-[160px] text-center" onClick={() => deleteQuestion({qIndex : index, setQuestions : setQuestions})}> Delete Question </p>
                                                        <p
                                                            className={`p-2 border bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-lg mt-4 cursor-pointer w-full max-w-[160px] text-center ${question.variants.length==8 ? "hidden": " "}`}
                                                            onClick={() => addOption({ qIndex: index, setQuestions })}
                                                        > + Add Option </p>
                                                    </div>

                                                </div>

                                            </div>
                                        </QuestionAccordion>
                                        {errors[`question_${index}_answer`] && (
                                            <p className="text-red-500 text-sm mb-2 md:mb-[8px]">{errors[`question_${index}_answer`]}</p>
                                        )}
                                    </>

                                )}
                            </div>
                        </div>

                        <div className="flex bg-[rgb(30,30,56)] w-full justify-end p-4 md:p-[24px] rounded-lg">
                            <button
                                className={`w-full md:w-auto border py-2 px-3 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px] ${!isValid && "bg-blue-900 cursor-no-drop"}`}
                                disabled={!isValid}
                                type="submit"
                            > Publish Quiz </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default AddQuizPage;