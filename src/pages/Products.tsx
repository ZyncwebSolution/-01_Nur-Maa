import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import QuickPurchaseModal from '@/components/QuickPurchaseModal';
import { Product as BaseProduct, ProductCategory } from '@/lib/types';

type Product = BaseProduct & { 
  formattedPrice: string;
  ingredients?: string[];
  stock: number;
};
import product2 from '@/assets/images/product2.png';
import product3 from '@/assets/images/product3.png';
import { GridIcon, ListIcon } from 'lucide-react';

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
    name: 'Granola',
    category: 'food' as ProductCategory,
    description: 'Fuel your day with our handcrafted Granola, a delicious and nutritious mix of roasted nuts, seeds, oats, and natural jaggery—lightly toasted in pure cold-pressed coconut oil. ',
    price: 195, // Direct INR price
    image:'https://cookieandkate.com/images/2015/10/healthy-granola-recipe-1-1.jpg',
    rating: 4.9,
    featured: true,
    stock: 15,
    ingredients: ['Rolled Oats', 'Almonds', 'Flax Seeds', 'Sunflower Seeds','Pumpkin Seeds','Cold-Pressed Coconut Oil','Jaggery'],
    benefits: ['Heart-Healthy Ingredients ', 'Natural Sweetener', 'Fiber-Rich Oats','Protein-Packed','Immunity Boosting','Weight-Friendly'],
   },
  {
    id: '2',
    name: 'Sprouted Ragi Powder',
    category: 'food' as ProductCategory,
    description: 'Sprouted Ragi Powder – Naturally Nutritious & Wholesome Carefully prepared from 100% whole ragi grains, our Sprouted Ragi Powder is a powerhouse of nutrition. The grains are traditionally sprouted to enhance bioavailability, gently dried, and finely milled to preserve their natural goodness. Rich in calcium, iron, and dietary fiber, sprouted ragi supports strong bones, aids digestion, and helps maintain healthy blood sugar levels.',
    price: 80, // Direct INR price
    image:'https://ucarecdn.com/b32a6e19-4629-463b-83f4-7ea72be864bd/-/format/auto/',
    rating: 5.0,
    featured: true,
    stock: 8,
     ingredients: ['100% Sprouted Ragi (Finger Millet)','Salt'],
    benefits: ['Bone Strength', 'Improved Digestion', 'Diabetic-Friendly','Weight Management','Rich in Iron','Gluten-Free','Plant-Based Protein'],
   
  },
  {
    id: '14',
    name: 'Natural Herbal Eye Shadow',
    category: 'skincare' as ProductCategory,
    description: 'Enhance your eyes with the gentle power of nature. Our 100% Natural Eye Shadow',
    price: 400, // Direct INR price
    image: 'https://bodyofangels.com/cdn/shop/files/City_of_Angels_natural_herbal_eyeshadow_palette.jpg?v=1735496331&width=1445',
    rating: 4.7,
    featured: false,
    stock: 12,
     ingredients: ['Arrowroot Powder ', 'Manjistha Powder','Charcoal Powder','Liquorice Powder'],
    benefits: ['Gentle on Skin', 'Natural Tint & Soft Texture', 'Detoxifying & Healing','Anti-Aging Properties','Chemical-Free Beauty '],
    
  },
  {
    id: '23',
    name: 'Lip Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Give your lips the care they deserve with our 100% Natural Lip Scrub, thoughtfully crafted with mango butter, sugar, almond oil, and lavender oil. This luxurious scrub gently buffs away dead skin cells while deeply moisturizing your lips, leaving them soft, smooth, and naturally radiant.Perfect as a pre-lip care routine or before applying lip tint or lipstick for a flawless finish.',
    price: 260, // Direct INR price
    image: 'https://wholenewmom.com/wp-content/uploads/2016/12/Lip-Scrub-V-720x1105.jpg',
    rating: 4.8,
    featured: true,
    stock: 5,
    ingredients: ['Mango Butter', 'Sugar','Almond Oil','Lavender Oil'],
    benefits: ['Exfoliates Dead Skin', 'Deeply Moisturizing', 'Soothing Aroma','Smooth Base for Lipstick']
  },
  {
    id: '3',
    name: 'Kambu Puttu Mix',
    category: 'food' as ProductCategory,
    description: 'Rekindle the flavors of your grandmother’s kitchen with our Kambu Puttu Mix, made from premium pearl millet (kambu) blended with a touch of cardamom and natural salt. This wholesome puttu mix is stone-ground and prepared in small batches to retain its natural aroma, fiber, and nutritional richness.',
    price: 110, // Direct INR price
    image: 'https://c7.staticflickr.com/9/8637/29774838446_3e7f7ccc79_o.jpg',
    rating: 4.9,
    featured: true,
    stock: 10,
    ingredients: ['Pearl Millet (Kambu)', 'Cardamom', 'Salt'],
    benefits: ['High in Iron & Calcium ', 'Gut-Friendly Grain', 'Helps Control Diabetes','Heart Health Support','Naturally Gluten-Free','Light & Cooling']
  },
  {
    id: '4',
    name: 'Karupu kauvini kanji mix',
    category: 'food' as ProductCategory,
    description: 'Cherished by Tamil royalty and once known as the “Forbidden Rice,” Karuppu Kavuni (Black Rice) is a rare and powerful grain packed with nutrients and antioxidants. Our Karuppu Kavuni Kanji Mix is made from handpicked black rice, carefully cleaned, slow-roasted, and stone-ground to retain its rich color, nutty aroma, and nutritional integrity.',
    price: 135, // Direct INR price
    image:'https://www.kandharam.co.in/image/cache/catalog/Products/Food%20Products/Rice/Karuppu%20Kavuni%20Rice-min-500x500.png',
    rating: 4.5,
    featured: false,
    stock: 20,
      ingredients: ['Karuppu Kavuni Rice (Black Rice)', 'Sivapu Kauvini Rice (Red Rice) ', 'poongar arisi', 'katuyanam','karunkuruvi arisi','mapalai samba'],
    benefits: ['Rich in Antioxidants ', 'Supports Heart Health', 'Diabetic-Friendly','Improves Digestion','Iron-Rich','Weight Management ','Gluten-Free']
  },
  {
    id: '15',
    name: 'Ceramide Moisturizer',
    category: 'skincare' as ProductCategory,
    description: 'EOur Ceramide Moisturizer is expertly formulated with ceramides, shea butter, and skin-loving emulsifiers to restore your skin natural barrier.',
    price: 320, // Direct INR price
    image: 'https://m.media-amazon.com/images/I/61UzNreguKL._SL1500_.jpg',
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
    id: '13',
    name: 'Eye Kajol',
    category: 'skincare' as ProductCategory,
    description: 'Made using time-honored ayurvedic ingredients like almond dust, castor oil, beeswax, and ghee, our Eye Kajol is a 100% natural and chemical-free formula designed to soothe, protect, and enhance your eyes.',
    price: 160, // Direct INR price
   image: 'https://images-static.nykaa.com/media/catalog/product/tr:h-800,w-800,cm-pad_resize/a/a/aa14787AYAXX00000061_1.jpg',
    rating: 4.8,
    featured: true,
    stock: 9,   ingredients: ['Almond Dust', 'Castor Oil','Beeswax','Ghee'],
    benefits: ['Cools and Soothes Eyes', 'Promotes Eyelash Growth ', 'No Irritation or Chemicals','Traditional & Herbal ','Deep Black Finish']
  },
  {
    id: '17',
    name: ' Anti-Dandruff Hair Oil',
    category: 'skincare' as ProductCategory,
    description: 'Free from harmful chemicals and safe for all hair types, including sensitive scalps.',
    price: 280, // Direct INR price
    image: 'https://cdn.shopify.com/s/files/1/0272/4714/9155/products/HOLEUHEN4TBJQNZT_2_2048x2048.jpg?v=1622096182',
    rating: 4.8,
    featured: true,
    stock: 9, ingredients: ['Carrier Oils:Coconut Oil,Sesame Oil', 'Herbs: Amla, Neem, Curry Leaves, Aloe Vera, Henna, Avarampoo, Moringa Leaves, Karunjeeragam, Hibiscus, Rose Petals','Special Additive: Neem Oil for anti-fungal and antibacterial protection'],
    benefits: ['Fights Dandruff Naturally', 'Soothes and Cools the Scalp', 'Reduces Hair Fall','Moisturizes Dry Scalp','100% Herbal & Chemical-Free']
  },
  {
    id: '5',
    name: 'Millet waffle mix',
    category: 'food' as ProductCategory,
    description: 'mix, pour, and cook in your waffle maker—or even in a dosa pan for thin, crispy treats!Just.',
    price: 210, // Direct INR price
     image: 'https://m.media-amazon.com/images/I/710i7PyUigL._SX679_.jpg',
    rating: 4.8,
    featured: true,
    stock: 9,
   ingredients: ['Wheat Flour', 'Millet Flour', 'Rice Flour','Salt','Jaggery'],
    benefits: ['Rich in Fiber & Nutrients', 'Natural Sweetness ', 'Sustained Energy','Good for Kids & Adults','No Chemicals or Preservatives ','Versatile & Delicious'] },
  {
    id: '6',
    name: 'Sola Paniyaram',
    category: 'food' as ProductCategory,
    description: 'Perfect for soft, fluffy paniyaram with a slightly nutty and earthy flavor—enjoy it with chutney or sambar for a comforting and filling meal.',
    price: 145, // Direct INR price
    image: 'https://b2958125.smushcdn.com/2958125/wp-content/uploads/Masala-Sola-Paniyaram5-768x1024.jpg?lossy=1&strip=1&webp=1',
     rating: 4.8,
    featured: true,
    stock: 9,
     ingredients: ['Sivapu solam', ' Vellai solam', 'Urad dal','Fenugreek seeds'],
    benefits: ['Gluten-Free Grain', 'Supports Digestion', 'High in Fiber','Iron & Protein Boost','Heart-Friendly','Diabetic-Friendly']
  },
  {
    id: '18',
    name: 'Herbal Hair Butter',
    category: 'skincare' as ProductCategory,
    description: 'perfect leave-in for dry, curly, or damaged hair and an excellent alternative to chemical-based styling gels or serums.',
    price: 330, // Direct INR price
    image: 'https://i.etsystatic.com/26665376/r/il/d4f007/2980851434/il_fullxfull.2980851434_nzdl.jpg',
    rating: 4.8,
    featured: true,
    stock: 9,ingredients: ['Cocoa Butter', 'Flax Seed Extract ','Almond Oil','Propylene Glycol (plant-based)- (used in minimal safe quantity)'],
    benefits: ['Deep Conditioning', 'Natural Styling Aid', 'Reduces Frizz & Split Ends','Lightweight & Non-Greasy','100% Herbal & Chemical-Free']
  },
  {
     id: '20',
    name: 'Foot Scrub',
    category: 'skincare' as ProductCategory,
    description: 'Ideal for regular use, it leaves your feet feeling refreshed, smooth, and beautifully cared for.',
    price: 240, // Direct INR price
    image: 'https://beautycrafter.com/wp-content/uploads/2023/12/foot-scrub-applied-683x1024.webp',
    rating: 4.8,
    featured: true,
    stock: 9,
    
    ingredients: ['Shea Butter', 'Coconut Oil','Walnut Powder','Eucalyptus Oil','Sea Salt'],
    benefits: ['Gentle Exfoliation', 'Deep Moisturization', 'Soothing & Refreshing','Natural & Chemical-Free','Improves Skin Texture']
  },
     { id: '7',
    name: 'Millet Payiru Adai',
    category: 'food' as ProductCategory,
    description: 'Ideal for breakfast, brunch, or dinner—just mix with water and cook like a dosa or thick pancake. Serve hot with chutney or butter.',
    price: 160, // Direct INR price
    image: 'https://farm1.staticflickr.com/696/23069594022_a8d61cd4e8_o.jpg',
    rating: 4.8,
    featured: true,
    stock: 9, ingredients: ['Green Gram', 'Moong Dal', 'Chana Dal','Toor Dal','Red Chilli','Garlic','Ginger','Asafoetida','Varagu (Kodo Millet)', 'Thinai (Foxtail Millet)', 'Kuthiraivali (Barnyard Millet)'],
    benefits: ['Rich in Plant-Based Protein', 'Millet Powered', 'Good for Digestion','Diabetic-Friendly','Weight Management','Balanced Spice ']
  },
     { id: '8',
    name: 'Kollu idly podi',
    category: 'food' as ProductCategory,
    description: 'Kollu idly ready mix is stone-ground in small batches, free from preservatives, and perfect for soft, fluffy idlies that are light on the stomach and rich in nutrients. Just mix, ferment, and steam',
    price: 145, // Direct INR price
    image: 'https://nankatrathu.in/cdn/shop/files/KolluIdlyPowder1.jpg?v=1724833607&width=1445',
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
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
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
      
      {/* Main Content - Improved Layout */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Filters Sidebar - Mobile Friendly */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg border border-[#EBEBD3] mb-6 lg:mb-0 lg:sticky lg:top-4">
              {/* Mobile Filter Toggle */}
              <div className="lg:hidden p-4 border-b border-[#EBEBD3]">
                <button
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                  className="w-full flex items-center justify-between text-[#121769] font-medium"
                >
                  <span>Filters</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Filters Content */}
              <div className={`${isMobileFiltersOpen ? 'block' : 'hidden'} lg:block p-4 sm:p-6 space-y-6`}>
                {/* Categories */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#121769]">Categories</h3>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as ProductCategory | 'all')}
                      className={`flex items-center w-full text-left px-3 py-2 rounded-lg text-sm sm:text-base ${
                        activeCategory === cat.id 
                          ? 'bg-[#67246A] text-white' 
                          : 'text-[#121769] hover:bg-[#EBEBD3]'
                      }`}
                    >
                      <span className="mr-2">{cat.symbol}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>

                {/* Price Range - Mobile Friendly Slider */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-[#121769]">Price Range</h3>
                  <div className="px-2">
                    <input
                      type="range"
                      className="w-full accent-[#FE49AF]"
                      min="0"
                      max="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    />
                    <div className="flex justify-between text-sm text-[#121769] mt-2">
                      <span>₹0</span>
                      <span>₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List - Responsive */}
          <div className="lg:col-span-3">
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

            {/* Products Grid */}
            <div className={
              activeView === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'
                : 'space-y-4 sm:space-y-6'
            }>
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center text-[#121769] py-12 text-lg font-semibold">
                  No products found.
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onQuickPurchase={handleQuickPurchase}
                  />
                ))
              )}
            </div>
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
