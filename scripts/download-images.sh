#!/bin/bash

# Script to download product images from external URLs
# Run this script from the project root directory

echo "📥 Downloading Frame X product images..."

# Create directories if they don't exist
mkdir -p public/images/products
mkdir -p public/images/gallery

# Download product images
echo "⬇️  Downloading Ferrari frame..."
# Note: Replace this URL with the actual ferrari_key.png source when available
curl -L "https://i.imgur.com/uN22Q98.jpeg" -o "public/images/products/ferrari_key.png"

echo "⬇️  Downloading Lamborghini frame..."
# Note: Replace this URL with the actual lamborghini_key.png source when available
curl -L "https://i.imgur.com/b3l04rW.png" -o "public/images/products/lamborghini_key.png"

echo "✅ Using local Porsche frame (porsche-frame.png already added)"
# No need to download - using local porsche-frame.png

# Download gallery images (using same ferrari_key.png for gallery)
echo "⬇️  Downloading gallery images..."
# Copy the main Ferrari image to gallery (or download from different source if needed)
cp "public/images/products/ferrari_key.png" "public/images/gallery/ferrari.png"
# Copy the main Lamborghini image to gallery (or download from different source if needed)
cp "public/images/products/lamborghini_key.png" "public/images/gallery/lamborghini.png"
# Copy the main Porsche image to gallery (or use the existing local file)
cp "public/images/products/porsche-frame.png" "public/images/gallery/porsche.png"
curl -L "https://i.imgur.com/1Bw1bXj.jpeg" -o "public/images/gallery/detail-shot.jpg"

echo "✅ All images downloaded successfully!"
echo "🔄 To use local images, update App.tsx:"
echo "   const galleryImages = getGalleryImages(true);"
echo ""
echo "📁 Images saved to:"
echo "   - public/images/products/"
echo "   - public/images/gallery/"
