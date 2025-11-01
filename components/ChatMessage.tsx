import React from 'react';
import { Message, MessageAuthor } from '../types';

interface ChatMessageProps {
    message: Message;
    isLoading?: boolean;
}

// A safe component to render simple markdown (bold)
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
    // Split text by the bold delimiter `**`
    const parts = text.split('**');
    
    return (
        <p className="text-sm whitespace-pre-wrap">
            {parts.map((part, index) => {
                // Every odd-indexed part is wrapped in <strong>
                if (index % 2 === 1) {
                    return <strong key={index}>{part}</strong>;
                }
                // Even-indexed parts are regular text
                return <span key={index}>{part}</span>;
            })}
        </p>
    );
};


const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading = false }) => {
    const isBot = message.author === MessageAuthor.BOT;

    const botStyles = "bg-rose-100 text-gray-800 rounded-lg rounded-bl-none";
    const userStyles = "bg-yellow-400 text-gray-900 rounded-lg rounded-br-none ml-auto";
    const bubbleStyles = `p-3 max-w-xs md:max-w-md lg:max-w-lg shadow ${isBot ? botStyles : userStyles}`;
    
    const TypingIndicator: React.FC = () => (
        <div className="flex items-center space-x-1 p-3">
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></div>
        </div>
    );

    return (
        <div className={`flex items-end ${!isBot ? 'justify-end' : ''}`}>
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                    ಕ
                </div>
            )}
            <div className={bubbleStyles}>
                {isLoading ? (
                    <TypingIndicator /> 
                ) : (
                    <div className="flex flex-col gap-2">
                        {message.imageUrl && (
                            <img 
                                src={message.imageUrl} 
                                alt="Attachment"
                                className="rounded-lg max-w-full h-auto"
                            />
                        )}
                        {message.text && <FormattedText text={message.text} />}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessage;