// Image paths for products and gallery
// Main product images (Ferrari, Lamborghini, Porsche) are now local files
// Only detail shot still uses external URL

export const PRODUCT_IMAGES = {
  FERRARI_FRAME: '/images/products/ferrari_key.png',
  LAMBORGHINI_FRAME: '/images/products/lamborghini_key.png', 
  PORSCHE_FRAME: '/images/products/porsche-frame.png',
} as const;

export const GALLERY_IMAGES = {
  FERRARI: '/images/products/ferrari_key.png',
  LAMBORGHINI: '/images/products/lamborghini_key.png',
  PORSCHE: '/images/products/porsche-frame.png',
  DETAIL_SHOT: 'https://i.imgur.com/1Bw1bXj.jpeg',
} as const;

// Local image paths (use these when you have downloaded the images)
export const LOCAL_PRODUCT_IMAGES = {
  FERRARI_FRAME: '/images/products/ferrari_key.png',
  LAMBORGHINI_FRAME: '/images/products/lamborghini_key.png',
  PORSCHE_FRAME: '/images/products/porsche-frame.png',
} as const;

export const LOCAL_GALLERY_IMAGES = {
  FERRARI: '/images/products/ferrari_key.png',
  LAMBORGHINI: '/images/products/lamborghini_key.png', 
  PORSCHE: '/images/products/porsche-frame.png',
  DETAIL_SHOT: '/images/gallery/detail-shot.jpg',
} as const;

// Helper function to get all gallery images as an array
export const getGalleryImages = (useLocal = false) => {
  const images = useLocal ? LOCAL_GALLERY_IMAGES : GALLERY_IMAGES;
  return [
    images.FERRARI,
    images.LAMBORGHINI,
    images.PORSCHE,
    images.DETAIL_SHOT,
  ];
};

// Helper function to get product image
export const getProductImage = (productType: 'ferrari' | 'lamborghini' | 'porsche', useLocal = false) => {
  const images = useLocal ? LOCAL_PRODUCT_IMAGES : PRODUCT_IMAGES;
  
  switch (productType) {
    case 'ferrari':
      return images.FERRARI_FRAME;
    case 'lamborghini':
      return images.LAMBORGHINI_FRAME;
    case 'porsche':
      return images.PORSCHE_FRAME;
    default:
      return images.FERRARI_FRAME;
  }
};
