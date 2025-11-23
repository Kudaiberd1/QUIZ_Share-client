import Sidebar from "../../3_widget/sidebar/Sidebar.tsx";
import Navbar from "../../3_widget/navbar/Navbar.tsx";
import DashboardTabs from "../../4_features/dashboard-tabs/ui/DashboardTabs.tsx";
import { useDashboardTabsStore } from "../../4_features/dashboard-tabs/model/store.ts";
import { useDashboardQuizStore } from "../../4_features/dashboard-quiz-table/model/store.ts";
import MyQuizzesTable from "../../4_features/dashboard-quiz-table/ui/MyQuizzesTable.tsx";
import TakenQuizzesTable from "../../4_features/dashboard-quiz-table/ui/TakenQuizzesTable.tsx";
import { fetchUserQuizzes, fetchTakenQuizzes } from "../../4_features/dashboard-quiz-table/model/api.ts";
import { useUserStore } from "../../4_features/auth/model/store.ts";
import { useEffect } from "react";
import { BarChart3, BookOpen, TrendingUp } from "lucide-react";

const DashboardPage = () => {
    const { activeTab } = useDashboardTabsStore();
    const { myQuizzes, takenQuizzes, loading, error, setMyQuizzes, setTakenQuizzes, setLoading, setError } = useDashboardQuizStore();
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (!user?.id) return;

        const loadData = async () => {
            setLoading(true);
            setError(null);

            try {
                if (activeTab === "my-quizzes") {
                    const quizzes = await fetchUserQuizzes(user.id);
                    setMyQuizzes(quizzes);
                } else {
                    const quizzes = await fetchTakenQuizzes(user.id);
                    setTakenQuizzes(quizzes);
                }
            } catch (err) {
                console.error("Error loading dashboard data:", err);
                setError("Failed to load data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [user?.id, activeTab, setMyQuizzes, setTakenQuizzes, setLoading, setError]);

    const stats = {
        totalCreated: myQuizzes?.length || 0,
        totalTaken: takenQuizzes?.length || 0,
        publishedCount: myQuizzes?.filter((q) => q.privacy === "PUBLIC").length || 0,
        averageScore: takenQuizzes
            ? Math.round(
                takenQuizzes.reduce((sum, q) => sum + q.result.percentage, 0) /
                takenQuizzes.length
            )
            : 0,
    };

    return (
        <div className="flex min-h-screen">
            <Sidebar selected={2} />
            <div className="flex-1 flex flex-col md:ms-[304px]">
                <Navbar />
                <main className="py-8 px-6 md:px-12 my-3 h-full mt-12">
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
                        <p className="text-gray-400 text-lg">
                            Manage your created quizzes and review your performance on taken quizzes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-6 border border-blue-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Total Created</p>
                                    <p className="text-3xl font-bold text-white">{stats.totalCreated}</p>
                                </div>
                                <BookOpen className="w-8 h-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-6 border border-green-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Published</p>
                                    <p className="text-3xl font-bold text-white">
                                        {stats.publishedCount}
                                    </p>
                                </div>
                                <BarChart3 className="w-8 h-8 text-green-400" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-xl p-6 border border-purple-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Quizzes Taken</p>
                                    <p className="text-3xl font-bold text-white">
                                        {stats.totalTaken}
                                    </p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-purple-400" />
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-6 border border-yellow-500/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 text-sm mb-1">Average Score</p>
                                    <p className="text-3xl font-bold text-white">
                                        {stats.averageScore}%
                                    </p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-yellow-400" />
                            </div>
                        </div>
                    </div>

                    <DashboardTabs />

                    {loading ? (
                        <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                            <p className="text-gray-400 mt-4">Loading...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                            <p className="text-red-400 text-lg">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    ) : activeTab === "my-quizzes" ? (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-2">
                                    Quizzes I've Created
                                </h2>
                                <p className="text-gray-400">
                                    These are the quizzes you have designed and published or saved as
                                    drafts.
                                </p>
                            </div>
                            {myQuizzes ? (
                                <MyQuizzesTable quizzes={myQuizzes} />
                            ) : (
                                <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                                    <p className="text-gray-400 text-lg">No quizzes found.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-white mb-2">
                                    Quizzes I've Taken
                                </h2>
                                <p className="text-gray-400">
                                    Review your performance and results from quizzes you've completed.
                                </p>
                            </div>
                            {takenQuizzes ? (
                                <TakenQuizzesTable quizzes={takenQuizzes} />
                            ) : (
                                <div className="bg-[#1E2039] rounded-xl p-12 text-center">
                                    <p className="text-gray-400 text-lg">No taken quizzes found.</p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
