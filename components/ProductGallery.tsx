import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProductGalleryProps {
  images: string[];
  onImageClick: (imageUrl: string) => void;
  activeImageUrl: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, onImageClick, activeImageUrl }) => {
  const { t } = useLanguage();
  const getImageLabel = (index: number) => {
    switch (index) {
      case 0: return 'Ferrari';
      case 1: return 'Lamborghini';
      case 2: return 'Porsche';
      default: return `Image ${index + 1}`;
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-3">{t('product.gallery')}</label>
      <div className="grid grid-cols-3 gap-3">
        {images.map((src, index) => (
          <div key={index} className="flex flex-col">
            <div
              className={`group aspect-square rounded-lg overflow-hidden cursor-pointer relative ring-2 transition-all duration-200 ${activeImageUrl === src ? 'ring-ferrari-red' : 'ring-transparent hover:ring-ferrari-red/70'}`}
              onClick={() => onImageClick(src)}
              role="button"
              tabIndex={0}
              aria-label={`View ${getImageLabel(index)} image`}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onImageClick(src)}
            >
              <img
                src={src}
                alt={`${getImageLabel(index)} thumbnail`}
                className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
              {activeImageUrl === src && (
                <div className="absolute top-1 right-1 w-3 h-3 bg-ferrari-red rounded-full border-2 border-white"></div>
              )}
            </div>
            <span className={`text-xs text-center mt-1 transition-colors ${activeImageUrl === src ? 'text-ferrari-red font-semibold' : 'text-gray-400'}`}>
              {getImageLabel(index)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};