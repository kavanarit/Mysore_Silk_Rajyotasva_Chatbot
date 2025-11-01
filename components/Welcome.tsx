
import React, { useState } from 'react';

interface WelcomeProps {
    onStartChat: () => void;
    onViewGallery: () => void;
    onViewProcess: () => void;
    onViewSilkTypes: () => void;
}

const languageContent = [
    {
        lang: 'en',
        greeting: 'Welcome!',
        subheading: 'Mysore Silk Rajyotsava Chatbot',
        description: 'Discover the rich heritage of Mysore Silk, the pride of Karnataka. Chat with our bot to learn more, or explore our galleries.',
        chatButton: 'Start Chatting',
        galleryButton: 'View Silk Sarees',
        processButton: 'Saree Making Process',
        silkTypesButton: 'Discover Silk Types'
    },
    {
        lang: 'kn',
        greeting: 'ಸ್ವಾಗತ!',
        subheading: 'ಮೈಸೂರು ಸಿಲ್ಕ್ ರಾಜ್ಯೋತ್ಸವ ಚಾಟ್‌ಬಾಟ್',
        description: 'ಕರ್ನಾಟಕದ ಹೆಮ್ಮೆಯಾದ ಮೈಸೂರು ರೇಷ್ಮೆಯ ಶ್ರೀಮಂತ ಪರಂಪರೆಯನ್ನು ಅನ್ವೇಷಿಸಿ. ಇನ್ನಷ್ಟು ತಿಳಿಯಲು ನಮ್ಮ ಬಾಟ್‌ನೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ, ಅಥವಾ ನಮ್ಮ ಗ್ಯಾಲರಿಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
        chatButton: 'ಚಾಟಿಂಗ್ ಪ್ರಾರಂಭಿಸಿ',
        galleryButton: 'ರೇಷ್ಮೆ ಸೀರೆಗಳನ್ನು ವೀಕ್ಷಿಸಿ',
        processButton: 'ಸೀರೆ ತಯಾರಿಕೆ ಪ್ರಕ್ರಿಯೆ',
        silkTypesButton: 'ರೇಷ್ಮೆ ವಿಧಗಳನ್ನು ಅನ್ವೇಷಿಸಿ'
    },
    {
        lang: 'hi',
        greeting: 'स्वागत है!',
        subheading: 'मैसूर सिल्क राज्योत्सव चैटबॉट',
        description: 'कर्नाटक के गौरव, मैसूर सिल्क की समृद्ध विरासत की खोज करें। अधिक जानने के लिए हमारे बॉट से चैट करें, या हमारी गैलरी देखें।',
        chatButton: 'चैटिंग शुरू करें',
        galleryButton: 'सिल्क साड़ियाँ देखें',
        processButton: 'साड़ी बनाने की प्रक्रिया',
        silkTypesButton: 'रेशम के प्रकार खोजें'
    }
];

const Welcome: React.FC<WelcomeProps> = ({ onStartChat, onViewGallery, onViewProcess, onViewSilkTypes }) => {
    const [currentLangIndex, setCurrentLangIndex] = useState(0);

    const handleLanguageChange = () => {
        setCurrentLangIndex((prevIndex) => (prevIndex + 1) % languageContent.length);
    };

    const content = languageContent[currentLangIndex];

    return (
        <div className="relative flex flex-col items-center p-4 sm:p-8 text-center animate-fade-in">
            <div className="absolute top-6 right-6 z-10">
                <button
                    onClick={handleLanguageChange}
                    className="p-3 bg-white/30 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all transform hover:scale-110"
                    aria-label="Change language"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m4 13l4-4M19 17v-2m-3 0h-2M5 3H4a2 2 0 00-2 2v1m14 0V4a2 2 0 00-2-2h-1m-4 13v-2m-3 0H8M5 17v2a2 2 0 002 2h1m14 0h1a2 2 0 002-2v-1m-4-2v-2m3 0h2" />
                    </svg>
                </button>
            </div>
            
            <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-8 pt-8 sm:pt-16">
                <div className="max-w-3xl text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">{content.greeting}</h1>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-semibold text-red-600">{content.subheading}</h2>
                    <p className="mt-4 text-md sm:text-lg text-gray-600 max-w-2xl mx-auto">
                        {content.description}
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={onStartChat}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-yellow-500 to-red-500 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
                            aria-label="Start chatting about Mysore Silk"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15.5c-3.5-3.5-3.5-9 0-12.5C13 -.5 18.5-.5 22 3c-3.5 3.5-3.5 9 0 12.5-3.5 3.5-9 3.5-12.5 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.5 9.5a2 2 0 11-4 0 2 2 0 014 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2 22s5-5.5 11-13" />
                            </svg>
                            <span>{content.chatButton}</span>
                        </button>
                        
                        <button
                            onClick={onViewGallery}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-red-600 bg-transparent border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
                            aria-label="View saree gallery"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{content.galleryButton}</span>
                        </button>
                        
                        <button
                            onClick={onViewProcess}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-red-600 bg-transparent border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
                            aria-label="View saree making process"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                               <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                               <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{content.processButton}</span>
                        </button>

                        <button
                            onClick={onViewSilkTypes}
                            className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 text-md font-semibold text-red-600 bg-transparent border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
                            aria-label="Discover different types of silk"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <span>{content.silkTypesButton}</span>
                        </button>
                    </div>
                </div>

            
            </div>

            <div className="mt-20 sm:mt-24 mb-8 w-full max-w-5xl mx-auto">
                <div className="w-20 h-1 mb-6 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full mx-auto"></div>
                <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">100 Years of Silk Heritage</h3>
                <p className="mt-4 text-md text-gray-600 max-w-3xl mx-auto text-justify">
                    For over a century, Mysore Silk has been woven into the cultural fabric of Karnataka. Established under the patronage of the Maharajas of Mysore in 1912, this luxurious fabric is more than just clothing; it is a cherished heirloom passed down through generations. Its unparalleled lustre and rich zari work make it an essential part of life's most significant celebrations. A Mysore Silk saree is a symbol of elegance and tradition, worn with pride during grand weddings, auspicious housewarming ceremonies, and vibrant festivals, embodying the very essence of Kannadiga heritage and pride.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                        <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src="https://rmkv.com/cdn/shop/articles/Wedding_Collection_5a01e859-534d-4db5-8a8c-912b6d628ba5_720x.webp?v=1754044602" alt="A weaver working on a traditional handloom for a Mysore Silk Saree." />
                    </div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                        <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src="https://images.jdmagicbox.com/quickquotes/images_main/double-bordered-mysore-crepe-silk-saree-2219785337-qg48doba.jpg" alt="A close-up view of the intricate golden zari border of a Mysore Silk Saree." />
                    </div>
                    <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
                        <img className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src="https://sparkleandglow.co.in/cdn/shop/files/17612_0.jpg?v=1754167511" alt="A luxurious purple Mysore Silk Saree with a detailed golden border hanging elegantly." />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;