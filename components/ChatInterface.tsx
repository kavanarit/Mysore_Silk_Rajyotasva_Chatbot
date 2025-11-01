import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Message, MessageAuthor } from '../types';
import { initChat, sendMessageToBot, getInitialGreeting } from '../services/geminiService';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Chat } from '@google/genai';
import { sareeImages } from './Gallery';

const langMap: { [key: string]: string } = {
    en: 'English',
    kn: 'Kannada',
    hi: 'Hindi',
};

interface ChatInterfaceProps {
    onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const initialize = () => {
            try {
                chatRef.current = initChat();
                const greeting = getInitialGreeting();
                setMessages([
                    {
                        id: 'initial-greeting',
                        text: greeting,
                        author: MessageAuthor.BOT,
                    },
                ]);
            } catch (error) {
                console.error("Failed to initialize chat:", error);
                setMessages([
                    {
                        id: 'init-error',
                        text: "Could not start the chat. Please check your configuration.",
                        author: MessageAuthor.BOT,
                    }
                ]);
            } finally {
                setIsLoading(false);
            }
        };
        initialize();
    }, []);

    const handleSendMessage = useCallback(async (inputText: string, language: string, imageFile?: File | null) => {
        if ((!inputText.trim() && !imageFile) || isLoading) return;

        let userImageUrl: string | undefined;
        if (imageFile) {
            userImageUrl = URL.createObjectURL(imageFile);
        }

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            author: MessageAuthor.USER,
            imageUrl: userImageUrl,
        };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setIsLoading(true);

        if (!chatRef.current) {
            setMessages(prev => [...prev, { id: 'chat-error', text: 'Chat session not available.', author: MessageAuthor.BOT }]);
            setIsLoading(false);
            return;
        }

        let promptToSend = inputText;
        if (language !== 'auto' && langMap[language]) {
            promptToSend = `IMPORTANT: Please respond to the following user prompt strictly in the ${langMap[language]} language. User Prompt: "${inputText}"`;
        }
        
        const botResponseText = await sendMessageToBot(chatRef.current, promptToSend, imageFile);
        
        const imageTagRegex = /\[IMAGE: (.*?)\]/;
        const match = botResponseText.match(imageTagRegex);

        let botMessageText = botResponseText;
        let botImageUrl: string | undefined;

        if (match) {
            const altText = match[1];
            const foundSaree = sareeImages.find(saree => saree.alt === altText);
            if (foundSaree) {
                botImageUrl = foundSaree.src;
            }
            botMessageText = botResponseText.replace(imageTagRegex, '').trim();
        }

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botMessageText,
            author: MessageAuthor.BOT,
            imageUrl: botImageUrl,
        };

        setMessages(prevMessages => [...prevMessages, botMessage]);
        setIsLoading(false);

        // Clean up the object URL to avoid memory leaks
        if (userImageUrl) {
            URL.revokeObjectURL(userImageUrl);
        }

    }, [isLoading]);

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto bg-white/50 rounded-lg shadow-xl">
            <div className="p-3 border-b border-gray-200 flex items-center">
                <button
                    onClick={onBack}
                    className="inline-flex items-center px-4 py-2 text-md font-semibold text-red-600 bg-white border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
                    aria-label="Back to welcome screen"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                    </svg>
                    Back
                </button>
            </div>
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <ChatMessage key={msg.id} message={msg} />
                    ))}
                    {isLoading && messages.length > 1 && <ChatMessage message={{id: 'loading', text: '...', author: MessageAuthor.BOT}} isLoading={true}/>}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    );
};

export default ChatInterface;