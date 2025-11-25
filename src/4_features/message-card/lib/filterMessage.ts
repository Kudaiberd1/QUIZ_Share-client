import {useMessagesStore} from "../model/store.ts";
import {useMessageTabsStore} from "../../message-tabs/model/store.ts";

const FilterMessage = () => {

    const feedbacks = useMessagesStore((state) => state.feedbacks);
    const tab = useMessageTabsStore((state) => state.activeTab);

    let filteredFeedbacks = feedbacks;

    if(tab === "Read"){
        filteredFeedbacks = feedbacks.filter(f => f.readed === true);
    }else if(tab === "Unread"){
        filteredFeedbacks = feedbacks.filter(f => f.readed === false);
    }

    return filteredFeedbacks;
}

export default FilterMessage;