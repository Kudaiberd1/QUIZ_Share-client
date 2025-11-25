import { create } from "zustand/react";

type MessageTab = "All Feedback" | "Unread" | "Read";

interface MessageTabsStore {
    activeTab: MessageTab;
    setActiveTab: (tab: MessageTab) => void;
}

export const useMessageTabsStore = create<MessageTabsStore>((set) => ({
    activeTab: "All Feedback",
    setActiveTab: (tab) => set({ activeTab: tab }),
}));