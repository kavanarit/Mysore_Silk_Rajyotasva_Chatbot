
import React from 'react';

interface SilkTypesProps {
    onBack: () => void;
}

const silkTypesData = [
    {
        name: 'Mulberry Silk',
        description: 'The most common and highest quality silk, produced by Bombyx mori silkworms fed exclusively on mulberry leaves. It is known for its pure white color, softness, and incredible lustre. Mysore Silk is a prime example of Mulberry Silk.',
        imageSrc: 'https://images-cdn.ubuy.co.in/68b0f32d4a111c1ed8069481-100-pure-mulberry-silk-fabric-solid.jpg',
    },
    {
        name: 'Tussar Silk',
        description: 'A type of wild silk produced by silkworms that live in the wild forests. Tussar is valued for its rich texture, natural deep gold colour, and porous, breathable quality, making it very comfortable to wear.',
        imageSrc: 'https://thehandlooms.com/cdn/shop/files/080ED3A3-0FB9-408E-9293-87751E1C1C63.png?v=1700639962&width=800',
    },
    {
        name: 'Eri Silk (Peace Silk)',
        description: 'Also known as "Ahimsa" or "Peace Silk," as the cocoons are processed without killing the moth. Eri silk is dense, durable, and has a woolly, cotton-like texture, making it an excellent thermal insulator.',
        imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGCfsxeyb9rkyLgLPdBPp0sgolRkYJuh70Hg&s',
    },
    {
        name: 'Muga Silk',
        description: 'A wild silk variety from Assam, India, famous for its extreme durability and natural, glossy golden-yellow sheen. Its lustre increases with every wash, and it was once reserved exclusively for royalty.',
        imageSrc: 'https://media.assettype.com/english-sentinelassam%2Fimport%2Fh-upload%2F2021%2F05%2F29%2F229484-muga.webp?w=480&dpr=2&auto=format%2Ccompress&fit=max&q=85',
    }
];

const SilkTypes: React.FC<SilkTypesProps> = ({ onBack }) => {
    return (
        <div className="p-4 sm:p-8 animate-fade-in">
            <div className="max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Discover Types of Silk</h2>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {silkTypesData.map((silk, index) => (
                        <div key={index} className="bg-white/60 rounded-lg shadow-lg overflow-hidden flex flex-col transform transition-transform hover:-translate-y-2 duration-300">
                            <img src={silk.imageSrc} alt={silk.name} className="w-full h-56 object-cover" loading="lazy" />
                            <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-2xl font-bold text-red-600 mb-2">{silk.name}</h3>
                                <p className="text-gray-700 leading-relaxed flex-1">{silk.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SilkTypes;
