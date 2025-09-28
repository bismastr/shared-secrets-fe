import { GroupChat } from "@/components/GroupChat";
import { QuestionCard } from "@/components/QuestionCard";
import { sampleAnswers } from "@/data/sampleData";

export const CardPage: React.FC = () => {
    return (
        <div>
            <QuestionCard question="What do you regret the most?" className="mb-4" />
            <GroupChat answers={sampleAnswers} />
        </div>
    );
};