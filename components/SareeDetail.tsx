import React, { useState, useEffect } from 'react';
import { generateSareeDescription, generateJewelrySuggestions } from '../services/geminiService';

interface Saree {
    src: string;
    alt: string;
}

interface SareeDetailProps {
    saree: Saree;
    onBack: () => void;
}

interface JewelrySuggestion {
    name: string;
    description: string;
}

const jewelryImages: { [key: string]: string } = {
    necklace: 'https://images.bhimagold.com/products/necklaces/images/e3c9b3d1-36aa-47a9-8ae3-1a51b8374bd3-NGD-CHDN_18K-WES3-D-L-NA-23632416.webp',
    earrings: 'https://jsfashion.in/wp-content/uploads/2024/12/ANTIQUE-EARRING-ER-14920W-102-JV.jpg',
    bangles: 'https://5.imimg.com/data5/SELLER/Default/2022/3/AZ/MS/XH/149300242/2.jpg',
    default: 'https://images.unsplash.com/photo-1617038220392-2f9284557222?q=80&w=800&auto=format&fit=crop'
};

const getJewelryImage = (name: string): string => {
    const lowerCaseName = name.toLowerCase();
    if (lowerCaseName.includes('necklace') || lowerCaseName.includes('haram') || lowerCaseName.includes('choker')) {
        return jewelryImages.necklace;
    }
    if (lowerCaseName.includes('earring') || lowerCaseName.includes('jhumka')) {
        return jewelryImages.earrings;
    }
    if (lowerCaseName.includes('bangle') || lowerCaseName.includes('bracelet') || lowerCaseName.includes('kadas')) {
        return jewelryImages.bangles;
    }
    return jewelryImages.default;
};


const SareeDetail: React.FC<SareeDetailProps> = ({ saree, onBack }) => {
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [jewelrySuggestions, setJewelrySuggestions] = useState<JewelrySuggestion[]>([]);
    const [isJewelryLoading, setIsJewelryLoading] = useState(true);

    useEffect(() => {
        const fetchDetails = async () => {
            setIsLoading(true);
            setIsJewelryLoading(true);

            const [generatedDesc, generatedJewelry] = await Promise.all([
                generateSareeDescription(saree.alt),
                generateJewelrySuggestions(saree.alt)
            ]);
            
            setDescription(generatedDesc);
            setIsLoading(false);
            
            setJewelrySuggestions(generatedJewelry);
            setIsJewelryLoading(false);
        };
        fetchDetails();
    }, [saree.alt]);

    const SkeletonLoader = () => (
        <div className="space-y-3 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
    );

    const JewelrySkeletonLoader = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-lg p-4 space-y-3">
                    <div className="h-32 bg-gray-300 rounded"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4 sm:p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <button
                        onClick={onBack}
                        className="inline-flex items-center px-4 py-2 text-md font-semibold text-red-600 bg-white border-2 border-red-500 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all transform hover:scale-105"
                        aria-label="Back to gallery"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                        </svg>
                        Back to Gallery
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                    <div className="w-full overflow-hidden rounded-lg shadow-xl">
                        <img 
                            src={saree.src} 
                            alt={saree.alt} 
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col justify-center">
                        <div className="w-20 h-1 mb-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">About this Saree</h2>
                        <div className="text-gray-700 leading-relaxed">
                            {isLoading ? <SkeletonLoader /> : <p>{description}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <div className="w-20 h-1 mb-4 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full"></div>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Matching Jewellery Suggestions</h2>
                    {isJewelryLoading ? <JewelrySkeletonLoader /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {jewelrySuggestions.map((item, index) => (
                                <div key={index} className="bg-white/60 rounded-lg shadow-md overflow-hidden transform transition-transform hover:-translate-y-2 duration-300">
                                    <img 
                                        src={getJewelryImage(item.name)} 
                                        alt={item.name} 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg text-red-700">{item.name}</h3>
                                        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SareeDetail;