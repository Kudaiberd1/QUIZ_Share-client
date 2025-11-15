import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import {useState} from "react";
import QuestionAccordion from "./QuestionAccordion.tsx";

const AddQuizPage = () => {
    const [value, setValue] = useState("public");

    const [options, setOptions] = useState([]);

    return(
        <div className={`flex min-h-screen`}>
            <Sidebar selected={1} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className={"py-[27px] px-[48px] my-3 h-full"}>
                    <h1 className={"text-[36px] mb-[27px]"}> Create New Quiz </h1>

                    <div className={"flex space-x-5 mb-[24px]"}>
                        {/* Quiz details */}
                        <div className={"rounded-xl p-[24px] bg-[rgb(30,30,56)] flex flex-col"}>
                            <h1 className={"text-[22px] mb-[16px]"}> Quiz Details </h1>

                            <form className={"w-[300px]"}>
                                <p className={"text-[16px] mb-[8px]"}> Quiz title </p>
                                <input className={"bg-black p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Quiz title..."} />

                                <p className={"text-[16px] mb-[8px]"}> Description </p>
                                <textarea className={"bg-black p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Description..."} />

                                <p className={"text-[16px] mb-[8px]"}> Subject </p>
                                <input className={"bg-black p-2 mb-[20px] rounded-lg w-[300px]"} placeholder={"Subject..."} />

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
                                <p className={"border p-2 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px]"}> Add new question </p>
                            </div>

                            <QuestionAccordion title="Question 1: ">
                                <form className={"mt-[18px]"}>
                                    <p className={"text-[16px] pb-[16px]"}> Question </p>
                                    <textarea className={"bg-black w-full mb-[18px] rounded-lg p-2"} placeholder={"Question description..."} />
                                    <p className={"mb-[18px]"}> Options </p>
                                    <div className={"space-y-3"}>
                                        <div className={"flex"}>
                                            <input type={"checkbox"} className={"accent-white w-[16px] h-[16px] my-auto mr-[12px]"} />
                                            <input className={"p-2 rounded-lg bg-black w-full"} placeholder={"Option..."} />
                                        </div>

                                        <div className={"flex"}>
                                            <input type={"checkbox"} className={"accent-white w-[16px] h-[16px] my-auto mr-[12px]"} />
                                            <input className={"p-2 rounded-lg bg-black w-full"} placeholder={"Option..."} />
                                        </div>

                                        <div className={"justify-end flex"}>
                                            <p className={"flex w-[115px]  p-2 border bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-lg mt-4 cursor-pointer"} onClick={() => {
                                                setOptions([...options, [1] ]);
                                            }}> + Add Option </p>
                                        </div>

                                    </div>

                                </form>
                            </QuestionAccordion>
                        </div>
                    </div>

                    <div className={"flex bg-[rgb(30,30,56)] w-full justify-end p-[24px] rounded-lg"}>
                            <p className={" border py-2 px-3 bg-[rgb(41,69,214)] border-[rgb(41,69,214)] rounded-xl text-[16px]"}> Publish Quiz </p>
                    </div>

                </main>
            </div>
        </div>
    )
}

export default AddQuizPage;