import React, { useState, useRef } from 'react';

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  onFullscreenClick: () => void;
}

export const ProductImage: React.FC<ProductImageProps> = ({ imageUrl, productName, onFullscreenClick }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Controls the intensity of the tilt effect
  const TILT_INTENSITY = 8; // Reduced from 15 for a more subtle effect

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const { width, height, left, top } = rect;

    // Calculate mouse position relative to the element center (from -0.5 to 0.5)
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const xPercent = (mouseX / width) - 0.5;
    const yPercent = (mouseY / height) - 0.5;

    // Update rotation state based on mouse position and intensity
    setRotation({
      x: xPercent * TILT_INTENSITY,
      y: yPercent * -1 * TILT_INTENSITY, // Invert Y for a natural "top of card moves away" feel
    });
  };

  const handleMouseLeave = () => {
    // Reset rotation when mouse leaves the element
    setRotation({ x: 0, y: 0 });
  };

  return (
    // The main container will handle the 3D perspective and transformations.
    <div className="flex justify-center">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative overflow-hidden rounded-lg shadow-2xl shadow-black/50 w-full max-w-md"
      style={{
        transform: `perspective(1000px) rotateY(${rotation.x}deg) rotateX(${rotation.y}deg)`,
        transition: 'transform 0.4s ease-out', // Smoother and slightly slower transition
      }}
    >
      <img
        src={imageUrl}
        alt={productName}
        className="w-full h-full object-cover aspect-[4/5] transform transition-transform duration-500 ease-in-out group-hover:scale-105"
      />
      <button
        onClick={onFullscreenClick}
        className="absolute top-4 right-4 bg-black/40 p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-ferrari-red"
        aria-label="View image in fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4m12 4V4h-4M4 16v4h4m12-4v4h-4" />
        </svg>
      </button>
      </div>
    </div>
  );
};