import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import {useState} from "react";
import QuestionAccordion from "./QuestionAccordion.tsx";
import type {QuestionProp} from "../../5_entity/model/quiz/type.ts";
import {
    addOption,
    deleteOption,
    deleteQuestion,
    updateQuestionField,
    updateVariant
} from "./lib/ChanginStateFunctions.ts";
import trash_icon from "../../6_shared/ui/icons/trash.svg"


const AddQuizPage = () => {
    const [value, setValue] = useState("public");
    const [show, setShow] = useState(0);
    const [questions, setQuestions] = useState<QuestionProp[]>([{question: "", variants: ["", ""], answer: [] }]);


    return(
        <div className={`flex min-h-screen`}>
            <Sidebar selected={1} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full"}>
                    <h1 className={"text-[36px] mb-[27px]"}> Create New Quiz </h1>

                    <div className={"md:flex space-x-5 mb-[24px]"}>
                        {/* Quiz details */}
                        <div className={"rounded-xl p-[24px] bg-[rgb(30,30,56)] max-h-[456px]"}>
                            <h1 className={"text-[22px] mb-[16px]"}> Quiz Details </h1>

                            <form className={"w-[300px]"}>
                                <p className={"text-[16px] mb-[8px]"}> Quiz title </p>
                                <input className={"bg-[rgb(10,14,27)] p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Quiz title..."} />

                                <p className={"text-[16px] mb-[8px]"}> Description </p>
                                <textarea className={"bg-[rgb(10,14,27)] p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Description..."} />

                                <p className={"text-[16px] mb-[8px]"}> Subject </p>
                                <input className={"bg-[rgb(10,14,27)] p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Subject..."} />

                                <p className={"text-[16px] mb-[8px] w-[300px]"}> Subject </p>
                                <div className="flex items-center gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="visibility"
                                            value="public"
                                            checked={value === "public"}
                                            onChange={() => setValue("public")}
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

                            </form>

                        </div>

                        {/* Questions */}
                        <div className={"rounded-xl p-[24px] bg-[rgb(30,30,56)] w-full"}>

                            {/* Header */}
                            <div className={"flex justify-between mb-[18px]"}>
                                <h1 className={"text-[22px]"}> Questions </h1>
                                <p className={"border p-2 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px] cursor-pointer"} onClick={() => setQuestions([...questions, {question: "", variants: ["", ""], answer: [] }])}> Add new question </p>
                            </div>

                            {questions.map((question, index) =>
                                <QuestionAccordion title={`Question ${index+1}: `} key={index} >
                                    <form className={"mt-[18px]"}>
                                        <p className={"text-[16px] pb-[16px]"}> Question </p>
                                        <textarea className={"bg-[rgb(10,14,27)] w-full mb-[18px] rounded-lg p-2"} placeholder={"Question description..."} onChange={(e) => updateQuestionField(index, "question", e.target.value, setQuestions)} />
                                        <p className={"mb-[18px]"}> Options </p>
                                        <div className={"space-y-3"}>
                                            {question.variants.map((option, oIndex) =>
                                                <div className={"flex border-2 border-[rgb(36,40,63)] bg-[rgb(10,14,27)] p-1 pl-3 rounded-lg"} key={oIndex} onMouseEnter={() => setShow(oIndex+1)} onMouseLeave={() => setShow(0)}>
                                                    <input type={"checkbox"} className={"accent-white w-[16px] h-[16px] my-auto mr-[12px]"} />
                                                    <input className={"p-2 rounded-lg bg-[rgb(10,14,27)] w-full"} placeholder={"Option..."} onChange={(e) => updateVariant(index, oIndex, e.target.value, setQuestions)} />
                                                    <img src={trash_icon} className={`text-red-500 p-2 ${(show!=oIndex+1 || question.variants.length==2) && "hidden" } `} onClick={() => deleteOption(index, oIndex, setQuestions)} />
                                                </div>
                                            )}

                                            <div className={"justify-end flex space-x-2"}>
                                                <p className={"p-2 border bg-red-500 border-red-500 rounded-lg mt-4 cursor-pointer"} onClick={() => deleteQuestion({qIndex : index, setQuestions : setQuestions})}> Delete Question </p>
                                                    <p
                                                        className={`p-2 border bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-lg mt-4 cursor-pointer  ${question.variants.length==8 ? "hidden": " "}`}
                                                        onClick={() => addOption({ qIndex: index, setQuestions })}
                                                    > + Add Option </p>
                                            </div>

                                        </div>

                                    </form>
                                </QuestionAccordion>
                            )}
                        </div>
                    </div>

                    <div className={"flex bg-[rgb(30,30,56)] w-full justify-end p-[24px] rounded-lg"}>
                            <button className={` border py-2 px-3 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px] ${questions.length==0 && "bg-blue-900 cursor-no-drop"}`} disabled={questions.length==0} > Publish Quiz </button>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default AddQuizPage;