import React from 'react';

const FooterLink: React.FC<{ href: string; children: React.ReactNode; className?: string }> = ({ href, children, className = '' }) => (
  <li>
    <a href={href} className={`text-gray-400 hover:text-white transition-colors duration-200 ${className}`}>
      {children}
    </a>
  </li>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black/50 border-t border-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Informácie */}
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Informácie</h3>
            <ul className="space-y-3">
              <FooterLink href="#">O nás</FooterLink>
              <FooterLink href="#">Obchodné podmienky</FooterLink>
              <FooterLink href="#">Kontakty</FooterLink>
              <FooterLink href="#" className="text-ferrari-red hover:text-red-400 font-semibold">Veľkoobchodný predaj</FooterLink>
            </ul>
          </div>

          {/* Produkty */}
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Produkty</h3>
            <ul className="space-y-3">
              <FooterLink href="#">Obálky na peniaze</FooterLink>
              <FooterLink href="#">Pijanské sety</FooterLink>
              <FooterLink href="#">Medovinky</FooterLink>
              <FooterLink href="#">V prípade potreby rozbiť sklo</FooterLink>
              <FooterLink href="#">Dosky na krájanie</FooterLink>
              <FooterLink href="#">Krabice na fľaše</FooterLink>
            </ul>
          </div>

          {/* Adresa */}
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Adresa</h3>
            <div className="text-gray-400 space-y-1">
              <p>IČO: 34689427</p>
              <p>DIČ: 1026215124</p>
              <p className="font-semibold text-gray-300 mt-3">Výdajné miesto:</p>
              <p>Hontianska cesta č 83</p>
              <p>93601 Šahy</p>
              <p>Slovensko</p>
            </div>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-lg font-bold text-white uppercase tracking-wider mb-4">Kontakt</h3>
            <div className="text-gray-400 space-y-3">
              <p className="font-semibold text-white">Štefan Lacko</p>
              <a href="tel:0905486452" className="block text-xl font-bold text-ferrari-red hover:text-red-400 transition-colors">
                0905 486 452
              </a>
              <p>9:00 - 18:00</p>
              <a href="mailto:info@humornedarceky.sk" className="flex items-center hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                info@humornedarceky.sk
              </a>
              <div className="flex space-x-4 pt-2">
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.947s-.014-3.667-.072-4.947c-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Frame X. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
