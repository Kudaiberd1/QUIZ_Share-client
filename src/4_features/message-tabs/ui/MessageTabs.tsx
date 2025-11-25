import {useMessageTabsStore} from "../model/store.ts";

const MessageTabs = () => {
    const activeTab = useMessageTabsStore(state => state.activeTab);
    const { setActiveTab } = useMessageTabsStore();

    return (
        <div className="flex gap-1 border-b border-gray-700/50 mb-8">
            <button
                onClick={() => setActiveTab("All Feedback")}
                className={`px-6 py-3 font-medium text-base transition-all relative ${
                    activeTab === "All Feedback"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                All Feedback
                {activeTab === "All Feedback" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
            </button>

            <button
                onClick={() => setActiveTab("Unread")}
                className={`px-6 py-3 font-medium text-base transition-all relative ${
                    activeTab === "Unread"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                Unread
                {activeTab === "Unread" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
            </button>

            <button
                onClick={() => setActiveTab("Read")}
                className={`px-6 py-3 font-medium text-base transition-all relative ${
                    activeTab === "Read"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                Read
                {activeTab === "Read" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
            </button>
        </div>
    )
}

export default MessageTabs;