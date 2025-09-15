export type VoteCount = {
    emoticon: string;
    count: number;
};

export type Answer = {
    id: string;
    answerText: string;
    voteCounts: VoteCount[];
};
