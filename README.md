<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Frame X - Premium Frame E-commerce Store

A modern, luxury e-commerce application showcasing premium frames with Ferrari, Lamborghini, and Porsche editions. Built with React, TypeScript, and featuring Stripe checkout integration.

## 🎯 Features

- **Premium Product Showcase**: Interactive product gallery with 3D tilt effects
- **Multi-Language Support**: 🇸🇰 Slovak and 🇬🇧 English with real-time switching
- **Multi-Currency Support**: EUR, USD, GBP with real-time conversion
- **Shopping Cart**: Advanced cart management with quantity controls
- **Stripe Integration**: Mockup and production-ready payment processing
- **Responsive Design**: Mobile-first, works on all devices
- **Image Management**: Organized local and external image handling
- **Modern UI**: Dark theme with Ferrari-inspired red accents
- **Translation System**: Complete localization with nested translation keys

## 🚀 Live Demo

[View Live Demo](https://your-demo-url.com) <!-- Add your deployed URL here -->

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set environment variables in [.env.local](.env.local):
   - `GEMINI_API_KEY` to your Gemini API key
   - `VITE_STRIPE_PUBLISHABLE_KEY` to your Stripe publishable key (optional for demo mode)
3. Run the app:
   `npm run dev`

## 🌐 Language Support

The application supports multiple languages with real-time switching:

- **Slovak (SK)** 🇸🇰 - Default language
- **English (EN)** 🇬🇧 - Full translation coverage

### Features:
- **Header Language Switcher**: Click the flag dropdown in the top navigation
- **Complete Translation**: All UI elements, product descriptions, and system messages
- **Nested Translation Keys**: Organized structure for easy maintenance
- **Real-time Switching**: Instant language change without page reload

### Adding New Languages:
1. Add language code to `Language` type in `context/LanguageContext.tsx`
2. Add translations to the `translations` object
3. Add flag and option to the language switcher dropdown

## Stripe Integration

The app includes Stripe checkout integration:

- **Demo Mode**: If no `VITE_STRIPE_PUBLISHABLE_KEY` is provided, the app runs in demo mode with simulated payments
- **Production**: Add your Stripe publishable key and implement the backend API (see `api-example.js`)

### Setting up Stripe for Production:

1. Get your Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
2. Add `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...` to `.env.local`
3. Implement the backend API endpoint (see `api-example.js` for reference)
4. Update the `redirectToCheckout` function in `services/stripe.ts` to use the real API

## Image Management

### Current Setup
- Images are currently served from external URLs (imgur.com)
- All image paths are centralized in `constants/images.ts`

### Using Local Images
**Main Images**: The app is configured to use local images for all main products.

1. **All main product images are local** (already configured):
   - `ferrari_key.png` ✅ (primary Ferrari product image)
   - `lamborghini_key.png` ✅ (primary Lamborghini product image)
   - `porsche-frame.png` ✅ (primary Porsche product image)

2. **Download other images**:
   ```bash
   ./scripts/download-images.sh
   ```

3. **Manual setup**: 
   - Download remaining images from the URLs in `constants/images.ts`
   - Place them in `public/images/products/` and `public/images/gallery/`

3. **Image structure**:
   ```
   public/images/
   ├── products/          # Product showcase images  
   └── gallery/           # Gallery and carousel images
   ```

See `public/images/README.md` for detailed instructions.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS (utility classes)
- **State Management**: React Context + useReducer
- **Payments**: Stripe (with mockup interface)
- **Images**: Local + External URL support
- **Build Tool**: Vite with HMR

## 📁 Project Structure

```
├── components/           # React components
│   ├── Cart.tsx         # Shopping cart sidebar
│   ├── Header.tsx       # Navigation header
│   ├── ProductDetails.tsx
│   ├── MockStripeCheckout.tsx
│   └── ...
├── constants/           # Configuration files
│   └── images.ts        # Image path management
├── context/            # React Context providers
│   ├── CartContext.tsx
│   ├── CurrencyContext.tsx
│   └── LanguageContext.tsx
├── hooks/              # Custom React hooks
├── services/           # External service integrations
├── public/images/      # Static image assets
└── scripts/            # Utility scripts
```

## 🎨 Screenshots

<!-- Add screenshots of your app here -->

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Stripe for payment processing inspiration
- Ferrari, Lamborghini, and Porsche for design inspiration
- React and TypeScript communities
