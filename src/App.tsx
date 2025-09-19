import React from "react";
import { GroupChat } from "./components/chat/GroupChat";
import { QuestionCard } from "./components/common/QuestionCard";
import { AppLayout } from "./components/layout/AppLayout";
import { sampleAnswers } from "./data/sampleData";

const App: React.FC = () => {
    return (
        <AppLayout>
            <QuestionCard
                question="What do you regret the most?"
                className="mb-4"
            />
            <GroupChat answers={sampleAnswers} />
        </AppLayout>
    );
};

export default App;