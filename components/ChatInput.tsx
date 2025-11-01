
import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
    onSendMessage: (message: string, language: string, image?: File | null) => void;
    isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
    const [inputValue, setInputValue] = useState('');
    const [selectedLang, setSelectedLang] = useState('auto');
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const [attachedImage, setAttachedImage] = useState<{ file: File, previewUrl: string } | null>(null);
    
    const menuRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if ((inputValue.trim() || attachedImage) && !isLoading) {
            onSendMessage(inputValue, selectedLang, attachedImage?.file);
            setInputValue('');
            setAttachedImage(null);
            setSelectedLang('auto'); // Reset after sending
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setAttachedImage({
                file,
                previewUrl: URL.createObjectURL(file),
            });
        }
    };
    
    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const languages = [
        { code: 'auto', label: 'Auto-Detect', short: 'Auto' },
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'kn', label: 'ಕನ್ನಡ', short: 'ಕ' },
        { code: 'hi', label: 'हिन्दी', short: 'हिं' },
    ];

    const currentLangLabel = languages.find(l => l.code === selectedLang)?.short || 'Auto';

    return (
        <div className="p-4 bg-white/60 border-t border-gray-200 backdrop-blur-sm">
            {attachedImage && (
                <div className="mb-2 p-2 bg-gray-100 rounded-lg relative w-28">
                    <img src={attachedImage.previewUrl} alt="Preview" className="w-full h-auto rounded" />
                    <button
                        onClick={() => setAttachedImage(null)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold hover:bg-red-600"
                        aria-label="Remove image"
                    >
                        ✕
                    </button>
                </div>
            )}
            <form onSubmit={handleSubmit} className="flex items-center space-x-2 sm:space-x-3">
                 <div className="relative" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                        className="flex items-center justify-center w-12 h-12 text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                        aria-haspopup="true"
                        aria-expanded={isLangMenuOpen}
                        aria-label="Select response language"
                    >
                        <span className="font-bold text-sm">{currentLangLabel}</span>
                    </button>
                    {isLangMenuOpen && (
                        <div className="absolute bottom-full mb-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-10 animate-fade-in-up">
                            <ul className="py-1">
                                {languages.map(lang => (
                                    <li key={lang.code}>
                                        <button
                                            type="button"
                                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-yellow-100 hover:text-gray-900"
                                            onClick={() => {
                                                setSelectedLang(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                        >
                                            {lang.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
                
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center w-12 h-12 text-gray-500 bg-gray-100 border border-gray-300 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors"
                    aria-label="Attach image"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                </button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask about Mysore Silk..."
                    className="flex-1 w-full px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="inline-flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    disabled={isLoading || (!inputValue.trim() && !attachedImage)}
                    aria-label="Send message"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </button>
            </form>
        </div>
    );
};

export default ChatInput;