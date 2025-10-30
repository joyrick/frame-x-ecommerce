import React from 'react';

interface ProductGalleryProps {
  images: string[];
  onImageClick: (imageUrl: string) => void;
  activeImageUrl: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({ images, onImageClick, activeImageUrl }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-400 mb-3">Gallery</label>
      <div className="grid grid-cols-4 gap-3">
        {images.map((src, index) => (
          <div
            key={index}
            className={`group aspect-square rounded-lg overflow-hidden cursor-pointer relative ring-2 transition-all duration-200 ${activeImageUrl === src ? 'ring-ferrari-red' : 'ring-transparent hover:ring-ferrari-red/70'}`}
            onClick={() => onImageClick(src)}
            role="button"
            tabIndex={0}
            aria-label={`View image ${index + 1}`}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onImageClick(src)}
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
};