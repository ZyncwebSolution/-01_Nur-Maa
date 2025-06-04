import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

// Extend Product type locally to include all used properties
type ProductCategory = 'skincare' | 'food';

type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  rating: number;
  featured?: boolean;
  ingredients?: string[];
  benefits?: string[];
};

// Format price to Indian Rupees
const formatPrice = (price: number) => {
  const inrPrice = price * 75; // Conversion rate (adjust as needed)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(inrPrice).replace('₹', '₹ ');
};

// Mock products data
const products: (Product & { formattedPrice: string })[] = [
  {
    id: '1',
    name: 'Lavender Face Cream',
    category: 'skincare' as ProductCategory,
    description: "A soothing face cream made with organic lavender essential oil and shea butter. Our luxurious face cream is handcrafted in small batches to ensure quality and freshness. The calming properties of lavender combined with nourishing shea butter make this perfect for all skin types, especially sensitive skin. Use morning and night for best results.",
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601049541192-9c6235bc1ff1?auto=format&fit=crop&q=80',
    rating: 4.8,
    featured: true,
    ingredients: ['Lavender oil', 'Shea butter', 'Aloe vera', 'Vitamin E'],
    benefits: ['Soothing', 'Hydrating', 'Anti-inflammatory']
  },
  {
    id: '2',
    name: 'Organic Honey',
    category: 'food' as ProductCategory,
    description: "Pure, unfiltered honey sourced from local wildflowers and herbs. Our organic honey is harvested using sustainable beekeeping practices that support local bee populations. This raw honey contains natural enzymes, antioxidants, and pollen that are beneficial for your health. Perfect as a natural sweetener or for its medicinal properties.",
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80',
    rating: 5.0,
    featured: true,
    ingredients: ['100% pure wildflower honey'],
    benefits: ['Antioxidants', 'Energy boost', 'Sore throat relief']
  },
  {
    id: '3',
    name: 'Rosemary Hair Oil',
    category: 'skincare' as ProductCategory,
    description: "Nourishing hair oil with rosemary and coconut oil for healthy, shiny hair. Our hair oil combines the stimulating properties of rosemary with the moisturizing benefits of coconut oil to promote hair growth and add shine. Regular use can help strengthen hair follicles, prevent split ends, and add volume to limp hair.",
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1608571423937-0c87e9f7ac5d?auto=format&fit=crop&q=80',
    rating: 4.6,
    featured: true,
    ingredients: ['Rosemary extract', 'Coconut oil', 'Castor oil', 'Vitamin E'],
    benefits: ['Hair growth', 'Scalp health', 'Shine enhancement']
  },
  {
    id: '4',
    name: 'Herbal Tea Blend',
    category: 'food' as ProductCategory,
    description: "A calming blend of chamomile, lavender, and lemon balm for relaxation. This handcrafted tea blend helps promote relaxation and good sleep. All herbs are organically grown and carefully dried to preserve their natural properties. Enjoy a cup before bedtime for a peaceful night's sleep.",
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80',
    rating: 4.4,
    ingredients: ['Chamomile', 'Lavender', 'Lemon balm', 'Peppermint'],
    benefits: ['Relaxation', 'Better sleep', 'Digestive aid']
  },
  {
    id: '5',
    name: 'Aloe Vera Gel',
    category: 'skincare' as ProductCategory,
    description: "Pure aloe vera gel for soothing and moisturizing skin. Harvested from mature aloe vera plants, our gel contains no added colors or fragrances. It's perfect for soothing sunburns, hydrating dry skin, or as a natural hair gel. The cooling properties make it ideal for after-sun care.",
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1570212773364-e30dd243fbf2?auto=format&fit=crop&q=80',
    rating: 4.7,
    ingredients: ['99% pure aloe vera', 'Citric acid', 'Potassium sorbate'],
    benefits: ['Sunburn relief', 'Hydration', 'Skin soothing']
  }
].map(product => ({
  ...product,
  formattedPrice: formatPrice(product.price)
}));

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  const [activeTab, setActiveTab] = React.useState('description');
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 bg-[#EBEBD3] min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
          <h2 className="text-2xl font-bold text-[#121769]">Product Not Found</h2>
          <p className="mt-4 text-[#67246A]">
            The product you are looking for does not exist.
          </p>
          <Link 
            to="/products" 
            className="mt-6 inline-block px-6 py-3 bg-[#121769] text-white rounded-lg hover:bg-[#0e1255] transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Find related products
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  return (
    <div className="pt-24 pb-16 bg-[#EBEBD3] min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex py-4 text-sm text-[#67246A]" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-[#FE49AF] transition-colors">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="hover:text-[#FE49AF] transition-colors">Products</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-[#121769] font-medium">{product.name}</span>
            </li>
          </ol>
        </nav>
        
        {/* Product Main Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mt-6">
          {/* Product Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#121769]">{product.name}</h1>
              
              <div className="flex items-center mt-3">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i}
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < product.rating! ? 'text-[#FE49AF]' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-[#67246A]">({product.rating} stars)</span>
              </div>
            </div>
            
            <div className="mt-4">
              <span className="text-2xl font-semibold text-[#121769]">{product.formattedPrice}</span>
              {product.featured && (
                <span className="ml-3 px-2 py-1 bg-[#FE49AF] text-white text-xs font-medium rounded">
                  Featured
                </span>
              )}
            </div>
            
            <div className="mt-4">
              {product.category === "skincare" ? (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#FE49AF]/10 text-[#67246A]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
                  </svg>
                  Skincare
                </span>
              ) : (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#67246A]/10 text-[#67246A]">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Food
                </span>
              )}
            </div>
            
            {/* Tabs */}
            <div className="mt-6 border-b border-[#67246A]/20">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'description'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'ingredients'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Ingredients
                </button>
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'benefits'
                      ? 'border-[#121769] text-[#121769]'
                      : 'border-transparent text-[#67246A] hover:text-[#121769] hover:border-[#121769]'
                  }`}
                >
                  Benefits
                </button>
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="mt-4">
              {activeTab === 'description' && (
                <p className="text-[#67246A] leading-relaxed">
                  {product.description}
                </p>
              )}
              {activeTab === 'ingredients' && (
                <ul className="list-disc pl-5 text-[#67246A] space-y-1">
                  {product.ingredients?.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              )}
              {activeTab === 'benefits' && (
                <ul className="list-disc pl-5 text-[#67246A] space-y-1">
                  {product.benefits && product.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              )}
            </div>
            
            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="block font-medium text-[#121769] mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className={`px-4 py-2 border rounded-l-lg ${
                    quantity <= 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#121769] hover:bg-[#EBEBD3] cursor-pointer'
                  }`}
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <span className="px-6 py-2 border-t border-b text-center text-lg font-medium w-16 text-[#121769]">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className={`px-4 py-2 border rounded-r-lg ${
                    quantity >= 10
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white text-[#121769] hover:bg-[#EBEBD3] cursor-pointer'
                  }`}
                  disabled={quantity >= 10}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full px-6 py-3 bg-[#121769] text-white rounded-lg hover:bg-[#0e1255] transition-colors flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
              <Link
                to="/checkout"
                className="w-full px-6 py-3 border border-[#121769] text-[#121769] rounded-lg hover:bg-[#121769]/10 transition-colors flex items-center justify-center"
                onClick={() => addItem(product, quantity)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#121769] mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`} 
                  className="block group"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name}
                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {relatedProduct.featured && (
                        <span className="absolute top-2 right-2 bg-[#FE49AF] text-white text-xs font-bold px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="font-medium text-[#121769] group-hover:text-[#67246A] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i}
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < relatedProduct.rating! ? 'text-[#FE49AF]' : 'text-gray-300'}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                        <span className="ml-1 text-xs text-[#67246A]">({relatedProduct.rating})</span>
                      </div>
                      <p className="text-[#121769] font-medium mt-2">
                        {relatedProduct.formattedPrice}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;