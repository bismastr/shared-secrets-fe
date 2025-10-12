import type React from "react";


interface Props {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const AnswerForm: React.FC<Props> = ({
    inputValue,
    onInputChange,
    onSubmit,
}) => {
    return (
        <form className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[420px] bg-white border-t border-gray-200 shadow-lg"
            onSubmit={onSubmit}>
            <div className="px-4 py-4">
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Type your answer..."
                        className="flex-1 min-w-0 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                        aria-label="Enter your answer to the question"
                        tabIndex={0}
                        value={inputValue}
                        onChange={onInputChange}
                    />
                    <button
                        type="submit"
                        className="flex-shrink-0 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base font-medium"
                        aria-label="Submit answer"
                        tabIndex={0}
                    >
                        Send
                    </button>
                </div>
            </div>
        </form>
    );
}
