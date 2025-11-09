import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

export function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps) {
  const { addItem } = useCart();
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-brand-gold/10 hover:border-brand-gold/30 transition-all duration-300 hover:shadow-lg">
      <Link to={`/product/${id}`} className="block">
        <div className="relative overflow-hidden bg-gray-100">
          <img
            src={image}
            alt={name}
            className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-sans font-semibold text-sm text-foreground mb-1.5 line-clamp-2 group-hover:text-brand-orange transition-colors">
            {name}
          </h3>
          <p className="font-sans font-bold text-base text-foreground">${price.toFixed(2)}</p>
        </Link>
        <button
          onClick={(e) => {
            e.preventDefault();
            if (onAddToCart) {
              onAddToCart();
            } else {
              addItem({ id, name, price, image }, 1);
              toast.success(`${name} added to cart`);
            }
          }}
          aria-label={`Add ${name} to cart`}
          className="mt-3 w-full py-2 px-4 rounded-xl bg-brand-orange text-white font-sans font-medium text-sm hover:bg-brand-orange/90 focus:outline-none focus:ring-2 focus:ring-brand-orange/60 transition-all opacity-0 group-hover:opacity-100"
        >
          Add to Cart
        </button>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          if (onAddToCart) {
            onAddToCart();
          } else {
            addItem({ id, name, price, image }, 1);
            toast.success(`${name} added to cart`);
          }
        }}
        aria-label={`Add ${name} to cart`}
        className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-brand-gold/20 flex items-center justify-center hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-brand-orange/60 transition-all shadow-md opacity-0 group-hover:opacity-100"
      >
        <ShoppingCart className="w-4 h-4 text-foreground" strokeWidth={2} />
      </button>
    </div>
  );
}