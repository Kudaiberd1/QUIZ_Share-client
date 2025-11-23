import { create } from "zustand/react";

type DashboardTab = "my-quizzes" | "taken-quizzes";

interface DashboardTabsStore {
    activeTab: DashboardTab;
    setActiveTab: (tab: DashboardTab) => void;
}

export const useDashboardTabsStore = create<DashboardTabsStore>((set) => ({
    activeTab: "my-quizzes",
    setActiveTab: (tab) => set({ activeTab: tab }),
}));

