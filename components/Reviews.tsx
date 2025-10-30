
import React from 'react';
import { Review } from '../types';
import { StarRating } from './StarRating';

interface ReviewsProps {
  reviews: Review[];
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return null; // Don't render anything if there are no reviews
  }

  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews;

  return (
    <div className="border-t border-gray-800 py-6">
      <h2 className="text-xl font-bold tracking-wide text-white mb-3">Customer Reviews</h2>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black text-white">{averageRating.toFixed(1)}</span>
          <span className="text-lg font-semibold text-gray-400">/ 5</span>
        </div>
        <div className="flex flex-col">
          <StarRating rating={averageRating} />
          <p className="text-sm text-gray-500 mt-1">Based on {totalReviews} reviews</p>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-t border-gray-800 pt-4">
            <div className="flex items-center justify-between">
              <p className="font-bold text-white">{review.author}</p>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-300 mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
