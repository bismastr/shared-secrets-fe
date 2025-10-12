type Props = {
    onClick: (emoticon: string) => void;
    onClose: () => void;
}

const reactions = ["👍", "😂", "😍", "😮", "😢", "🎉"];

export const ReactionPopup: React.FC<Props> = ({ onClick, onClose }) => {
    return (
        <div
            role="dialog"
            aria-label="Pick a reaction"
            className="bg-white shadow-lg rounded-2xl absolute p-1 flex gap border border-gray-200"
        >
            {reactions.map((emoticon) => (
                <button
                    key={emoticon}
                    type="button"
                    className="text-xl px-2 py-1 rounded-lg hover:bg-blue-100 focus:bg-blue-200 focus:outline-none"
                    tabIndex={0}
                    aria-label={`React with ${emoticon}`}
                    onClick={() => onClick(emoticon)}
                >
                    {emoticon}
                </button>
            ))}
            <button
                type="button"
                className="ml-2 text-gray-500 text-xs px-2 py-1 rounded-lg hover:bg-gray-100 focus:bg-gray-200 focus:outline-none"
                tabIndex={0}
                aria-label="Close reaction picker"
                onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") onClose();
                }}
                onClick={onClose}
            >
                ✕
            </button>
        </div>
    )
}