// Image paths for products and gallery
export const IMAGE_PATHS = {
  FERRARI: '/images/products/ferrari_key.png',
  LAMBORGHINI: '/images/products/lamborghini_key.png',
  PORSCHE: '/images/products/porsche-frame.png',
  DETAIL_SHOT: 'https://i.imgur.com/1Bw1bXj.jpeg',
} as const;

// Helper function to get all gallery images as an array
export const getGalleryImages = () => {
  return [
    IMAGE_PATHS.FERRARI,
    IMAGE_PATHS.LAMBORGHINI,
    IMAGE_PATHS.PORSCHE,
  ];
};

// Helper function to get product image
export const getProductImage = (productType: 'ferrari' | 'lamborghini' | 'porsche') => {
  switch (productType) {
    case 'ferrari':
      return IMAGE_PATHS.FERRARI;
    case 'lamborghini':
      return IMAGE_PATHS.LAMBORGHINI;
    case 'porsche':
      return IMAGE_PATHS.PORSCHE;
    default:
      return IMAGE_PATHS.FERRARI;
  }
};

// Helper function to map gallery image URL to product ID
export const getProductIdFromImage = (imageUrl: string): string | null => {
  if (imageUrl === IMAGE_PATHS.FERRARI) {
    return 'ferrari-dxfe-001';
  } else if (imageUrl === IMAGE_PATHS.LAMBORGHINI) {
    return 'lamborghini-dxle-001';
  } else if (imageUrl === IMAGE_PATHS.PORSCHE) {
    return 'porsche-dxpe-001';
  }
  
  return null; // Detail shot or unknown image
};
