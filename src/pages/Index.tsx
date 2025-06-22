import React, { useState } from 'react';
import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhyNurmaa from '@/components/WhyNurmaa';
import Testimonials from '@/components/Testimonials';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import BrisbaneGinSlider from '../components/ProductKinds';

import { Product } from '@/lib/types';

const Index: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  const handleQuickPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };
  
  return (
    <>
      <Hero />
       <BrisbaneGinSlider />
      <FeaturedProducts onQuickPurchase={handleQuickPurchase} />
      <WhyNurmaa />
      <Testimonials />
     
      
      <QuickPurchaseModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct}
      />
    </>
  );
};

export default Index;