import React, { useState, useEffect } from 'react';

// Utility to generate a random number in a range
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// Generate a color
const pickRandomColor = () => {
  const colors = ['#ffc700', '#ffdd55', '#ffffff']; // Gold, light gold, white
  return colors[Math.floor(Math.random() * colors.length)];
};

// A star shape created with CSS clip-path for performance
const StarIcon = ({ color }: { color: string }) => (
    <div
      style={{
        width: '100%',
        height: '100%',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        backgroundColor: color,
      }}
    />
);

interface Sparkle {
    id: string;
    createdAt: number;
    color: string;
    size: number;
    style: React.CSSProperties;
}

interface AddToCartButtonProps {
  onClick: () => void;
}

const SPARKLE_COUNT = 15;
const SPARKLE_DURATION_MS = 700;

export const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // Calculate click position relative to the button
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparkles = Array.from({ length: SPARKLE_COUNT }).map(() => {
      const size = random(8, 16);
      const color = pickRandomColor();
      return {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        color,
        size,
        style: {
          top: `${y - size / 2}px`,
          left: `${x - size / 2}px`,
          width: `${size}px`,
          height: `${size}px`,
          '--tx': `${random(-1, 1) * 100}px`,
          '--ty': `${random(-1, 1) * 100}px`,
          animationDelay: `${random(0, 100)}ms`,
        }
      };
    });
    setSparkles(prev => [...prev, ...newSparkles]);
    onClick();
  };
  
  // Clean up old sparkles from the DOM to prevent memory leaks
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setSparkles(prev => prev.filter(s => now - s.createdAt < SPARKLE_DURATION_MS));
    }, SPARKLE_DURATION_MS + 100); 
    return () => clearInterval(interval);
  }, []);

  return (
    <button
      onClick={handleClick}
      className="relative w-full sm:w-auto flex-grow bg-ferrari-red text-white font-bold text-lg uppercase tracking-wider py-4 px-8 rounded-md transition-transform duration-300 ease-in-out hover:scale-105 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/50"
    >
      <span className="relative">Add to Cart</span>
      {sparkles.map(sparkle => (
        <span key={sparkle.id} className="sparkle-instance" style={sparkle.style}>
          <StarIcon color={sparkle.color} />
        </span>
      ))}
    </button>
  );
};