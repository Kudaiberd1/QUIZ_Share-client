import { useDashboardTabsStore } from "../model/store.ts";

const DashboardTabs = () => {
    const { activeTab, setActiveTab } = useDashboardTabsStore();

    return (
        <div className="flex gap-1 border-b border-gray-700/50 mb-8">
            <button
                onClick={() => setActiveTab("my-quizzes")}
                className={`px-6 py-3 font-medium text-base transition-all relative ${
                    activeTab === "my-quizzes"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                My Quizzes
                {activeTab === "my-quizzes" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
            </button>
            <button
                onClick={() => setActiveTab("taken-quizzes")}
                className={`px-6 py-3 font-medium text-base transition-all relative ${
                    activeTab === "taken-quizzes"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                Taken Quizzes
                {activeTab === "taken-quizzes" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
            </button>
        </div>
    );
};

export default DashboardTabs;

