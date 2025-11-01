
import React from 'react';

interface MakingProcessProps {
    onBack: () => void;
}

const processSteps = [
    {
        title: "Step 1: Sericulture - Rearing the Silkworms",
        description: "The journey begins with cultivating mulberry leaves, the sole food for the Bombyx mori silkworms. These worms are carefully nurtured in controlled environments, consuming vast amounts of leaves as they grow.",
        imageSrc: "https://www.lingayasvidyapeeth.edu.in/sanmax/wp-content/uploads/2023/08/Sericulture.jpg",
    },
    {
        title: "Step 2: Cocoon Formation",
        description: "Once mature, each silkworm spins a protective cocoon around itself using a single, continuous thread of raw silk from its salivary glands. This fascinating process takes several days to complete.",
        imageSrc: "https://www.dsource.in/sites/default/files/gallery/17554/12.jpg",
    },
    {
        title: "Step 3: Reeling the Filament",
        description: "The cocoons are boiled or steamed to loosen the filament. Workers then carefully unwind the cocoons, combining the delicate threads from several cocoons to create a single, stronger silk thread ready for processing.",
        imageSrc: "https://www.iid.org.in/basepath/thumbnail/project-report/DSE99reeDtLFVxJ25NfNRo8iZu9OmJC8gzQXrtuy.jpeg",
    },
    {
        title: "Step 4: Twisting and Dyeing",
        description: "The reeled silk is twisted to give it strength and its characteristic crepe texture. It is then degummed to remove natural impurities, revealing its exceptional softness and lustre, before being dyed in vibrant, rich colors.",
        imageSrc: "https://www.stn-tressage.com/wp-content/uploads/DSC0194-1-scaled.jpg",
    },
    {
        title: "Step 5: Weaving with Pure Zari",
        description: "The magic happens on traditional handlooms. Skilled artisans meticulously weave the dyed silk threads. For authentic Mysore Silk, pure gold zari (a silk thread entwined with fine gold or silver wire) is used to create the intricate borders and pallu designs.",
        imageSrc: "https://i.ytimg.com/vi/U6GODMgahG8/maxresdefault.jpg",
    },
    {
        title: "Step 6: The Final Masterpiece",
        description: "After weaving, the saree undergoes a final finishing process. The result is a timeless piece of art—a lustrous, soft, and durable Mysore Silk Saree, a symbol of Karnataka's rich heritage and a prized possession for generations.",
        imageSrc: "https://www.textileinfomedia.com/img/dqse/pure-zari-weaving-saree-full.jpeg",
    }
];

const MakingProcess: React.FC<MakingProcessProps> = ({ onBack }) => {
    return (
        <div className="p-4 sm:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">The Journey of a Mysore Silk Saree</h2>
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

                <div className="space-y-12">
                    {processSteps.map((step, index) => (
                        <div key={index} className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="w-full md:w-1/2">
                                <img
                                    src={step.imageSrc}
                                    alt={step.title}
                                    className="w-full h-64 object-cover rounded-lg shadow-lg"
                                    loading="lazy"
                                />
                            </div>
                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl font-bold text-red-600 mb-2">{step.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MakingProcess;