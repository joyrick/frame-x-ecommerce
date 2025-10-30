
import React from 'react';

interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

const StarIcon: React.FC<{ filled: boolean, className: string }> = ({ filled, className }) => (
  <svg
    className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-600'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
  </svg>
);

export const StarRating: React.FC<StarRatingProps> = ({ rating, size = 'sm' }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <StarIcon
            key={index}
            filled={starValue <= Math.round(rating)}
            className={sizeClasses[size]}
          />
        );
      })}
    </div>
  );
};
