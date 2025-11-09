import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  onAddToCart?: () => void;
}

export function ProductCard({ id, name, price, image, onAddToCart }: ProductCardProps) {
  return (
    <div className="relative">
      <Link to={`/product/${id}`}>
        <img
          src={image}
          alt={name}
          className="w-full aspect-[83/90] object-cover rounded-[22px]"
        />
      </Link>
      <button
        onClick={(e) => {
          e.preventDefault();
          onAddToCart?.();
        }}
        className="absolute bottom-[-19px] right-0 w-[39px] h-[39px] rounded-full border border-brand-gold flex items-center justify-center bg-brand-gold hover:bg-brand-gold/90 transition-colors"
      >
        <ShoppingCart className="w-4 h-4 text-foreground" strokeWidth={2} />
      </button>
      <div className="mt-2">
        <h3 className="font-helvetica font-bold text-sm text-foreground">{name}</h3>
        <p className="font-helvetica text-sm text-foreground mt-1">${price.toFixed(2)}</p>
      </div>
    </div>
  );
}
