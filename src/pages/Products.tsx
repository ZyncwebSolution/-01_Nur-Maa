import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import { Product as BaseProduct, ProductCategory } from '@/lib/types';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import product2 from '@/assets/images/product2.png';
import product3 from '@/assets/images/product3.png';
import { GridIcon, ListIcon } from 'lucide-react';

type Product = BaseProduct & { 
  formattedPrice: string;
  ingredients?: string[];
  stock: number;
};

// Format price with ₹ symbol
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
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
    ingredients: ['Rolled Oats', 'Almonds', 'Flax Seeds', 'Sunflower Seeds','Pumpkin Seeds','Cold-Pressed Coconut Oil','Jaggery'],
    benefits: ['Heart-Healthy Ingredients ', 'Natural Sweetener', 'Fiber-Rich Oats','Protein-Packed','Immunity Boosting','Weight-Friendly'],
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
     ingredients: ['100% Sprouted Ragi (Finger Millet)','Salt'],
    benefits: ['Bone Strength', 'Improved Digestion', 'Diabetic-Friendly','Weight Management','Rich in Iron','Gluten-Free','Plant-Based Protein'],
   
  },
  {
    id: '3',
    name: 'Eye of Horus Cream',
    category: 'skincare' as ProductCategory,
    description: 'A restorative eye cream based on ancient temple recipes, formulated to reduce puffiness and dark circles like the protective eye of Horus.',
    price: 42.50,
    // image: product4,
    rating: 4.7,
    featured: false,
    stock: 12,
     ingredients: ['Arrowroot Powder ', 'Manjistha Powder','Charcoal Powder','Liquorice Powder'],
    benefits: ['Gentle on Skin', 'Natural Tint & Soft Texture', 'Detoxifying & Healing','Anti-Aging Properties','Chemical-Free Beauty '],
    
  },
  {
    id: '4',
    name: 'Pharaoh\'s Incense Set',
    category: 'wellness' as ProductCategory,
    description: 'Authentic resin incense blends used in Egyptian temples for meditation and spiritual connection. Comes with hand-carved brass holder.',
    price: 29.99,
    // image: product5,
    rating: 4.8,
    featured: true,
    stock: 5,
    ingredients: ['Mango Butter', 'Sugar','Almond Oil','Lavender Oil'],
    benefits: ['Exfoliates Dead Skin', 'Deeply Moisturizing', 'Soothing Aroma','Smooth Base for Lipstick']
  },
  {
    id: '5',
    name: 'Nefertiti Hair Serum',
    category: 'skincare' as ProductCategory,
    description: 'Royal hair treatment inspired by Queen Nefertiti\'s legendary locks. Promotes growth and shine with ancient oil blends.',
    price: 38.75,
    // image: product6,
    rating: 4.9,
    featured: true,
    stock: 10,
    ingredients: ['Pearl Millet (Kambu)', 'Cardamom', 'Salt'],
    benefits: ['High in Iron & Calcium ', 'Gut-Friendly Grain', 'Helps Control Diabetes','Heart Health Support','Naturally Gluten-Free','Light & Cooling']
  },
  {
    id: '6',
    name: 'Sacred Papyrus Tea',
    category: 'food' as ProductCategory,
    description: 'Rare herbal tea blend made from Nile papyrus and other sacred plants used by Egyptian healers for mental clarity and digestion.',
    price: 18.99,
    // image: product7,
    rating: 4.5,
    featured: false,
    stock: 20,
      ingredients: ['Karuppu Kavuni Rice (Black Rice)', 'Sivapu Kauvini Rice (Red Rice) ', 'poongar arisi', 'katuyanam','karunkuruvi arisi','mapalai samba'],
    benefits: ['Rich in Antioxidants ', 'Supports Heart Health', 'Diabetic-Friendly','Improves Digestion','Iron-Rich','Weight Management ','Gluten-Free']
  },
  {
    id: '7',
    name: 'Golden Sand Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Exfoliating body scrub with fine golden sand from the Red Sea and nourishing oils used by ancient Egyptian beauties.',
    price: 32.00,
    // image: product8,
    rating: 4.6,
    featured: true,
    stock: 7,
    ingredients: ['Ceramide', 'Cetyl Alcohol','Stearic Acid','Aqua','Emulsifying Wax','Shea Butter','Propylene Glycol'],
    benefits: ['Rebuilds Skin Barrier – Restores moisture and smoothness', 'Calms Sensitivity – Reduces irritation and inflammation', 'Rich but Lightweight – Hydrates without clogging pores','Dermatologist-Recommended Actives ']
  },
  {
    id: '16',
    name: 'Herbal Hair Oil',
    category: 'skincare' as ProductCategory,
    description: 'Each bottle is infused with coconut oil, sesame oil, almond oil,olive oil, and a powerful combination of traditional herbs like amla, neem, hibiscus, curry leaves, aloe vera, and more—steeped slowly to extract their full benefits.This potent oil helps control hair fall, moisturize the scalp, and reduce body heat,',
    price: 350, // Direct INR price
    image: 'https://i.etsystatic.com/20646311/r/il/5df4e6/2102154302/il_794xN.2102154302_qxhq.jpg',
    rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil, Almond Oil,Olive Oil', 'Herbs:Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Essentials:Lavender Oil, Tea Tree Oil'],
    benefits: ['Prevents Hair Fall', 'Deep Scalp Moisturization', 'Reduces Body Heat','Promotes Hair Growth','Chemical-Free & Natural']
  },
  {
    id: '9',
    name: 'Ragi Choco Pancake Mix',
    category: 'food' as ProductCategory,
    description: 'Turn breakfast into a delicious treat with nutrition-packed pancakes.Ragi Choco Pancake – Where taste meets health in every bite.',
    price: 185, // Direct INR price
    image: 'https://m.media-amazon.com/images/I/51FF4izWZgL._SL1000_.jpg',
    rating: 4.8,
    featured: true,
    stock: 9,
    ingredients: ['Ragi (Finger Millet)', 'Peanut', 'Flax Seed','Jaggery','Cocoa Powder','Baking Powder','Baking Soda','Salt'],
    benefits: ['Rich in Calcium & Iron ', 'Brain-Boosting Cocoa ', 'Omega-3 from Flax Seeds','Good Fats & Protein','No Refined Sugar','Kid-Friendly & Tasty ']
  },
  {
    id: '10',
    name: 'Butterfly Lemongrass Tea',
    category: 'food' as ProductCategory,
    description: ' Add a few drops of lemon, and watch the tea magically turn purple—an herbal experience thats as delightful to see as it is to sip!',
    price: 180, // Direct INR price
    image: 'https://rukminim2.flixcart.com/image/612/612/xif0q/tea/a/k/s/25-butterfly-pea-lemongrass-herbal-tea-good-for-hair-skin-original-imah29wwhzhvzysf.jpeg?q=70',
    rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Dried Butterfly Pea Flowers', 'Dried Lemongrass'],
    benefits: ['Rich in Antioxidants', 'Calming & Stress-Relieving ', 'Aids Digestion','Natural Detox','Good for Eyes & Hair','Caffeine-Free']
  },
  {
    id: '8',
    name: 'Osiris Body Oil',
    category: 'skincare' as ProductCategory,
    description: 'Ritual anointing oil blend said to be used in the resurrection myth of Osiris. Deeply nourishing for dry skin.',
    price: 45.99,
    // image: product4,
    rating: 4.8,
    featured: true,
    stock: 9,
      ingredients: ['Horse Gram', 'Urad Dal', 'Fenugreek Seeds'],
    benefits: ['Boosts Metabolism', 'Supports Weight Loss', 'Rich in Iron & Protein','Heart-Healthy','Diabetic-Friendly','Improves Gut Health']
  },
   { id: '19',
    name: 'Natural Hair Colour Powder',
    category: 'skincare' as ProductCategory,
    description: 'Kollu idly ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam',
    price: 250, // Direct INR price
    image: 'https://i.pinimg.com/736x/03/f0/3c/03f03c3e680efb93e48a0b6710093eec.jpg',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Henna Powder', 'Kadukkai (Haritaki)','Karisilai (False Daisy)','Neem Leaves'],
    benefits: ['Natural Color Enhancement', 'Scalp Nourishment', 'Strengthens Hair Roots','No Harsh Chemicals','Cooling & Detoxifying']
  },
   { id: '11',
    name: 'Rose Herbal Tea',
    category: 'skincare' as ProductCategory,
    description: 'Kollu idly ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam',
    price: 150, // Direct INR price
    
    image: 'https://www.udyantea.com/cdn/shop/files/Untitleddesign_580x.png?v=1714560386',
    rating: 4.8,
    featured: true,
    stock: 9, 
     ingredients: ['Dried Rose Petals', 'Hibiscus','Cloves','Cinnamon','Cardamom'],
    benefits: ['Promotes Glowing Skin –', 'Reduces Stress & Anxiety', 'Supports Digestion ','Boosts Immunity','Hormonal Balance','Caffeine-Free']
  },
   { id: '12',
    name: 'Panakatti Kappai',
    category: 'skincare' as ProductCategory,
    description: 'Perfect for all age groups, this herbal preparation can be crushed and added to warm water, tea, or simply chewed in small amounts for instant relief and warmth.',
    price: 140, // Direct INR price
    image: 'https://tse1.mm.bing.net/th?id=OIP.xMCoWMD0adaOp58T1L-m7AAAAA&pid=Api&P=0&h=180',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Palm Jaggery (Panakatti)', 'Dry Ginger','Cardamom'],
    benefits: ['Natural Cough Suppressant', 'Boosts Immunity', 'Supports Digestion','Iron-Rich Sweetener','Warming Effect','Chemical-Free Relief']
  },
   { id: '22',
    name: 'Foot Cream',
    category: 'skincare' as ProductCategory,
    description: 'Perfect for daily use, it nourishes tired feet, reduces roughness, and restores softness—leaving your skin smooth, hydrated, and revitalized.',
    price: 260, // Direct INR price
    image: 'https://sutaka.co.uk/wp-content/uploads/2023/12/6ztdijzE.png',
    rating: 4.8,
    featured: true,
    stock: 9, 
  
    ingredients: ['Shea Butter', 'Coconut Oil ','Peppermint Oil','Eucalyptus Oil','Sunflower Oil'],
    benefits: ['Deep Moisturization', 'Soothes & Heals Cracks', 'Refreshing & Cooling ','100% Natural & Chemical-Free']
  },
   { id: '24',
    name: 'Lip Balm',
    category: 'skincare' as ProductCategory,
    description: 'seals in moisture and keeps your lips soft all day long.Perfect for dry, chapped, or sensitive lips—ideal for all weather conditions.',
    price: 180, // Direct INR price
    image: 'https://i5.walmartimages.com/asr/f66542e2-5394-456a-a9c1-fc67b409cec0.9bc7eb58fcd21f96ce5f465197a611fa.png',
    rating: 4.8,
    featured: true,
    stock: 9, 
   
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Red Mica','Beeswax'],
    benefits: ['Intensive Moisture', 'Natural Tint', 'Heals & Prevents Chapping','Non-Sticky Finish','Safe & Natural ']
  },
   { id: '25',
    name: 'Body Butter',
    category: 'skincare' as ProductCategory,
    description: 'Creamy moisturizer melts into the skin, delivering long-lasting hydration and leaving your body soft, supple, and glowing.',
    price: 320, // Direct INR price
    image: 'http://www.bydreamsfactory.com/wp-content/uploads/2016/12/DIY-lavender-whipped-body-butter-13-1-1.jpg',
    rating: 4.8,
    featured: true,
    stock: 9, 
    
    ingredients: ['Mango Butter', 'Cocoa Butter','Almond Oil','Cetyl Alcohol','Stearic Acid','Propylene Glycol'],
    benefits: ['Locks in Moisture', 'Softens Skin', 'Smooth, Non-Greasy Texture','Soothes Dry Patches','Naturally Nourishing']
  },
   { id: '26',
    name: 'Kumkumadi Day Cream',
    category: 'skincare' as ProductCategory,
    description: 'Experience the ancient wisdom of Ayurveda with our Kumkumadi Day Cream, enriched with kojic powder and ascorbic acid (Vitamin C).',
    price: 350, // Direct INR price
    image: 'https://media.vogue.in/wp-content/uploads/2023/04/Kama-Ayurveda-Kumkumadi-Illuminating-Skin-Perfecting-Day-Cream-1-min-1-scaled.jpg',
    rating: 4.8,
    featured: true,
    stock: 9, 
   ingredients: ['Kojic Powder', ' Ascorbic Acid (Vitamin C)','Herbal Extract Base'],
    benefits: ['Brightens Complexion', 'Improves Skin Texture', 'Rich in Antioxidants','Lightweight Formula','Ayurvedic & Dermatologically Trusted']
  },
    { id: '27',
    name: 'Herbal Face Wash',
    category: 'skincare' as ProductCategory,
    description: 'Cleanse your face gently with our Herbal Face Wash, made with natural surfactant cocoglucoside, soothing turmeric, and brightening ascorbic powder.',
    price: 280, // Direct INR price
    image: 'https://n2.sdlcdn.com/imgs/a/g/2/SDL487464149_1390831464_image1-b7c0f.JPG',
    rating: 4.8,
    featured: true,
    stock: 9, 
   ingredients: ['Cocoglucoside,', 'Aqua (Water)','Turmeric Extract','Ascorbic Powder','Propylene Glycol'],
    benefits: ['Gentle Cleansing', 'Retains Natural Moisture', 'Brightens Skin','Free from Sulfates & Harsh Chemicals','Daily Use Formula']
  },
   { id: '21',
    name: 'Foot Salt',
    category: 'skincare' as ProductCategory,
    description: 'Pamper your feet with our 100% Natural Foot Salt, a rejuvenating blend designed to soothe tired, cracked skin while gently exfoliating dead cells.',
    price: 180, // Direct INR price
    image: 'https://livingwellmom.com/wp-content/uploads/2016/02/Homemade-Epsom-Salt-Foot-Bath.jpg',
    rating: 4.8,
    featured: true,
    stock: 9, 
    ingredients: ['Himalayan Salt', 'Epsom Salt','Rosemary Herb','Dried Orange Peel','Lavender Oil'],
    benefits: ['Heals Cracked Skin', 'Exfoliates Dead Cells', 'Soothes & Relaxes Muscles','Refreshing Aromatherapy','100% Natural & Chemical-Free']
  }
].map(product => ({
  ...product,
  image: product.image ?? product2, // Use product2 as a placeholder if image is missing
  formattedPrice: formatPrice(product.price)
}));

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');
  const [sortOption, setSortOption] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]); // Updated to INR range
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [hoveredSymbol, setHoveredSymbol] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
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
    setPriceRange([0, 5000]); // Reset to INR range
    setSearchQuery('');
    setSortOption('');
  };

  // Categories with symbols
  const categories = [
    { id: 'all', name: 'All Products', symbol: '𓃭' },
    { id: 'skincare', name: 'Skincare', symbol: '𓍯' },
    { id: 'food', name: 'Food & Herbs', symbol: '𓇬' },
    // { id: 'wellness', name: 'Wellness', symbol: '𓂀' }
  ];

  return (
    <div className="min-h-screen bg-[#f8f9f0]">
      {/* Hero Section - Improved Responsiveness */}
      <div
        className="flex items-center pt-32 pb-8 sm:pt-32 sm:pb-16 md:pt-40 md:pb-20 lg:pt-48 lg:pb-24 relative text-white bg-cover bg-center"
        style={{
          backgroundImage: 'linear-gradient(rgba(18, 23, 105, 0.85), rgba(103, 36, 106, 0.85)), url("https://images.unsplash.com/photo-1541532713592-79a0317b6b77?auto=format&fit=crop&q=80")',
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center h-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-6 font-serif text-[#FE49AF] drop-shadow-lg">
            Ancient Egyptian Treasures
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto text-[#EBEBD3] px-2 sm:px-4">
            Discover authentic products inspired by the beauty secrets and sacred rituals of ancient Egypt.
          </p>
          
          {/* Responsive Search Bar */}
          <div className="mt-4 sm:mt-8 max-w-md mx-auto px-4 sm:px-0 w-full">
            <input
              type="text"
              placeholder="Search sacred products..."
              className="w-full py-2 sm:py-3 px-4 sm:px-6 rounded-full text-[#121769] text-sm sm:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-2 sm:px-6 py-6 sm:py-12">
        {/* Mobile Filters Button */}
        <div className="md:hidden flex justify-end mb-4">
          <Button
            className="bg-[#67246A] text-white px-4 py-2 rounded-lg shadow-lg"
            onClick={() => setMobileFilterOpen(true)}
          >
            <svg className="inline-block w-5 h-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" /></svg>
            Filters
          </Button>
        </div>
        {/* Mobile Filter Drawer/Modal */}
        <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
          <DialogContent className="md:hidden w-full max-w-sm mx-auto p-0 rounded-lg overflow-hidden">
            <div className="bg-white p-6 space-y-6">
              {/* Categories */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setActiveCategory(cat.id as ProductCategory | 'all'); setMobileFilterOpen(false); }}
                      className={`flex items-center w-full text-left px-4 py-3 rounded-lg transition-all ${activeCategory === cat.id ? 'bg-[#67246A] text-white shadow-inner' : 'text-[#121769] hover:bg-[#EBEBD3] hover:text-[#67246A]'}`}
                    >
                      <span className="text-xl mr-2">{cat.symbol}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">Price Range</h3>
                <div className="px-2">
                  <div className="mb-2 flex justify-between text-[#121769]">
                    <span className="text-sm">₹ {priceRange[0]}</span>
                    <span className="text-sm">₹ {priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="500"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                    className="w-full h-2 bg-[#EBEBD3] rounded-lg appearance-none cursor-pointer accent-[#FE49AF]"
                  />
                </div>
              </div>
              {/* Sort Options */}
              <div>
                <h3 className="font-semibold text-lg mb-4 text-[#121769] border-b pb-2 border-[#67246A]">Sort By</h3>
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
              <div className="flex justify-end">
                <Button className="bg-[#FE49AF] text-white px-4 py-2 rounded-lg" onClick={() => setMobileFilterOpen(false)}>
                  Done
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Interactive Filters - Left Sidebar (hidden on mobile) */}
          <div className="md:col-span-1 space-y-8 sticky top-4 h-min hidden md:block">
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
                  <span className="text-sm">₹ {priceRange[0]}</span>
                  <span className="text-sm">₹ {priceRange[1]}</span>
                </div>
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
          </div>
          {/* Product Display Area */}
          <div className="md:col-span-3">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#121769] p-4 rounded-lg shadow-lg mb-6">
              <p className="text-[#EBEBD3] text-sm sm:text-base">
                Showing <span className="font-bold text-[#FE49AF]">{filteredProducts.length}</span> products
              </p>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveView('grid')}
                  className={`p-2 rounded ${activeView === 'grid' ? 'bg-[#FE49AF]' : 'bg-[#EBEBD3]'}`}
                >
                  <GridIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setActiveView('list')}
                  className={`p-2 rounded ${activeView === 'list' ? 'bg-[#FE49AF]' : 'bg-[#EBEBD3]'}`}
                >
                  <ListIcon className="w-5 h-5" />
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
                      viewType="grid"
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