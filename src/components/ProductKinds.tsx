import React from 'react';
import '@/assets/css/productkind.css';
import skincare from '@/assets/images/skincare.png';
import food from '@/assets/images/food.png';
import makeup from '@/assets/images/makeup.png';
import skincareBg from '@/assets/images/bg2.png';
import foodBg from '@/assets/images/bg3.png';
import makeupBg from '@/assets/images/fg3.png';

const ProductSlider = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const productCategories = [
  
    { 
      activeSlide,
      name: "Organic Superfood Blend", 
      category: "Food",
      description: "Boost energy, digestion, and immunity with our daily wellness superfood made from 100% organic ingredients.",
      bgImage: foodBg,
      mainImage: food,
      fgImage: foodBg
    },
      {
      name: "Glow Serum with Hyaluronic Acid", 
      category: "Skincare",
      description: "Deeply hydrate and brighten your skin with our Vitamin C-infused serum for a smooth, radiant glow.",
      bgImage: skincareBg,
      mainImage: skincare,
      fgImage: skincareBg
    },
    { 
      name: "Long-Lasting Matte Lipstick", 
      category: "Makeup",
      description: "Experience rich, bold color with our smudge-proof lipstick—infused with nourishing natural oils for comfort and care.",
      bgImage: makeupBg,
      mainImage: makeup,
      fgImage: makeupBg
    }
  ];

  return (
    <div className="slider-wrapper" style={{ background: 'linear-gradient(135deg, #EBEBD3 0%, #ffffff 100%)' }}>
      <div className="slider-container">
        <div className="slider-header-wrapper">
          <h1 className="slider-header">Natural Wellness Essentials for Health & Beauty</h1>
          <p className="slider-subheader">Discover clean, cruelty-free essentials—from organic skincare and superfoods to long-lasting natural makeup—designed for conscious, radiant living.</p>
        </div>

        <div className="slider static-display">
          {productCategories.map((product, index) => (
            <div className="product-container" key={index}>
              <div className={`product-card ${product.category.toLowerCase()}`}>
                <div className="product-image-wrapper">
                  <div className="product-bg-image" style={{ backgroundImage: `url(${product.bgImage})` }}></div>
                  <div className="product-main-image" style={{ backgroundImage: `url(${product.mainImage})` }}></div>
                  <div className="product-fg-image" style={{ backgroundImage: `url(${product.fgImage})` }}></div>
                </div>
                <div className="product-info" style={{ opacity: 1, transform: 'none' }}>
                  <span className="product-category">{product.category}</span>
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