type ReactionBadgeProps = {
    emoticon: string;
    count: number;
    onReactionClick: (emoticon: string) => void;
};

export const ReactionBadge: React.FC<ReactionBadgeProps> = ({ emoticon, count, onReactionClick }) => {
    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onReactionClick(emoticon);
        }
    };

    return (
        <div
            className="cursor-pointer"
            role="button"
            onClick={() => onReactionClick(emoticon)}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            aria-label={`React with ${emoticon}, ${count} reactions`}
        >
            <div className="flex items-center gap-1 text-xs bg-red-50 border border-red-200 rounded-full px-2 py-0.5 hover:bg-red-100 active:bg-red-150 transition-all duration-200">
                <span className="text-sm">{emoticon}</span>
                <span className="font-medium text-red-500 text-[11px]">{count}</span>
            </div>
        </div>
    );
};