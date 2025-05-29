import * as React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickPurchase?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickPurchase }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };
  
  const handleQuickPurchase = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickPurchase) {
      onQuickPurchase(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="product-card group h-full flex flex-col">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.featured && (
            <span className="absolute top-2 right-2 bg-nurmaa-green text-white text-xs px-2 py-1 rounded-full">
              Featured
            </span>
          )}
          {product.category === "skincare" ? (
            <span className="badge-skincare absolute top-2 left-2">
              🌿 Skincare
            </span>
          ) : (
            <span className="badge-food absolute top-2 left-2">
              🍯 Food
            </span>
          )}
        </div>
        
        <div className="p-4 flex-grow flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-medium mb-2">{product.name}</h3>
            {product.rating && (
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-4 w-4 ${i < product.rating! ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
          </div>
          
          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-nurmaa-dark">
                ${product.price.toFixed(2)}
              </span>
              <button 
                onClick={handleAddToCart}
                className="btn-secondary py-2 px-4 text-sm"
              >
                Add to Cart
              </button>
            </div>
            <button 
              onClick={handleQuickPurchase}
              className="w-full btn-primary py-2 flex items-center justify-center"
            >
              Buy Now <ArrowRight className="ml-1 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
