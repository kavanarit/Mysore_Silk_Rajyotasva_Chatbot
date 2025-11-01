
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-gradient-to-r from-yellow-400 to-red-500 text-white p-4 shadow-md flex items-center justify-center relative">
            <div className="absolute left-4 opacity-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.648.5.5 5.648.5 12s5.148 11.5 11.5 11.5S23.5 18.352 23.5 12 .5 12 .5zm0 21C6.467 21.5 2.5 17.533 2.5 12S6.467 2.5 12 2.5s9.5 3.967 9.5 9.5-3.967 9.5-9.5 9.5zm-1-6.5h2V8h-2v7z"/>
                </svg>
            </div>
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-center tracking-wide">Mysore Silk Rajyotsava Chatbot</h1>
                <p className="text-xs md:text-sm text-center text-yellow-100">Celebrating the Pride of Karnataka</p>
            </div>
        </header>
    );
};

export default Header;
