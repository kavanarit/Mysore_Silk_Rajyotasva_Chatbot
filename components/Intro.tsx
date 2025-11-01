
import React from 'react';

interface IntroProps {
    onExplore: () => void;
}

const Intro: React.FC<IntroProps> = ({ onExplore }) => {
    // A subtle, traditional Indian 'zari' border pattern encoded for CSS
    const zariPattern = `data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80' 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFD700' fill-opacity='0.08'%3E%3Cpath fill-rule='evenodd' d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h20v20H40V0zm20 20h20v20H60V20zM0 40h20v20H0V40zm20-20h20v20H20V20z'/%3E%3C/g%3E%3C/svg%3E`;

    const Bubbles = () => {
        const numBubbles = 30;
        return (
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-1">
                {Array.from({ length: numBubbles }).map((_, i) => {
                    const size = Math.random() * 120 + 20; // 20px to 140px
                    const style = {
                        width: `${size}px`,
                        height: `${size}px`,
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        opacity: Math.random() * 0.15 + 0.05, // 0.05 to 0.2
                    };
                    return <div key={i} className="bubble" style={style}></div>;
                })}
            </div>
        );
    };

    return (
        // Added a custom style for the subtle background pattern
        <div 
            className="relative flex flex-col items-center justify-center h-screen bg-gradient-to-br from-yellow-400 to-red-500 text-white p-4 overflow-hidden"
            style={{ backgroundImage: `url("${zariPattern}"), linear-gradient(to bottom right, #facc15, #ef4444)` }}
        >
            <Bubbles />
            <div className="text-center z-10">
                <div 
                    className="flex flex-col items-center"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                >
                    <h1 
                        className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase flex flex-wrap justify-center gap-x-4"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)'}}
                    >
                        <span className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>Mysore Silk</span>
                        <span className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>Rajyotsava</span>
                    </h1>
                    
                    <div 
                        className="w-24 h-px bg-yellow-100/50 my-2 animate-fade-in-up"
                        style={{ animationDelay: '0.8s' }}
                    ></div>

                    <h2 
                        className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider uppercase animate-fade-in-up"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)', animationDelay: '1.0s' }}
                    >
                        Chatbot
                    </h2>
                </div>
                
                <p 
                    className="mt-4 text-lg sm:text-xl md:text-2xl text-yellow-100 font-light animate-fade-in-up"
                    style={{ animationDelay: '1.4s', textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}
                >
                    A journey into the golden threads of heritage.
                </p>
                
                <div className="animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
                    <button
                        onClick={onExplore}
                        className="mt-12 px-12 py-4 bg-white text-red-600 font-bold text-xl rounded-full shadow-2xl transform transition-all duration-300 hover:scale-110 hover:bg-yellow-100 focus:outline-none focus:ring-4 focus:ring-yellow-300 animate-pulse-slow"
                        aria-label="Explore the chatbot features"
                    >
                        Explore
                    </button>
                </div>
            </div>

            {/* Added a style tag for custom animations */}
            <style>{`
                .bubble {
                    position: absolute;
                    background-color: #fff;
                    border-radius: 50%;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.2);
                    transform: translate(-50%, -50%);
                }
                @keyframes keyframes-pulse-slow {
                    50% {
                        transform: scale(1.05);
                        box-shadow: 0 0 0 15px rgba(255, 255, 255, 0);
                    }
                }
                .animate-pulse-slow {
                    animation: keyframes-pulse-slow 2.5s infinite;
                    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
                }
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s both;
                }
            `}</style>
        </div>
    );
};

export default Intro;
