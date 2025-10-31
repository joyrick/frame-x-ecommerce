import React from 'react';

export const ImageTest: React.FC = () => {
  const testImages = [
    '/images/products/ferrari_key.png',
    '/images/products/lamborghini_key.png', 
    '/images/products/porsche-frame.png'
  ];

  return (
    <div style={{ padding: '20px', backgroundColor: 'white', color: 'black' }}>
      <h2>Image Loading Test</h2>
      {testImages.map((src, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h3>Image {index + 1}: {src}</h3>
          <img 
            src={src} 
            alt={`Test image ${index + 1}`}
            style={{ 
              width: '200px', 
              height: '200px', 
              objectFit: 'cover', 
              border: '2px solid #ccc' 
            }}
            onLoad={() => console.log(`Image ${index + 1} loaded successfully: ${src}`)}
            onError={(e) => {
              console.error(`Image ${index + 1} failed to load: ${src}`, e);
              (e.target as HTMLImageElement).style.backgroundColor = '#ffcccc';
            }}
          />
        </div>
      ))}
    </div>
  );
};
