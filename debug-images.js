// Debug script to check image paths
import { getGalleryImages, LOCAL_GALLERY_IMAGES, PRODUCT_IMAGES } from './constants/images.js';

console.log('Gallery Images (local):', getGalleryImages(true));
console.log('Gallery Images (remote):', getGalleryImages(false));
console.log('LOCAL_GALLERY_IMAGES:', LOCAL_GALLERY_IMAGES);
console.log('PRODUCT_IMAGES:', PRODUCT_IMAGES);
