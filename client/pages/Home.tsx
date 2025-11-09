import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Filter } from "lucide-react";

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
  {
    id: "7",
    name: "Navy Blue Blazer",
    price: 129.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5733fe07d0379d4603f09daf73e15172a0238868?width=332",
    category: "Meeting",
  },
  {
    id: "8",
    name: "White Shirt",
    price: 79.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
    category: "Meeting",
  },
  {
    id: "9",
    name: "Casual Denim Jacket",
    price: 89.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b71b53062dd94077de460ff5d1376f2617207c58?width=332",
    category: "Date",
  },
  {
    id: "10",
    name: "Embroidered Sherwani",
    price: 199.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/7e08f4483bca8ca3f4807d74dc76e8eefab7e34c?width=332",
    category: "Wedding",
  },
  // {
  //   id: "11",
  //   name: "Formal Trousers",
  //   price: 89.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/5733fe07d0379d4603f09daf73e15172a0238868?width=332",
  //   category: "Meeting",
  // },
  // {
  //   id: "12",
  //   name: "Striped T-Shirt",
  //   price: 69.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
  //   category: "Date",
  // },
  // {
  //   id: "13",
  //   name: "Silk Kurta Set",
  //   price: 149.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/3c2eef8d30113eedc46cd563ea7a9f21d58127f0?width=332",
  //   category: "Wedding",
  // },
  // {
  //   id: "14",
  //   name: "Business Suit",
  //   price: 179.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/6689b7d8e5c4791bff1dd83b9835b404a801598d?width=332",
  //   category: "Meeting",
  // },
  // {
  //   id: "15",
  //   name: "Hoodie",
  //   price: 84.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
  //   category: "Date",
  // },
  // {
  //   id: "16",
  //   name: "Wedding Blazer",
  //   price: 159.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/5733fe07d0379d4603f09daf73e15172a0238868?width=332",
  //   category: "Wedding",
  // },
  // {
  //   id: "17",
  //   name: "Chinos",
  //   price: 74.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/b71b53062dd94077de460ff5d1376f2617207c58?width=332",
  //   category: "Date",
  // },
  // {
  //   id: "18",
  //   name: "Formal Shirt",
  //   price: 79.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
  //   category: "Meeting",
  // },
  // {
  //   id: "19",
  //   name: "Designer Kurta",
  //   price: 119.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/7e08f4483bca8ca3f4807d74dc76e8eefab7e34c?width=332",
  //   category: "Wedding",
  // },
  // {
  //   id: "20",
  //   name: "Casual Shirt",
  //   price: 69.0,
  //   image: "https://api.builder.io/api/v1/image/assets/TEMP/3c2eef8d30113eedc46cd563ea7a9f21d58127f0?width=332",
  //   category: "Date",
  // },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="font-unbounded font-bold text-sm sm:text-base text-brand-orange tracking-[0.25px] mb-3 uppercase">
            LOOK READY
          </h2>
          <h1 className="font-unbounded font-bold text-3xl sm:text-4xl lg:text-6xl leading-tight text-foreground tracking-[0.25px] mb-4">
            ANYTIME,
            <br />
            ANYWHERE
          </h1>
          <p className="font-sans text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto mb-8">
            Discover occasion-ready fits that match your vibe and the moment.
          </p>
        </div>

        {/* Search Bar - Zara Style */}
        <div className="mb-12 max-w-md mx-auto">
          <div className="relative">
            <label className="block mb-1">
              <span className="font-sans font-normal text-sm text-foreground uppercase tracking-wide">
                SEARCH
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder=""
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-0 border-b-2 border-foreground/20 focus:outline-none focus:border-foreground pb-1 font-sans text-base text-foreground placeholder:text-foreground/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors text-lg leading-none"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-10 lg:mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Filter className="w-4 h-4 text-foreground/60" />
            <h3 className="font-sans font-semibold text-sm text-foreground/70 uppercase tracking-wider">
              Filter by Category
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2.5 rounded-xl font-sans text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-brand-orange text-white shadow-md shadow-brand-orange/30"
                    : "bg-white text-foreground border border-brand-gold/20 hover:border-brand-orange hover:bg-brand-orange/5"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {filteredProducts.length > 0 && (
          <div className="mb-6">
            <p className="font-sans text-sm text-foreground/60">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              {searchQuery && ` for "${searchQuery}"`}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 lg:py-24">
            <div className="max-w-md mx-auto">
              <h3 className="font-sans font-normal text-sm text-foreground mb-3 uppercase tracking-wide">
                No products found
              </h3>
              <p className="font-sans text-sm text-foreground/60 mb-8">
                {searchQuery
                  ? `We couldn't find any products matching "${searchQuery}". Try a different search term.`
                  : `No products available in the "${selectedCategory}" category.`}
              </p>
              {(searchQuery || selectedCategory !== "All") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="font-sans font-normal text-sm text-foreground uppercase tracking-wide border-b-2 border-foreground/20 hover:border-foreground transition-colors pb-1"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
