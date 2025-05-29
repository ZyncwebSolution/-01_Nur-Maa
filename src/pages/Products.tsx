
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import { Product, ProductCategory } from '@/lib/types';

// Mock products data
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Lavender Face Cream',
    category: 'skincare',
    description: 'A soothing face cream made with organic lavender essential oil and shea butter.',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601049541192-9c6235bc1ff1?auto=format&fit=crop&q=80',
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Organic Honey',
    category: 'food',
    description: 'Pure, unfiltered honey sourced from local wildflowers and herbs.',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80',
    rating: 5.0,
    featured: true,
  },
  {
    id: '3',
    name: 'Rosemary Hair Oil',
    category: 'skincare',
    description: 'Nourishing hair oil with rosemary and coconut oil for healthy, shiny hair.',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1608571423937-0c87e9f7ac5d?auto=format&fit=crop&q=80',
    rating: 4.6,
    featured: true,
  },
  {
    id: '4',
    name: 'Herbal Tea Blend',
    category: 'food',
    description: 'A calming blend of chamomile, lavender, and lemon balm for relaxation.',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80',
    rating: 4.4,
  },
  {
    id: '5',
    name: 'Aloe Vera Gel',
    category: 'skincare',
    description: 'Pure aloe vera gel for soothing and moisturizing skin.',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1570212773364-e30dd243fbf2?auto=format&fit=crop&q=80',
    rating: 4.7,
  },
  {
    id: '6',
    name: 'Organic Coconut Oil',
    category: 'food',
    description: 'Cold-pressed, unrefined coconut oil for cooking and skincare.',
    price: 11.99,
    image: 'https://images.unsplash.com/photo-1550679560-b0be71c9b9ee?auto=format&fit=crop&q=80',
    rating: 4.9,
  },
  {
    id: '7',
    name: 'Rose Water Toner',
    category: 'skincare',
    description: 'Refreshing rose water toner to balance and hydrate skin.',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1616694554151-fc6635977df9?auto=format&fit=crop&q=80',
    rating: 4.5,
  },
  {
    id: '8',
    name: 'Herb-Infused Olive Oil',
    category: 'food',
    description: 'Olive oil infused with rosemary, thyme, and garlic.',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1604935413670-72511c7d1599?auto=format&fit=crop&q=80',
    rating: 4.3,
  },
];

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | null;
    const featured = searchParams.get('featured') === 'true';
    
    if (category) {
      setActiveCategory(category);
    }
    
    let filtered = [...allProducts];
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(product => product.category === activeCategory);
    }
    
    // Apply featured filter
    if (featured) {
      filtered = filtered.filter(product => product.featured);
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply sorting
    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, activeCategory, sortOption, priceRange]);
  
  const handleCategoryChange = (category: ProductCategory | 'all') => {
    setActiveCategory(category);
  };
  
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setPriceRange([0, value]);
  };
  
  const handleQuickPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(undefined);
  };
  
  return (
    <div className="pt-24 pb-16">
      <div className="bg-nurmaa-mint py-12">
        <div className="nurmaa-container">
          <h1 className="text-4xl font-bold text-center">Our Products</h1>
          <p className="text-center mt-4 max-w-2xl mx-auto">
            Discover our range of handcrafted natural products for skin and body, made with love and the finest ingredients.
          </p>
        </div>
      </div>
      
      <div className="nurmaa-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters - Left Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    activeCategory === 'all' ? 'bg-nurmaa-green text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
                <button
                  onClick={() => handleCategoryChange('skincare')}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    activeCategory === 'skincare' ? 'bg-nurmaa-green text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  🌿 Skincare
                </button>
                <button
                  onClick={() => handleCategoryChange('food')}
                  className={`block w-full text-left px-3 py-2 rounded ${
                    activeCategory === 'food' ? 'bg-nurmaa-green text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  🍯 Food
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>${priceRange[0]}</span>
                  <span>Up to ${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Sort By</h3>
              <select
                value={sortOption}
                onChange={handleSortChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:col-span-3">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">{filteredProducts.length} products found</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id} 
                  product={product} 
                  onQuickPurchase={handleQuickPurchase}
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <svg 
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <h3 className="mt-4 text-gray-500 font-medium">No products found</h3>
                <p className="mt-2 text-gray-400 text-sm">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <QuickPurchaseModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;
