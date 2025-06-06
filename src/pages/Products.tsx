import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import { Product as BaseProduct, ProductCategory } from '@/lib/types';

// Extend Product type to include formattedPrice, ingredients, and stock
type Product = BaseProduct & { 
  formattedPrice: string;
  ingredients?: string[];
  stock: number;
};
import product2 from '@/assets/images/product2.png';
import product3 from '@/assets/images/product3.png';



// Convert prices to Indian Rupees and format with ₹ symbol
const formatPrice = (price: number) => {
  const inrPrice = price * 75; // Assuming 1 USD = 75 INR
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrPrice).replace('₹', '₹ ');
};

// Enhanced mock products data with professional Egyptian-inspired items
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Sacred Ankh Oil',
    category: 'skincare' as ProductCategory,
    description: 'A luxurious blend of ancient Egyptian oils for skin rejuvenation, inspired by Cleopatra\'s beauty secrets. Contains rare botanicals from the Nile delta.',
    price: 34.99,
    image: product2,
    rating: 4.9,
    featured: true,
    stock: 15,
    ingredients: ['Moringa oil', 'Nile lotus extract', 'Frankincense', 'Myrrh'],
    benefits: ['Anti-aging', 'Hydration', 'Skin brightening']
  },
  {
    id: '2',
    name: 'Nile Delta Honey',
    category: 'food' as ProductCategory,
    description: 'Pure honey harvested from the banks of the Nile, used by pharaohs for its healing properties. Unprocessed and raw with natural enzymes intact.',
    price: 22.99,
    image: product3,
    rating: 5.0,
    featured: true,
    stock: 8,
    ingredients: ['100% pure Nile delta honey'],
    benefits: ['Antioxidant-rich', 'Energy boosting', 'Digestive aid']
  },
  {
    id: '3',
    name: 'Eye of Horus Cream',
    category: 'skincare' as ProductCategory,
    description: 'A restorative eye cream based on ancient temple recipes, formulated to reduce puffiness and dark circles like the protective eye of Horus.',
    price: 42.50,
    image: product2,
    rating: 4.7,
    featured: false,
    stock: 12,
    ingredients: ['Aloe vera', 'Chamomile', 'Rosehip oil', 'Vitamin E'],
    benefits: ['Dark circle reduction', 'Puffiness relief', 'Fine line smoothing']
  },
  {
    id: '4',
    name: 'Pharaoh\'s Incense Set',
    category: 'wellness' as ProductCategory,
    description: 'Authentic resin incense blends used in Egyptian temples for meditation and spiritual connection. Comes with hand-carved brass holder.',
    price: 29.99,
    image: product3,
    rating: 4.8,
    featured: true,
    stock: 5,
    ingredients: ['Kyphi resin', 'Myrrh', 'Frankincense', 'Cinnamon'],
    benefits: ['Meditation aid', 'Air purification', 'Stress relief']
  },
  {
    id: '5',
    name: 'Nefertiti Hair Serum',
    category: 'skincare' as ProductCategory,
    description: 'Royal hair treatment inspired by Queen Nefertiti\'s legendary locks. Promotes growth and shine with ancient oil blends.',
    price: 38.75,
    image: product2,
    rating: 4.9,
    featured: true,
    stock: 10,
    ingredients: ['Castor oil', 'Fenugreek', 'Hibiscus', 'Amla oil'],
    benefits: ['Hair growth', 'Scalp health', 'Frizz control']
  },
  {
    id: '6',
    name: 'Sacred Papyrus Tea',
    category: 'food' as ProductCategory,
    description: 'Rare herbal tea blend made from Nile papyrus and other sacred plants used by Egyptian healers for mental clarity and digestion.',
    price: 18.99,
    image: product3,
    rating: 4.5,
    featured: false,
    stock: 20,
    ingredients: ['Papyrus', 'Mint', 'Hibiscus', 'Lemongrass'],
    benefits: ['Digestive aid', 'Mental focus', 'Relaxation']
  },
  {
    id: '7',
    name: 'Golden Sand Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Exfoliating body scrub with fine golden sand from the Red Sea and nourishing oils used by ancient Egyptian beauties.',
    price: 32.00,
    image: product2,
    rating: 4.6,
    featured: true,
    stock: 7,
    ingredients: ['Red Sea sand', 'Jojoba oil', 'Orange blossom', 'Honey'],
    benefits: ['Exfoliation', 'Skin softening', 'Improved circulation']
  },
  {
    id: '8',
    name: 'Osiris Body Oil',
    category: 'skincare' as ProductCategory,
    description: 'Ritual anointing oil blend said to be used in the resurrection myth of Osiris. Deeply nourishing for dry skin.',
    price: 45.99,
    image: product3,
    rating: 4.8,
    featured: true,
    stock: 9,
    ingredients: ['Sesame oil', 'Cedarwood', 'Palm oil', 'Lotus extract'],
    benefits: ['Deep hydration', 'Aromatherapy', 'Skin repair']
  }
].map(product => ({
  ...product,
  formattedPrice: formatPrice(product.price)
}));

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  
  // Filter and sort products
  useEffect(() => {
    const category = searchParams.get('category') as ProductCategory | null;
    const featured = searchParams.get('featured') === 'true';
    
    if (category) setActiveCategory(category);
    
    let filtered = [...allProducts];
    
    // Apply filters
    filtered = filtered.filter(product => {
      const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
      const matchesFeatured = !featured || product.featured;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesFeatured && matchesPrice && matchesSearch;
    });
    
    // Apply sorting
    if (sortOption === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    
    setFilteredProducts(filtered);
  }, [searchParams, activeCategory, sortOption, priceRange, searchQuery]);
  
  // Interactive elements
  const handleQuickPurchase = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setPriceRange([0, 50]);
    setSearchQuery('');
    setSortOption('');
  };

  // Categories with symbols
  const categories = [
    { id: 'all', name: 'All Products', symbol: '𓃭' },
    { id: 'skincare', name: 'Skincare', symbol: '𓍯' },
    { id: 'food', name: 'Food & Herbs', symbol: '𓇬' },
    { id: 'wellness', name: 'Wellness', symbol: '𓂀' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9f0]">
      {/* Animated Hero Section */}
      <div 
        className="pt-32 pb-20 relative text-white bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 23, 105, 0.85), rgba(103, 36, 106, 0.85)), url("https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="container mx-auto px-6 text-center animate-fade-in">
          <h1 className="text-5xl font-bold mb-6 font-serif text-[#FE49AF] drop-shadow-lg">
            Ancient Egyptian Treasures
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-[#EBEBD3]">
            Discover authentic products inspired by the beauty secrets and sacred rituals of ancient Egypt.
          </p>
          
          {/* Interactive Search Bar */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Search for sacred oils, herbs, artifacts..."
              className="w-full py-3 px-6 rounded-full text-[#121769] focus:outline-none focus:ring-2 focus:ring-[#FE49AF] shadow-lg transition-all duration-300 hover:shadow-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FE49AF] text-white p-2 rounded-full hover:bg-[#67246A] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Interactive Filters - Left Sidebar */}
          <div className="md:col-span-1 space-y-8 sticky top-4 h-min">
            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-[#EBEBD3]">
              <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id as ProductCategory | 'all')}
                    className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-[#67246A] text-white shadow-inner' 
                        : 'text-[#121769] hover:bg-[#EBEBD3] hover:text-[#67246A]'
                    }`}
                  >
                    <span className="text-xl mr-2">{cat.symbol}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Price Range */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-[#EBEBD3]">
              <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">
                Price Range
              </h3>
              <div className="px-2">
                <div className="mb-2 flex justify-between text-[#121769]">
                  <span className="text-sm">₹ {priceRange[0] * 75}</span>
                  <span className="text-sm">₹ {priceRange[1] * 75}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                  className="w-full h-2 bg-[#EBEBD3] rounded-lg appearance-none cursor-pointer accent-[#FE49AF]"
                />
              </div>
            </div>
            
            {/* Sort Options */}
            <div className="bg-white p-6 rounded-lg shadow-lg border border-[#EBEBD3]">
              <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">
                Sort By
              </h3>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full px-4 py-3 border border-[#EBEBD3] rounded-lg focus:ring-2 focus:ring-[#FE49AF] focus:border-transparent text-[#121769]"
              >
                <option value="">Default</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Highest Rating</option>
              </select>
            </div>
            
            {/* Sacred Symbols - Interactive */}
            {/* <div className="bg-white p-6 rounded-lg shadow-lg border border-[#EBEBD3]">
              <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">
                Sacred Symbols
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['𓃭', '𓍯', '𓇬', '𓃀', '𓆣', '𓂀'].map((symbol) => (
                  <button 
                    key={symbol}
                    className={`text-2xl p-3 rounded-lg transition-all ${
                      hoveredSymbol === symbol 
                        ? 'bg-[#FE49AF] text-white transform scale-110 shadow-md' 
                        : 'bg-[#EBEBD3] text-[#67246A] hover:bg-[#67246A] hover:text-white'
                    }`}
                    onMouseEnter={() => setHoveredSymbol(symbol)}
                    onMouseLeave={() => setHoveredSymbol(null)}
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div> */}
          </div>
          
          {/* Product Display Area */}
          <div className="md:col-span-3">
            {/* Results Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121769] p-4 rounded-lg shadow-lg">
              <p className="text-[#EBEBD3]">
                Showing <span className="font-bold text-[#FE49AF]">{filteredProducts.length}</span> sacred {filteredProducts.length === 1 ? 'artifact' : 'artifacts'}
              </p>
              
              <div className="flex items-center space-x-2 bg-[#67246A] p-2 rounded-lg">
                <span className="text-[#EBEBD3] hidden sm:inline">View:</span>
                <button 
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    activeView === 'list' 
                      ? 'bg-[#FE49AF] text-white' 
                      : 'bg-[#EBEBD3] text-[#67246A] hover:bg-[#FE49AF] hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    activeView === 'grid' 
                      ? 'bg-[#FE49AF] text-white' 
                      : 'bg-[#EBEBD3] text-[#67246A] hover:bg-[#FE49AF] hover:text-white'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Products Grid/List */}
            {filteredProducts.length > 0 ? (
              activeView === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id} 
                      product={product} 
                      onQuickPurchase={handleQuickPurchase}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white p-6 rounded-lg shadow-md border border-[#EBEBD3] hover:shadow-lg transition-shadow flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-1/3 h-48 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xl font-bold text-[#121769]">{product.name}</h3>
                          <span className="text-[#FE49AF] font-bold">{product.formattedPrice}</span>
                        </div>
                        <p className="text-[#67246A] mt-2">{product.description}</p>
                        
                        {/* Ingredients and Benefits */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {(product.ingredients || []).slice(0, 3).map(ingredient => (
                            <span key={ingredient} className="px-2 py-1 bg-[#EBEBD3] text-[#67246A] text-xs rounded">
                              {ingredient}
                            </span>
                          ))}
                        </div>
                        
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="text-[#67246A]">{product.rating}</span>
                            <span className="ml-4 px-2 py-1 bg-[#EBEBD3] text-[#67246A] text-xs rounded">
                              {product.stock} in stock
                            </span>
                          </div>
                          <button 
                            onClick={() => handleQuickPurchase(product)}
                            className="px-4 py-2 bg-[#67246A] text-white rounded-lg hover:bg-[#121769] transition-colors"
                          >
                            Quick Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="text-center py-16 bg-white rounded-lg shadow-lg border border-[#EBEBD3]">
                <div className="mx-auto h-24 w-24 text-[#FE49AF] mb-6 animate-bounce">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-[#121769] mb-2">No sacred artifacts found</h3>
                <p className="text-[#67246A] max-w-md mx-auto">
                  The sands have shifted and hidden what you seek. Try different filters.
                </p>
                <button 
                  onClick={resetFilters}
                  className="mt-6 px-6 py-2 bg-[#FE49AF] text-white rounded-lg hover:bg-[#67246A] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <QuickPurchaseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        product={selectedProduct}
      />
    </div>
  );
};

export default Products;