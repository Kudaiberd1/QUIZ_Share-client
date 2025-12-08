import {useMessagesStore} from "../model/store.ts";
import {useMessageTabsStore} from "../../message-tabs/model/store.ts";
import {useEffect, useState} from "react";

export interface CountMessage {
    all: number;
    readed: number;
    unreaded: number;
}

export const FilterMessage = () => {

    const feedbacks = useMessagesStore((state) => state.feedbacks);
    const tab = useMessageTabsStore((state) => state.activeTab);

    let filteredFeedbacks = feedbacks ?? [];

    if (tab === "Read") {
        console.log(feedbacks);
        filteredFeedbacks = (feedbacks ?? []).filter(f => f.readed === true);
    } else if (tab === "Unread") {
        filteredFeedbacks = (feedbacks ?? []).filter(f => f.readed === false);
    }

    return filteredFeedbacks;
}

export const CountMessages = () => {
    const feedback = useMessagesStore((state) => state.feedbacks);

    const [count, setCount] = useState<CountMessage>({
        all: 0,
        readed: 0,
        unreaded: 0,
    });

    useEffect(() => {
        if (!feedback) return;

        const newCount: CountMessage = {
            all: feedback.length,
            readed: feedback.filter(f => f.readed).length,
            unreaded: feedback.filter(f => !f.readed).length,
        };

        setCount(newCount);
    }, [feedback]);

    return count;
};