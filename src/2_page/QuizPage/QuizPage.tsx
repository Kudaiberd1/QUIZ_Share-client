import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import default_image from "../../assets/default-quiz-image.png"
import { FaStar } from 'react-icons/fa';
import RatingStats from "../../6_shared/ui/RatingStats.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../6_shared/api/axiosInstance.ts";
import type { QuizResponse } from "../../5_entity/model/quiz/type.ts";
import { Clock, BookOpen, User, Lock, Globe } from "lucide-react";

const QuizPage = () => {

    const { id } = useParams<{ id: string }>();

    const [quiz, setQuiz] = useState<QuizResponse>();

    const [average, setAverage] = useState<number>(0);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/quiz/${id}`).then((res) => {
            setQuiz(res.data);
            let avg = 0;
            let sm = 0;
            for (let i = 0; i < res.data.rate.length; i++) {
                avg += (res.data.rate[i] * (i + 1));
                sm += res.data.rate[i];
            }
            if (sm != 0)
                setAverage(avg / sm);
        }).catch((err) => {
            console.error("Error fetching quiz:", err);
        });

    }, [id]);

    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        if (minutes > 0) {
            return `${minutes} min ${remainingSeconds > 0 ? `${remainingSeconds} sec` : ''}`;
        }
        return `${seconds} sec`;
    };

    const difficultyConfig = {
        EASY: { color: "text-green-400 bg-green-400/10 border-green-400/20", label: "Easy" },
        MEDIUM: { color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20", label: "Medium" },
        HARD: { color: "text-red-400 bg-red-400/10 border-red-400/20", label: "Hard" }
    };


    if (!quiz) {
        return (
            <div className="flex min-h-screen">
                <Sidebar selected={0} />
                <div className="flex-1 flex flex-col md:ms-[304px]">
                    <Navbar />
                    <main className="py-8 px-4 md:px-12 my-3 h-full mt-12 flex items-center justify-center">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                            <p className="text-gray-400">Loading quiz...</p>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    const totalRatings = quiz.rate.reduce((acc, num) => acc + num, 0);
    const difficulty = difficultyConfig[quiz.difficulty as keyof typeof difficultyConfig] || difficultyConfig.EASY;

    return (
        <div className="flex min-h-screen">
            <Sidebar selected={0} />
            <div className="flex-1 flex flex-col md:ms-[304px]">
                <Navbar />
                <main className="py-6 px-4 md:py-8 md:px-12 my-3 h-full mt-12">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{quiz.title}</h1>
                        <div className="flex flex-wrap items-center gap-3 mt-3">
                            <span className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${difficulty.color}`}>
                                {difficulty.label}
                            </span>
                            <span className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {quiz.subject}
                            </span>
                            {quiz.privacy === "PUBLIC" ? (
                                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                    <Globe className="w-4 h-4" />
                                    Public
                                </span>
                            ) : (
                                <span className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                    <Lock className="w-4 h-4" />
                                    Private
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="rounded-2xl p-6 lg:p-8 bg-gradient-to-br from-[rgb(30,30,56)] to-[rgb(25,25,48)] shadow-2xl">
                                <h2 className="text-xl font-semibold text-white mb-4">About This Quiz</h2>
                                <p className="text-gray-300 text-base leading-relaxed mb-6">
                                    {quiz.description || "No description provided."}
                                </p>

                                {/* Quiz Stats */}
                                <div className={`grid grid-cols-2 ${quiz.takeTimeLimit ? 'md:grid-cols-4' : 'md:grid-cols-3'} gap-4 mt-6`}>
                                    <div className="bg-[rgb(10,14,27)] rounded-xl p-4 border border-gray-700 hover:border-blue-500/50 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-5 h-5 text-blue-400" />
                                            <span className="text-sm text-gray-400">Questions</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{quiz.questions.length}</p>
                                    </div>

                                    {quiz.takeTimeLimit && (
                                        <div className="bg-[rgb(10,14,27)] rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-colors">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Clock className="w-5 h-5 text-purple-400" />
                                                <span className="text-sm text-gray-400">Time Limit</span>
                                            </div>
                                            <p className="text-2xl font-bold text-white">{formatTime(quiz.takeTimeLimit)}</p>
                                        </div>
                                    )}

                                    <div className="bg-[rgb(10,14,27)] rounded-xl p-4 border border-gray-700 hover:border-yellow-500/50 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaStar className="w-5 h-5 text-yellow-400" />
                                            <span className="text-sm text-gray-400">Rating</span>
                                        </div>
                                        <p className="text-2xl font-bold text-white">{average.toFixed(1)}</p>
                                    </div>

                                    <div className="bg-[rgb(10,14,27)] rounded-xl p-4 border border-gray-700 hover:border-green-500/50 transition-colors">
                                        <div className="flex items-center gap-2 mb-2">
                                            <User className="w-5 h-5 text-green-400" />
                                            <span className="text-sm text-gray-400">Author</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white truncate">
                                            {quiz.firstName} {quiz.lastName}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating Display */}
                                <div className="mt-6 pt-6 border-t border-gray-700">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <FaStar
                                                    key={star}
                                                    className={`w-6 h-6 ${star <= Math.round(average)
                                                        ? "text-yellow-400"
                                                        : "text-gray-600"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <div>
                                            <p className="text-2xl font-bold text-white">{average.toFixed(1)}</p>
                                            <p className="text-sm text-gray-400">
                                                {totalRatings} {totalRatings === 1 ? "rating" : "ratings"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className="mt-6 w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                                    onClick={() => navigate(`/quiz/${id}/taking`)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                    </svg>
                                    Start Quiz
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-semibold text-white mb-6">Student Feedback</h2>
                        <div className="max-w-2xl">
                            {quiz && (
                                <RatingStats
                                    averageRating={average}
                                    ratings={quiz.rate}
                                    totalRatings={totalRatings}
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default QuizPage;
