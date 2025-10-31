import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'sk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sk: {
    // Header
    header: {
      about: 'O nás',
      terms: 'Obchodné podmienky',
      contact: 'Kontakty',
      wholesale: 'Veľkoobchodný predaj',
      login: 'Prihlásenie',
      cart: 'Košík'
    },
    
    // Product
    product: {
      name: 'Step by Step Rámček',
      ferrari: {
        edition: 'DOLLAR X FERRARI EDÍCIA',
        description: 'Ultimátny spúšťač konverzácie pre ambicióznych. Denná pripomienka dvoch jednoduchých krokov k dosiahnutiu vašich snov. Kľúč od Vášho vysnívaného Ferrari uzavretý v prémiovom rámčeku.'
      },
      lamborghini: {
        edition: 'DOLLAR X LAMBORGHINI EDÍCIA',
        description: 'Najprv práca, potom jazda. Tento kus stelesňuje surovú silu a odvážne ciele pre milovníkov značky Lamborghini. Krok 1: Práca. Krok 2: Víťazstvo.'
      },
      porsche: {
        edition: 'DOLLAR X PORSCHE EDÍCIA',
        description: 'Presne navrhnuté pre úspech. Tento rámček predstavuje vrchol výkonu a nadčasového dizajnu. Je viac ako umenie; je to filozofia. Denný plán na premenu dôkladného plánovania na ikonické úspechy. Pre milovníkov prémiovej značky Porsche. Krok 1: Práca Krok 2: Dedičstvo.'
      },
      selectEdition: 'Vyberte edíciu',
      gallery: 'Galéria - Kliknite pre prepnutie edície',
      specialPrice: 'Špeciálna cena!',
      addToCart: 'Pridať do košíka',
      quantity: 'Množstvo',
      decrease: 'Znížiť množstvo',
      increase: 'Zvýšiť množstvo'
    },
    
    // Cart
    cart: {
      title: 'Váš košík',
      empty: 'Váš košík je prázdny.',
      subtotal: 'Medzisúčet',
      checkout: 'Pokladňa so Stripe',
      added: 'Pridané do košíka'
    },
    
    // Reviews
    reviews: {
      title: 'Zákaznícke hodnotenia',
      basedOn: 'Na základe {count} hodnotení'
    },
    
    // Footer
    footer: {
      rights: 'Všetky práva vyhradené.',
      information: 'Informácie',
      products: 'Produkty',
      support: 'Podpora',
      followUs: 'Sledujte nás',
      about: 'O nás',
      terms: 'Obchodné podmienky',
      contact: 'Kontakty',
      wholesale: 'Veľkoobchodný predaj',
      moneyEnvelopes: 'Obálky na peniaze',
      drinkingSets: 'Pijanské sety',
      honeyBottles: 'Medovinky',
      emergencyGlass: 'V prípade potreby rozbiť sklo',
      cuttingBoards: 'Dosky na krájanie',
      bottleBoxes: 'Krabice na fľaše',
      faq: 'Často kladené otázky',
      shipping: 'Doprava a doručenie',
      returns: 'Vrátenie tovaru',
      address: 'Adresa',
      pickupLocation: 'Výdajné miesto:'
    },
    
    // Stripe Checkout
    stripe: {
      title: 'Stripe Pokladňa',
      paymentDetails: 'Platobné údaje',
      email: 'E-mail',
      cardNumber: 'Číslo karty',
      expiryDate: 'Dátum expirácie',
      cvc: 'CVC',
      cardholderName: 'Meno držiteľa karty',
      billingAddress: 'Fakturačná adresa',
      address: 'Adresa',
      city: 'Mesto',
      zip: 'PSČ',
      orderSummary: 'Súhrn objednávky',
      tax: 'Daň (DPH 21%)',
      total: 'Celkom',
      pay: 'Zaplatiť',
      secured: '🔒 Zabezpečené Stripe',
      encrypted: 'Vaše platobné informácie sú šifrované a bezpečné',
      processing: 'Spracovávanie platby...',
      doNotClose: 'Nezatvárajte toto okno',
      success: 'Platba úspešná!',
      confirmed: 'Vaša objednávka bola potvrdená'
    }
  },
  en: {
    // Header
    header: {
      about: 'About Us',
      terms: 'Terms & Conditions',
      contact: 'Contact',
      wholesale: 'Wholesale',
      login: 'Login',
      cart: 'Cart'
    },
    
    // Product
    product: {
      name: 'Step by Step Frame',
      ferrari: {
        edition: 'DOLLAR X FERRARI EDITION',
        description: 'The ultimate conversation starter for the ambitious. This isn\'t just art; it\'s a statement. A daily reminder of the two simple steps to achieving your dreams. Encased in a premium, shadowbox frame, the \'Dollar x Ferrari\' edition is a masterpiece of minimalist motivation. Step 1: The Grind. Step 2: The Reward.'
      },
      lamborghini: {
        edition: 'DOLLAR X LAMBORGHINI EDITION',
        description: 'Unleash your inner bull. This piece embodies raw power and audacious goals. It\'s not just decor; it\'s a declaration of intent. A daily visualization of the path from relentless effort to untamed success. The \'Dollar x Lamborghini\' edition is for those who refuse to be tamed. Step 1: The Hustle. Step 2: The Victory.'
      },
      porsche: {
        edition: 'DOLLAR X PORSCHE EDITION',
        description: 'Precision engineered for success. This frame represents the pinnacle of performance and timeless design. It\'s more than art; it\'s a philosophy. A daily blueprint for turning meticulous planning into iconic achievements. The \'Dollar x Porsche\' edition is a tribute to legacy builders. Step 1: The Craft. Step 2: The Legacy.'
      },
      selectEdition: 'Select Edition',
      gallery: 'Gallery - Click to switch edition',
      specialPrice: 'Special Price!',
      addToCart: 'Add to Cart',
      quantity: 'Quantity',
      decrease: 'Decrease quantity',
      increase: 'Increase quantity'
    },
    
    // Cart
    cart: {
      title: 'Your Cart',
      empty: 'Your cart is empty.',
      subtotal: 'Subtotal',
      checkout: 'Checkout with Stripe',
      added: 'Added to Cart'
    },
    
    // Reviews
    reviews: {
      title: 'Customer Reviews',
      basedOn: 'Based on {count} reviews'
    },
    
    // Footer
    footer: {
      rights: 'All rights reserved.',
      information: 'Information',
      products: 'Products',
      support: 'Support',
      followUs: 'Follow Us',
      about: 'About Us',
      terms: 'Terms & Conditions',
      contact: 'Contact',
      wholesale: 'Wholesale',
      moneyEnvelopes: 'Money Envelopes',
      drinkingSets: 'Drinking Sets',
      honeyBottles: 'Honey Bottles',
      emergencyGlass: 'In Case of Emergency Break Glass',
      cuttingBoards: 'Cutting Boards',
      bottleBoxes: 'Bottle Boxes',
      faq: 'FAQ',
      shipping: 'Shipping & Delivery',
      returns: 'Returns',
      address: 'Address',
      pickupLocation: 'Pickup Location:'
    },
    
    // Stripe Checkout
    stripe: {
      title: 'Stripe Checkout',
      paymentDetails: 'Payment details',
      email: 'Email',
      cardNumber: 'Card number',
      expiryDate: 'Expiry date',
      cvc: 'CVC',
      cardholderName: 'Cardholder name',
      billingAddress: 'Billing address',
      address: 'Address',
      city: 'City',
      zip: 'ZIP',
      orderSummary: 'Order summary',
      tax: 'Tax (VAT 21%)',
      total: 'Total',
      pay: 'Pay',
      secured: '🔒 Secured by Stripe',
      encrypted: 'Your payment information is encrypted and secure',
      processing: 'Processing your payment...',
      doNotClose: 'Please don\'t close this window',
      success: 'Payment successful!',
      confirmed: 'Your order has been confirmed'
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('sk'); // Default to Slovak

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
