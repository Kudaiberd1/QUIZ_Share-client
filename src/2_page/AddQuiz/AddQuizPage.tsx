import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import { useState, useEffect } from "react";
import QuestionAccordion from "./QuestionAccordion.tsx";
import type { QuestionProp, QuizProp } from "../../5_entity/model/quiz/type.ts";
import {
    addOption,
    deleteOption,
    deleteQuestion, toggleAnswer,
    updateQuestionField,
    updateVariant
} from "./lib/ChanginStateFunctions.ts";
import trash_icon from "../../6_shared/ui/icons/trash.svg"
import { useUserStore } from "../../4_features/auth/model/store.ts";
import api from "../../6_shared/api/axiosInstance.ts";
import { useNavigate } from "react-router-dom";
import { useQuizStore } from "../../4_features/quiz/model/store.ts";


const AddQuizPage = () => {
    const [value, setValue] = useState("public");
    const [show, setShow] = useState(0);
    const [questions, setQuestions] = useState<QuestionProp[]>([{ question: "", variants: ["", ""], answer: [] }]);
    const [quiz, setQuiz] = useState<QuizProp>({ title: "", description: "", difficulty: "EASY", subject: "", privacy: "PUBLIC", authorId: 0, questions: [], takeTimeLimit: 300 });
    const [choosen, setChoosen] = useState(0);
    const [image, setImage] = useState<string | null>(null);
    const [sendImage, setSendImage] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showErrors, setShowErrors] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const user = useUserStore(state => state.user);

    const { setQuizzes } = useQuizStore();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            setSendImage(file);
        }
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

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

        if (!quiz.takeTimeLimit || quiz.takeTimeLimit <= 0) {
            newErrors.takeTimeLimit = "Time limit must be greater than 0";
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

    const getError = (key: string) => (showErrors ? errors[key] : undefined);

    useEffect(() => {
        const valid = validateForm();
        setIsValid(valid);
    }, [quiz, questions]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setShowErrors(true);
        const formIsValid = validateForm();

        if (!formIsValid || !user) {
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

    return (
        <div className={`flex min-h-screen`}>
            <Sidebar selected={1} />
            <div className={"flex-1 flex flex-col md:ms-[304px]"}>
                <Navbar />
                <main className="py-6 px-4 mt-15 md:py-8 md:px-12 my-3 h-full">
                    <h1 className="text-3xl md:text-4xl mb-8 font-bold text-white">Create New Quiz</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col lg:flex-row lg:space-x-6 space-y-6 lg:space-y-0 mb-8">
                            {/* Quiz details */}
                            <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-[rgb(30,30,56)] to-[rgb(25,25,48)] shadow-2xl w-full lg:max-w-[400px] lg:sticky lg:top-6 lg:h-fit">
                                <h2 className="text-2xl mb-6 font-semibold text-white">Quiz Details</h2>
                                <div className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Title</label>
                                        <input
                                            className="bg-[rgb(10,14,27)] p-3 rounded-xl w-full border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white placeholder-gray-500"
                                            placeholder="Enter quiz title..."
                                            value={quiz.title}
                                            onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                                        />
                                        {getError("title") && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <span>⚠</span> {getError("title")}
                                        </p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                        <textarea
                                            className="bg-[rgb(10,14,27)] p-3 rounded-xl w-full border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white placeholder-gray-500 resize-none min-h-[100px]"
                                            placeholder="Describe your quiz..."
                                            value={quiz.description}
                                            onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
                                        <div className="flex gap-2 rounded-xl overflow-hidden border border-gray-700">
                                            <button
                                                type="button"
                                                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${choosen === 0
                                                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg"
                                                    : "bg-[rgb(10,10,24)] text-gray-400 hover:text-white"
                                                    }`}
                                                onClick={() => { setChoosen(0); setQuiz({ ...quiz, difficulty: "EASY" }) }}
                                            >
                                                Easy
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${choosen === 1
                                                    ? "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg"
                                                    : "bg-[rgb(10,10,24)] text-gray-400 hover:text-white"
                                                    }`}
                                                onClick={() => { setChoosen(1); setQuiz({ ...quiz, difficulty: "MEDIUM" }) }}
                                            >
                                                Medium
                                            </button>
                                            <button
                                                type="button"
                                                className={`flex-1 px-4 py-2.5 text-sm font-medium transition-all ${choosen === 2
                                                    ? "bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
                                                    : "bg-[rgb(10,10,24)] text-gray-400 hover:text-white"
                                                    }`}
                                                onClick={() => { setChoosen(2); setQuiz({ ...quiz, difficulty: "HARD" }) }}
                                            >
                                                Hard
                                            </button>
                                        </div>
                                        {getError("difficulty") && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <span>⚠</span> {getError("difficulty")}
                                        </p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Time Limit (seconds)</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                min="1"
                                                step="1"
                                                className="bg-[rgb(10,14,27)] p-3 rounded-xl w-full border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white placeholder-gray-500 pr-12"
                                                placeholder="300"
                                                value={quiz.takeTimeLimit || ""}
                                                onChange={(e) => setQuiz({ ...quiz, takeTimeLimit: parseInt(e.target.value) || 0 })}
                                            />
                                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">sec</span>
                                        </div>
                                        {quiz.takeTimeLimit && (
                                            <p className="text-xs text-gray-400 mt-1.5">
                                                {Math.floor(quiz.takeTimeLimit / 60)} min {quiz.takeTimeLimit % 60} sec
                                            </p>
                                        )}
                                        {getError("takeTimeLimit") && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <span>⚠</span> {getError("takeTimeLimit")}
                                        </p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Quiz Image</label>
                                        <div
                                            className="w-full h-48 bg-gradient-to-br from-[#15162C] to-[#0f1120] border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 hover:bg-[#1e2037] transition-all relative overflow-hidden group"
                                        >
                                            {/* Image preview */}
                                            {image && (
                                                <>
                                                    <img
                                                        src={image}
                                                        alt="Preview"
                                                        className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                                    />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <span className="text-white text-sm font-medium">Change Image</span>
                                                    </div>
                                                </>
                                            )}

                                            {!image && (
                                                <div className="flex flex-col items-center text-gray-400">
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-12 w-12 mb-3 opacity-60 group-hover:opacity-100 transition-opacity"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <p className="text-sm font-medium">Click to upload image</p>
                                                    <p className="text-xs opacity-60 mt-1">PNG, JPG (max 5MB)</p>
                                                </div>
                                            )}

                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageUpload}
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                                        <input
                                            className="bg-[rgb(10,14,27)] p-3 rounded-xl w-full border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white placeholder-gray-500"
                                            placeholder="e.g., Mathematics, Science..."
                                            value={quiz.subject}
                                            onChange={(e) => setQuiz({ ...quiz, subject: e.target.value })}
                                        />
                                        {getError("subject") && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <span>⚠</span> {getError("subject")}
                                        </p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-3">Visibility</label>
                                        <div className="flex gap-4">
                                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="visibility"
                                                    value="public"
                                                    checked={value === "public"}
                                                    onChange={() => {
                                                        setValue("public");
                                                        setQuiz({ ...quiz, privacy: "PUBLIC" });
                                                    }}
                                                    className="h-4 w-4 accent-blue-500 cursor-pointer"
                                                />
                                                <span className="text-gray-300 group-hover:text-white transition-colors">Public</span>
                                            </label>

                                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                                <input
                                                    type="radio"
                                                    name="visibility"
                                                    value="private"
                                                    checked={value === "private"}
                                                    onChange={() => {
                                                        setValue("private");
                                                        setQuiz({ ...quiz, privacy: "PRIVATE" });
                                                    }}
                                                    className="h-4 w-4 accent-blue-500 cursor-pointer"
                                                />
                                                <span className="text-gray-300 group-hover:text-white transition-colors">Private</span>
                                            </label>
                                        </div>
                                        {getError("privacy") && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                            <span>⚠</span> {getError("privacy")}
                                        </p>}
                                    </div>
                                </div>
                            </div>

                            {/* Questions */}
                            <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-[rgb(30,30,56)] to-[rgb(25,25,48)] shadow-2xl w-full flex-1">
                                {/* Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                    <div>
                                        <h2 className="text-2xl font-semibold text-white mb-1">Questions</h2>
                                        <p className="text-sm text-gray-400">Add and manage quiz questions</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 w-full sm:w-auto justify-center"
                                        onClick={() => setQuestions([...questions, { question: "", variants: ["", ""], answer: [] }])}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                        Add New Question
                                    </button>
                                </div>
                                {getError("questions") && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                                    <p className="text-red-400 text-sm flex items-center gap-2">
                                        <span>⚠</span> {getError("questions")}
                                    </p>
                                </div>}

                                <div className="space-y-4">
                                    {questions.map((question, index) => {
                                        const questionError = getError(`question_${index}`);
                                        const variantsError = getError(`question_${index}_variants`);
                                        const answerError = getError(`question_${index}_answer`);

                                        return (
                                            <div key={index}>
                                                <QuestionAccordion title={`Question ${index + 1}${question.question ? `: ${question.question.substring(0, 50)}${question.question.length > 50 ? '...' : ''}` : ''}`}>
                                                    <div className="mt-6 space-y-5">
                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-2">Question Text</label>
                                                            <textarea
                                                                className="bg-[rgb(10,14,27)] w-full rounded-xl p-3 border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-white placeholder-gray-500 resize-none min-h-[100px]"
                                                                placeholder="Enter your question here..."
                                                                value={question.question}
                                                                onChange={(e) => updateQuestionField(index, "question", e.target.value, setQuestions)}
                                                            />
                                                            {questionError && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
                                                                <span>⚠</span> {questionError}
                                                            </p>}
                                                        </div>

                                                        <div>
                                                            <label className="block text-sm font-medium text-gray-300 mb-3">Answer Options</label>
                                                            {variantsError && <div className="mb-3 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                                                                <p className="text-red-400 text-xs flex items-center gap-1">
                                                                    <span>⚠</span> {variantsError}
                                                                </p>
                                                            </div>}
                                                            <div className="space-y-3">
                                                                {question.variants.map((option, oIndex) =>
                                                                    <div key={oIndex} className="group">
                                                                        <div
                                                                            className="flex items-center gap-3 border-2 border-gray-700 bg-[rgb(10,14,27)] rounded-xl p-3 hover:border-blue-500/50 transition-all"
                                                                            onMouseEnter={() => setShow(oIndex + 1)}
                                                                            onMouseLeave={() => setShow(0)}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                className="w-5 h-5 accent-blue-500 cursor-pointer flex-shrink-0"
                                                                                checked={question.answer.includes(oIndex)}
                                                                                onChange={() => toggleAnswer(index, oIndex, setQuestions)}
                                                                            />
                                                                            <input
                                                                                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none"
                                                                                placeholder={`Option ${oIndex + 1}...`}
                                                                                value={option}
                                                                                onChange={(e) => updateVariant(index, oIndex, e.target.value, setQuestions)}
                                                                            />
                                                                            {question.variants.length > 2 && (
                                                                                <button
                                                                                    type="button"
                                                                                    className={`opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-500/20 rounded-lg ${(show !== oIndex + 1) && "hidden"}`}
                                                                                    onClick={() => deleteOption(index, oIndex, setQuestions)}
                                                                                >
                                                                                    <img src={trash_icon} alt="Delete" className="w-5 h-5" />
                                                                                </button>
                                                                            )}
                                                                        </div>
                                                                        {getError(`question_${index}_variant_${oIndex}`) && (
                                                                            <p className="text-red-400 text-xs mt-1.5 ml-8 flex items-center gap-1">
                                                                                <span>⚠</span> {getError(`question_${index}_variant_${oIndex}`)}
                                                                            </p>
                                                                        )}
                                                                    </div>
                                                                )}

                                                                {question.variants.length < 8 && (
                                                                    <button
                                                                        type="button"
                                                                        className="w-full py-2.5 px-4 border-2 border-dashed border-gray-600 hover:border-blue-500 text-gray-400 hover:text-blue-400 rounded-xl transition-all flex items-center justify-center gap-2 font-medium"
                                                                        onClick={() => addOption({ qIndex: index, setQuestions })}
                                                                    >
                                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                                                                        </svg>
                                                                        Add Option
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex justify-end pt-2">
                                                            <button
                                                                type="button"
                                                                className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 text-red-400 font-medium rounded-xl transition-all flex items-center gap-2"
                                                                onClick={() => deleteQuestion({ qIndex: index, setQuestions: setQuestions })}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                                </svg>
                                                                Delete Question
                                                            </button>
                                                        </div>
                                                    </div>
                                                </QuestionAccordion>
                                                {answerError && (
                                                    <div className="mt-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                                                        <p className="text-red-400 text-sm flex items-center gap-2">
                                                            <span>⚠</span> {answerError}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end p-6 bg-gradient-to-br from-[rgb(30,30,56)] to-[rgb(25,25,48)] rounded-2xl shadow-2xl mt-6">
                            <button
                                className={`px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-200 flex items-center gap-2 ${isValid
                                        ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                                        : "bg-gray-700 hover:bg-gray-600 opacity-80"
                                    }`}
                                type="submit"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                Publish Quiz
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}

export default AddQuizPage;