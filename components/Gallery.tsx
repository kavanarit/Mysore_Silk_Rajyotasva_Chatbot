import React from 'react';

export interface SareeImage {
    src: string;
    alt: string;
}

interface GalleryProps {
    onBack: () => void;
    onImageClick: (saree: SareeImage) => void;
}

export const sareeImages: SareeImage[] = [
    // ADD YOUR NEW SAREE IMAGE OBJECT HERE, LIKE THIS: { src: 'your-image-url.jpg', alt: 'A description of the saree.' }
    {
         src: 'https://shobitam.in/cdn/shop/files/SDV095_9.jpg?v=1742021110&width=1080', // your direct image link here
        alt: 'A mustard yellow Mysore Silk Saree with contrast zari border from Shobitam.',
    },
    {
        src: 'https://static.wixstatic.com/media/faf1ba_d549a470be3e4cc9a6b3afa2a1fd8510~mv2.jpeg/v1/fill/w_526,h_526,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/faf1ba_d549a470be3e4cc9a6b3afa2a1fd8510~mv2.jpeg',
        alt: 'A beautiful green silk saree with intricate gold patterns, folded neatly.',
    },
    {
        src: 'https://premvastra.com/cdn/shop/files/Snapinsta.app_440240171_17961358865756534_7279449958200065441_n_1024_a8dcfa26-c98b-4053-8d30-43a1131c7e73.jpg?v=1753343133',
        alt: 'A vibrant pink and gold Mysore Silk Saree displayed on a mannequin.',
    },
    {
        src: 'https://images.jdmagicbox.com/quickquotes/images_main/double-bordered-mysore-crepe-silk-saree-2219785337-qg48doba.jpg',
        alt: 'A close-up of the rich texture and golden border of a traditional Mysore Silk Saree.',
    },
    {
        src: 'https://www.uflauntapparels.com/cdn/shop/files/IMG-20250327-WA0739.jpg?v=1744089705',
        alt: 'A colorful display of various Mysore Silk Sarees stacked in a shop.',
    },
    {
        src: 'https://thevastracollections.com/wp-content/uploads/2025/03/1_11zon-10-1.png',
        alt: 'A folded deep red silk saree with an intricate golden pattern.',
    },
    {
        src: 'https://i.etsystatic.com/32163192/r/il/66ada2/4747231650/il_fullxfull.4747231650_84zs.jpg',
        alt: 'A woman wearing a beautiful red and gold silk saree, showcasing its elegance.',
    },
    {
        src: 'https://www.deepam.com/cdn/shop/articles/D97530_1080x_1_1000x.webp?v=1742481365',
        alt: 'A luxurious purple silk saree with a detailed golden border hanging elegantly.',
    },
];


const Gallery: React.FC<GalleryProps> = ({ onBack, onImageClick }) => {
    return (
        <div className="p-4 sm:p-8 animate-fade-in">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Mysore Silk Gallery</h2>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {sareeImages.map((image, index) => (
                        <div 
                            key={index} 
                            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => onImageClick(image)}
                            role="button"
                            tabIndex={0}
                            onKeyPress={(e) => e.key === 'Enter' && onImageClick(image)}
                            aria-label={`View details for ${image.alt}`}
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-80 object-cover transform transition-transform duration-300 ease-in-out group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Gallery;