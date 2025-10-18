type ReactionBadgeProps = {
    emoticon: string;
    count: number;
    onReactionClick: (emoticon: string) => void;
};

export const ReactionBadge: React.FC<ReactionBadgeProps> = ({ emoticon, count, onReactionClick }) => {

    return (
        <div
            className="cursor-pointer"
            role="button"
            onClick={() => onReactionClick(emoticon)}
            tabIndex={0}>
            <div
                className="flex items-center text-xs bg-black/10 backdrop-blur-sm rounded-full px-1.5 py-0.5 hover:bg-blue-300 active:bg-blue-400"
                aria-label={`${emoticon} ${count}`}
            >
                <div className="mr-1">{emoticon}</div>
                <div className="font-medium">{count}</div>
            </div>
        </div>
    );
};