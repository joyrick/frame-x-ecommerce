
// Stripe Checkout Integration:
// - Cart component now includes Stripe checkout functionality
// - Demo mode works without API keys (simulates payment)
// - For production: add VITE_STRIPE_PUBLISHABLE_KEY to .env.local
// - Implement backend API (see api-example.js)
// - Optionally add CheckoutSuccess component for success page

import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductImage } from './components/ProductImage';
import { ProductDetails } from './components/ProductDetails';
import { Cart } from './components/Cart';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { CarouselOverlay } from './components/CarouselOverlay';
import { Reviews } from './components/Reviews';
import { Product } from './types';
import { PRODUCT_IMAGES, getGalleryImages } from './constants/images';

const products: Product[] = [
  {
    id: 'ferrari-dxfe-001',
    name: 'Step by Step Frame',
    edition: 'DOLLAR X FERRARI EDITION',
    price: 19.99,
    imageUrl: PRODUCT_IMAGES.FERRARI_FRAME,
    description: "The ultimate conversation starter for the ambitious. This isn't just art; it's a statement. A daily reminder of the two simple steps to achieving your dreams. Encased in a premium, shadowbox frame, the 'Dollar x Ferrari' edition is a masterpiece of minimalist motivation. Step 1: The Grind. Step 2: The Reward.",
    reviews: [
      { id: 'rev1', author: 'Alex R.', rating: 5, comment: "Absolutely stunning piece. The quality is top-notch and it looks amazing on my office wall. Constant motivation!", date: '2023-10-15' },
      { id: 'rev2', author: 'Jenna M.', rating: 4, comment: "Love the concept. The frame is solid and the print is crisp. Wish it came in a larger size.", date: '2023-10-12' },
      { id: 'rev3', author: 'Carlos S.', rating: 5, comment: "Bought this as a gift for a friend who just launched a startup. He was thrilled. 10/10.", date: '2023-09-28' },
    ]
  },
  {
    id: 'lamborghini-dxle-001',
    name: 'Step by Step Frame',
    edition: 'DOLLAR X LAMBORGHINI EDITION',
    price: 19.99,
    imageUrl: PRODUCT_IMAGES.LAMBORGHINI_FRAME,
    description: "Unleash your inner bull. This piece embodies raw power and audacious goals. It's not just decor; it's a declaration of intent. A daily visualization of the path from relentless effort to untamed success. The 'Dollar x Lamborghini' edition is for those who refuse to be tamed. Step 1: The Hustle. Step 2: The Victory.",
    reviews: [
      { id: 'rev4', author: 'Mike P.', rating: 5, comment: "The Lamborghini edition is just pure aggression and I love it. The colors are vibrant and it gets noticed.", date: '2023-10-20' },
      { id: 'rev5', author: 'Sarah K.', rating: 5, comment: "Perfect for my home gym. It gets me in the zone every single day. Great quality.", date: '2023-10-18' },
    ]
  },
  {
    id: 'porsche-dxpe-001',
    name: 'Step by Step Frame',
    edition: 'DOLLAR X PORSCHE EDITION',
    price: 19.30,
    imageUrl: PRODUCT_IMAGES.PORSCHE_FRAME,
    description: "Precision engineered for success. This frame represents the pinnacle of performance and timeless design. It's more than art; it's a philosophy. A daily blueprint for turning meticulous planning into iconic achievements. The 'Dollar x Porsche' edition is a tribute to legacy builders. Step 1: The Craft. Step 2: The Legacy.",
    reviews: [
      { id: 'rev6', author: 'David L.', rating: 5, comment: "The Porsche version is so classy and understated. It fits my aesthetic perfectly. Very high-quality materials.", date: '2023-10-11' },
      { id: 'rev7', author: 'Emily T.', rating: 4, comment: "Beautiful design. The print is sharp and the frame is well-made. Shipping was a bit slow, but the product is worth it.", date: '2023-10-05' },
      { id: 'rev8', author: 'Tom H.', rating: 5, comment: "Elegant and motivational. It's the first thing I see when I start my workday.", date: '2023-09-30' },
    ]
  }
];

const galleryImages = getGalleryImages(true); // Using local images with ferrari_key.png


const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProductId, setSelectedProductId] = useState(products[0].id);
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);
  const [carouselStartIndex, setCarouselStartIndex] = useState(0);

  const currentProduct = useMemo(() => 
    products.find(p => p.id === selectedProductId)!, 
    [selectedProductId]
  );

  const [activeImageUrl, setActiveImageUrl] = useState(currentProduct.imageUrl);

  useEffect(() => {
    setActiveImageUrl(currentProduct.imageUrl);
  }, [currentProduct]);

  const handleEditionChange = useCallback((productId: string) => {
    setSelectedProductId(productId);
  }, []);

  const handleToggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);
  
  const handleOpenCarousel = useCallback((index: number) => {
    setCarouselStartIndex(index);
    setIsCarouselOpen(true);
  }, []);

  const handleGalleryImageClick = useCallback((imageUrl: string) => {
    setActiveImageUrl(imageUrl);
  }, []);
  
  const handleFullscreenRequest = useCallback(() => {
    const currentIndex = galleryImages.findIndex(img => img === activeImageUrl);
    const startIndex = currentIndex > -1 ? currentIndex : 0;
    handleOpenCarousel(startIndex);
  }, [activeImageUrl, galleryImages, handleOpenCarousel]);

  const handleCloseCarousel = useCallback(() => {
    setIsCarouselOpen(false);
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col antialiased">
      <Header onCartClick={handleToggleCart} />
      <main className="flex-grow">
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 py-8 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-start">
              <ProductImage 
                imageUrl={activeImageUrl} 
                productName={currentProduct.name}
                onFullscreenClick={handleFullscreenRequest} 
              />
              <ProductDetails
                product={currentProduct}
                products={products}
                onEditionChange={handleEditionChange}
                onAddToCart={() => showToast('Added to Cart')}
                galleryImages={galleryImages}
                activeImageUrl={activeImageUrl}
                onGalleryImageClick={handleGalleryImageClick}
              />
            </div>
          </div>
        </section>
        <section className="container mx-auto px-6 sm:px-8 lg:px-12 pb-8 md:pb-16">
          <div className="max-w-6xl mx-auto">
            <Reviews reviews={currentProduct.reviews} />
          </div>
        </section>
      </main>
      <Footer />
      <Cart isOpen={isCartOpen} onClose={handleToggleCart} />
      {toastMessage && <Toast message={toastMessage} />}
      <CarouselOverlay 
        isOpen={isCarouselOpen}
        onClose={handleCloseCarousel}
        images={galleryImages}
        startIndex={carouselStartIndex}
      />
    </div>
  );
};

export default App;