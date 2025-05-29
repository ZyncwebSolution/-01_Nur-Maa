import React from 'react';
import '@/assets/css/productkind.css';
import bottle1 from '@/assets/images/—Pngtree—blue perfume glass bottle elegant_20856067.png';
import bg1 from '@/assets/images/—Pngtree—a blue color flower_15701496.png';
import product2 from '@/assets/images/product2.png';
import bg2 from '@/assets/images/bg2.png';
import product3 from '@/assets/images/product3.png';
import bg3 from '@/assets/images/bg3.png';
import fg3 from '@/assets/images/fg3.png';

const ProductSlider = () => {
  const products = [
    { 
      name: "Midnight Bloom", 
      description: "Infused with rare botanicals",
      bgImage: bg1,
      mainImage: bottle1,
      fgImage: bg1
    },
    { 
      name: "Ocean Mist", 
      description: "Crafted with coastal herbs",
      bgImage: bg3,
      mainImage: product3,
      fgImage: fg3
    },
    { 
      name: "Royal Reserve", 
      description: "Aged in oak barrels",
      bgImage: bg2,
      mainImage: product2,
      fgImage: bg2
    }
  ];

  return (
    <div className="slider-wrapper">
      <div className="slider-container">
        <div className="slider-header-wrapper">
          <h1 className="slider-header">Premium Collection</h1>
          <p className="slider-subheader">Crafted with precision, enjoyed with passion</p>
        </div>

        <div className="slider static-display">
          {products.map((product, index) => (
            <div className="product-container" key={index}>
              <div className={`product-card ${product.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <div className="product-image-wrapper">
                  <div className="product-bg-image" style={{ backgroundImage: `url(${product.bgImage})` }}></div>
                  <div className="product-main-image" style={{ backgroundImage: `url(${product.mainImage})` }}></div>
                  <div className="product-fg-image" style={{ backgroundImage: `url(${product.fgImage})` }}></div>
                </div>
                <div className="product-info" style={{ opacity: 1, transform: 'none' }}>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
