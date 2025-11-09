import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "react-router-dom";

const categories = ["All", "Date", "Wedding", "Meeting"];

const products = [
  {
    id: "1",
    name: "Grey Sweatshirt",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
    category: "Date",
  },
  {
    id: "2",
    name: "Blazer",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5733fe07d0379d4603f09daf73e15172a0238868?width=332",
    category: "Meeting",
  },
  {
    id: "3",
    name: "Semi Jodhpuri",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7e08f4483bca8ca3f4807d74dc76e8eefab7e34c?width=332",
    category: "Wedding",
  },
  {
    id: "4",
    name: "Red Suit",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/6689b7d8e5c4791bff1dd83b9835b404a801598d?width=332",
    category: "Wedding",
  },
  {
    id: "5",
    name: "Black Polo Tee",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b71b53062dd94077de460ff5d1376f2617207c58?width=332",
    category: "Date",
  },
  {
    id: "6",
    name: "Green Kurta",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/3c2eef8d30113eedc46cd563ea7a9f21d58127f0?width=332",
    category: "Wedding",
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12">
        

        <h2 className="font-unbounded font-bold text-base sm:text-lg text-foreground tracking-[0.25px] mb-2">
          LOOK READY
        </h2>
        <h1 className="font-unbounded font-bold text-[28px] sm:text-4xl lg:text-5xl leading-normal text-foreground tracking-[0.25px] mb-4">
          ANYTIME,
          <br />
          ANYWHERE
        </h1>
        <p className="font-helvetica text-base sm:text-lg text-foreground mb-8 max-w-3xl">
          Discover occasion-ready fits that match your vibe and the moment.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-5 h-8 sm:h-9 rounded-full font-helvetica text-base sm:text-sm md:text-base transition-colors ${
                selectedCategory === category
                  ? "bg-brand-orange text-white font-bold"
                  : "text-foreground font-normal"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              onAddToCart={() => console.log(`Added ${product.name} to cart`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
