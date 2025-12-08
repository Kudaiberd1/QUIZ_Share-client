import {useMessageTabsStore} from "../model/store.ts";
import {CountMessages} from "../../message-card/lib/filterMessage.ts";

const MessageTabs = () => {
    const activeTab = useMessageTabsStore(state => state.activeTab);
    const { setActiveTab } = useMessageTabsStore();
    const countMessage = CountMessages();

    return (
        <div className="flex gap-1 border-b border-gray-700/50 mb-8">
            <button
                onClick={() => setActiveTab("All Feedback")}
                className={`px-6 py-3 font-medium text-base transition-all flex relative ${
                    activeTab === "All Feedback"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                All Feedback
                {activeTab === "All Feedback" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
                {countMessage.all>0 && <p className="border border-gray-500 bg-gray-500 rounded-full w-5 h-5 aspect-square flex items-center justify-center text-[14px] ml-1"> {countMessage.all} </p>}
            </button>
            <button
                onClick={() => setActiveTab("Unread")}
                className={`px-6 py-3 flex font-medium text-base transition-all relative ${
                    activeTab === "Unread"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                Unread
                {activeTab === "Unread" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
                {countMessage.unreaded>0 && <p className="border border-gray-500 bg-gray-500 rounded-full w-5 h-5 aspect-square flex items-center justify-center text-[14px] ml-1"> {countMessage.unreaded} </p>}
            </button>

            <button
                onClick={() => setActiveTab("Read")}
                className={`px-6 py-3 flex font-medium text-base transition-all relative ${
                    activeTab === "Read"
                        ? "text-white"
                        : "text-gray-400 hover:text-gray-300"
                }`}
            >
                Read
                {activeTab === "Read" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-full" />
                )}
                {countMessage.readed>0 && <p className="border border-gray-500 bg-gray-500 rounded-full w-5 h-5 aspect-square flex items-center justify-center text-[14px] ml-1"> {countMessage.readed} </p>}
            </button>
        </div>
    )
}

export default MessageTabs;