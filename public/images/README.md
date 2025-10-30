# Images Directory

This directory contains the image assets for the Frame X e-commerce site.

## Structure

```
public/images/
├── products/          # Product showcase images
│   ├── ferrari-frame.jpg
│   ├── lamborghini-frame.png
│   └── porsche-frame.png
└── gallery/           # Gallery and carousel images
    ├── ferrari.jpg
    ├── lamborghini.png
    ├── porsche.png
    └── detail-shot.jpg
```

## Current Status

The application currently uses external image URLs from imgur.com. To use local images:

1. **Main Product Images** (local files):
   - Ferrari Frame: `ferrari_key.png`
   - Lamborghini Frame: `lamborghini_key.png`
   - Porsche Frame: `porsche-frame.png`
   
   **Additional Images** (download from these URLs):
   - Detail Shot: https://i.imgur.com/1Bw1bXj.jpeg

2. **Main products use local images** (already configured):
   - `products/ferrari_key.png` ✅
   - `products/lamborghini_key.png` ✅
   - `products/porsche-frame.png` ✅
   
   **Additional files to add**:
   - `gallery/detail-shot.jpg` (download from URL above)

3. **Code is already updated** to use local images with `ferrari_key.png` as the main image.

4. **Update individual product images** if needed by modifying the `constants/images.ts` file.

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 800x1000px for product images (4:5 aspect ratio)
- **Quality**: High resolution for sharp display on retina screens
- **Optimization**: Consider compressing images for web to improve loading times

## Notes

- Images in the `public/` directory are served directly by Vite
- Image paths should start with `/images/` (not `/public/images/`)
- The `constants/images.ts` file centralizes all image path management
