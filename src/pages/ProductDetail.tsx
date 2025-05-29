
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/types';

// Mock products data (would come from a database in a real app)
const products: Product[] = [
  {
    id: '1',
    name: 'Lavender Face Cream',
    category: 'skincare',
    description: "A soothing face cream made with organic lavender essential oil and shea butter. Our luxurious face cream is handcrafted in small batches to ensure quality and freshness. The calming properties of lavender combined with nourishing shea butter make this perfect for all skin types, especially sensitive skin. Use morning and night for best results.",
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1601049541192-9c6235bc1ff1?auto=format&fit=crop&q=80',
    rating: 4.8,
    featured: true,
  },
  {
    id: '2',
    name: 'Organic Honey',
    category: 'food',
    description: "Pure, unfiltered honey sourced from local wildflowers and herbs. Our organic honey is harvested using sustainable beekeeping practices that support local bee populations. This raw honey contains natural enzymes, antioxidants, and pollen that are beneficial for your health. Perfect as a natural sweetener or for its medicinal properties.",
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&q=80',
    rating: 5.0,
    featured: true,
  },
  {
    id: '3',
    name: 'Rosemary Hair Oil',
    category: 'skincare',
    description: "Nourishing hair oil with rosemary and coconut oil for healthy, shiny hair. Our hair oil combines the stimulating properties of rosemary with the moisturizing benefits of coconut oil to promote hair growth and add shine. Regular use can help strengthen hair follicles, prevent split ends, and add volume to limp hair.",
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1608571423937-0c87e9f7ac5d?auto=format&fit=crop&q=80',
    rating: 4.6,
    featured: true,
  },
  // Add more products from the Products page
  {
    id: '4',
    name: 'Herbal Tea Blend',
    category: 'food',
    description: "A calming blend of chamomile, lavender, and lemon balm for relaxation. This handcrafted tea blend helps promote relaxation and good sleep. All herbs are organically grown and carefully dried to preserve their natural properties. Enjoy a cup before bedtime for a peaceful night's sleep.",
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&q=80',
    rating: 4.4,
  },
  {
    id: '5',
    name: 'Aloe Vera Gel',
    category: 'skincare',
    description: "Pure aloe vera gel for soothing and moisturizing skin. Harvested from mature aloe vera plants, our gel contains no added colors or fragrances. It's perfect for soothing sunburns, hydrating dry skin, or as a natural hair gel. The cooling properties make it ideal for after-sun care.",
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1570212773364-e30dd243fbf2?auto=format&fit=crop&q=80',
    rating: 4.7,
  },
];

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const [quantity, setQuantity] = React.useState(1);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="pt-24 pb-16 nurmaa-container">
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold">Product Not Found</h2>
          <p className="mt-4 text-gray-600">
            The product you are looking for does not exist.
          </p>
          <Link to="/products" className="btn-primary inline-block mt-6">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };
  
  const handleAddToCart = () => {
    addItem(product, quantity);
  };
  
  // Find related products (same category, excluding current product)
  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);
  
  return (
    <div className="pt-24 pb-16">
      <div className="nurmaa-container">
        <nav className="flex py-4 text-sm text-gray-500" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-nurmaa-green">Home</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link to="/products" className="hover:text-nurmaa-green">Products</Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span aria-current="page">{product.name}</span>
            </li>
          </ol>
        </nav>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            
            <div className="flex items-center mt-3">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-5 w-5 ${i < product.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-gray-600">({product.rating} stars)</span>
            </div>
            
            <div className="mt-6">
              <span className="text-2xl font-semibold text-nurmaa-green">${product.price.toFixed(2)}</span>
            </div>
            
            <div className="mt-6 bg-nurmaa-beige bg-opacity-50 p-4 rounded-lg">
              {product.category === "skincare" ? (
                <span className="badge-skincare">
                  🌿 Skincare
                </span>
              ) : (
                <span className="badge-food">
                  🍯 Food
                </span>
              )}
            </div>
            
            <div className="mt-6">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
            
            <div className="mt-8">
              <label className="block font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 border rounded-l text-gray-600 hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b text-center w-12">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border rounded-r text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="mt-8 space-y-4">
              <button
                onClick={handleAddToCart}
                className="btn-primary w-full"
              >
                Add to Cart
              </button>
              <Link
                to="/checkout"
                className="btn-outlined w-full flex items-center justify-center"
                onClick={() => addItem(product, quantity)}
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <div className="product-card group">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-4">
                      <h3 className="font-medium">{product.name}</h3>
                      <p className="text-nurmaa-green font-medium mt-2">
                        ${product.price.toFixed(2)}
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
