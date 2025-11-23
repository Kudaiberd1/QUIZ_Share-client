import { useNavigate } from "react-router-dom";
import type { DashboardTakenQuiz } from "../../../5_entity/model/dashboard/type.ts";
import { Eye, TrendingUp } from "lucide-react";

interface TakenQuizzesTableProps {
    quizzes: DashboardTakenQuiz[];
}

const TakenQuizzesTable = ({ quizzes }: TakenQuizzesTableProps) => {
    const navigate = useNavigate();

    const getScoreColor = (percentage: number) => {
        if (percentage >= 80) return "text-green-400";
        if (percentage >= 60) return "text-yellow-400";
        return "text-red-400";
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    if (quizzes.length === 0) {
        return (
            <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                <p className="text-gray-400 text-lg">You haven't taken any quizzes yet.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Browse Quizzes
                </button>
            </div>
        );
    }

    return (
        <div className="bg-[#1E2039] rounded-xl overflow-hidden border border-gray-700/30">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-[#2A2D4A] border-b border-gray-700/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Quiz Title
                            </th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">
                                Subject
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Score
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Correct
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Wrong
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Skipped
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Completed
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/30">
                        {quizzes.map((item) => (
                            <tr
                                key={item.id}
                                className="hover:bg-[#2A2D4A]/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <p className="text-white font-medium">
                                                {item.quiz.title}
                                            </p>
                                            <p className="text-gray-400 text-sm mt-1">
                                                By {item.quiz.firstName} {item.quiz.lastName}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                                        {item.quiz.subject}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <TrendingUp
                                            className={`w-4 h-4 ${getScoreColor(item.result.percentage)}`}
                                        />
                                        <span
                                            className={`font-bold text-lg ${getScoreColor(
                                                item.result.percentage
                                            )}`}
                                        >
                                            {item.result.percentage}%
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-center text-green-400 font-medium">
                                    {item.result.correct}
                                </td>
                                <td className="px-6 py-4 text-center text-red-400 font-medium">
                                    {item.result.wrong}
                                </td>
                                <td className="px-6 py-4 text-center text-yellow-400 font-medium">
                                    {item.result.skipped}
                                </td>
                                <td className="px-6 py-4 text-center text-gray-400 text-sm">
                                    {formatDate(item.completedAt)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/quiz/${item.quiz.id}`)}
                                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                            title="View Quiz"
                                        >
                                            <Eye className="w-4 h-4 text-blue-400" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/quiz/result/${item.id}`)}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                                        >
                                            View Result
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TakenQuizzesTable;

