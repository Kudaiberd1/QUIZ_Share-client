import { create } from "zustand/react";
import type {Feedback} from "../../../5_entity/model/quiz/type.ts";

interface MessagesStore {
    feedbacks: Feedback[] | null;
    setFeedbacks: (feedbacks: Feedback[]) => void;
}

export const useMessagesStore = create<MessagesStore>((set) => ({
    feedbacks: null,
    setFeedbacks: (feedbacks) => set({ feedbacks: feedbacks }),
}));