import { useNavigate } from "react-router-dom";
import type { DashboardQuiz } from "../../../5_entity/model/dashboard/type.ts";
import { Edit, MessageSquare, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import api from "../../../6_shared/api/axiosInstance.ts";
import { useDashboardQuizStore } from "../model/store.ts";

interface MyQuizzesTableProps {
    quizzes: DashboardQuiz[];
}

const MyQuizzesTable = ({ quizzes }: MyQuizzesTableProps) => {
    const navigate = useNavigate();
    const { setMyQuizzes } = useDashboardQuizStore();
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = async (quizId: number) => {
        if (!confirm("Are you sure you want to delete this quiz? This action cannot be undone.")) {
            return;
        }

        setDeletingId(quizId);
        try {
            await api.delete(`/quiz/${quizId}`);
            setMyQuizzes(quizzes.filter((q) => q.id !== quizId));
        } catch (error) {
            console.error("Error deleting quiz:", error);
            alert("Failed to delete quiz. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusBadge = (privacy: string) => {
        const isPublished = privacy === "PUBLIC";
        return (
            <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isPublished
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                }`}
            >
                {isPublished ? "Published" : "Private"}
            </span>
        );
    };

    if (quizzes.length === 0) {
        return (
            <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                <p className="text-gray-400 text-lg">You haven't created any quizzes yet.</p>
                <button
                    onClick={() => navigate("/add")}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    Create Your First Quiz
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
                                Questions
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Status
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Feedback
                            </th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700/30">
                        {quizzes.map((quiz) => (
                            <tr
                                key={quiz.id}
                                className="hover:bg-[#2A2D4A]/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <p className="text-white font-medium">{quiz.title}</p>
                                            {quiz.description && (
                                                <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                                                    {quiz.description}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm">
                                        {quiz.subject}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center text-gray-300">
                                    {quiz.questions.length}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    {getStatusBadge(quiz.privacy)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center gap-2 text-gray-300">
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-sm">
                                            {quiz.feedbackCount || 0}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => navigate(`/quiz/${quiz.id}`)}
                                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                            title="View Quiz"
                                        >
                                            <Eye className="w-4 h-4 text-blue-400" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/add?edit=${quiz.id}`)}
                                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                            title="Edit Quiz"
                                        >
                                            <Edit className="w-4 h-4 text-yellow-400" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/quiz/${quiz.id}#feedback`)}
                                            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                                            title="View Feedback"
                                        >
                                            <MessageSquare className="w-4 h-4 text-green-400" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(quiz.id)}
                                            disabled={deletingId === quiz.id}
                                            className="p-2 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50"
                                            title="Delete Quiz"
                                        >
                                            <Trash2
                                                className={`w-4 h-4 ${
                                                    deletingId === quiz.id
                                                        ? "text-gray-500"
                                                        : "text-red-400"
                                                }`}
                                            />
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

export default MyQuizzesTable;

