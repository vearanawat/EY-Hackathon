import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

const sizes = ["S", "M", "L", "XL", "XXL"];

const relatedProducts = [
  {
    id: "1",
    name: "Grey Sweatshirt",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/b9157fac9304d6907ea1ab323c75bc240730ecdb?width=332",
  },
  {
    id: "2",
    name: "Blazer",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/5733fe07d0379d4603f09daf73e15172a0238868?width=332",
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("L");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  const productImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/a29472c3f6e32e843ed70ea44a01356a42c57941?width=682",
    "https://api.builder.io/api/v1/image/assets/TEMP/06893b6c82b1bf2a92b9512324fe2768ba1153c1?width=680",
    "https://api.builder.io/api/v1/image/assets/TEMP/e78b67ea7b1405d80b7f70ab4178313f607bf242?width=682",
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 w-full">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 lg:mb-8 w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow border border-brand-gold/20"
        >
          <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
        </button>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square max-w-full">
              <img
                src={productImages[currentImageIndex]}
                alt="Product view"
                className="w-full h-full object-cover rounded-[22px]"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-3 lg:gap-4 overflow-x-auto scrollbar-hide pb-2">
              {productImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? "border-brand-orange shadow-md"
                      : "border-transparent hover:border-brand-gold/50"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Product view ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h3 className="font-unbounded font-bold text-base sm:text-lg tracking-[0.25px] text-foreground mb-3">
              DATE/ TRAVEL
            </h3>
            <h1 className="font-unbounded font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[0.25px] text-foreground mb-4">
              GREY SWEATSHIRT
            </h1>
            <p className="font-sans font-bold text-2xl sm:text-3xl text-foreground mb-6">
              $99.00
            </p>
            <p className="font-sans text-base sm:text-lg lg:text-xl text-foreground mb-8 leading-relaxed">
              H&M' inspired cotton sweatshirt, great for long travel & lunch dates
            </p>

            <div className="mb-8">
              <h4 className="font-sans font-bold text-lg sm:text-xl text-foreground mb-4">
                Size
              </h4>
              <div className="flex gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-lg flex items-center justify-center font-sans text-base lg:text-lg font-semibold transition-all ${
                      selectedSize === size
                        ? "bg-brand-orange text-white shadow-md"
                        : "text-foreground border-2 border-foreground/20 hover:border-brand-orange"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#C6302D] to-[#EAB851] translate-x-1.5 translate-y-1.5 blur-[2px]" />
                <button
                  onClick={() => {
                    navigate(`/product/${id}/try-on`, {
                      state: {
                        name: "GREY SWEATSHIRT",
                        price: 99.0,
                        image: productImages[currentImageIndex],
                        images: productImages,
                      },
                    });
                  }}
                  className="relative w-full h-14 lg:h-16 rounded-[22px] border border-brand-red-dark bg-gradient-to-r from-[#C6302D] to-[#EAB851] font-sans font-bold text-white text-base lg:text-lg hover:opacity-90 transition-opacity"
                >
                  Try On
                </button>
              </div>
              <div className="relative flex-1">
                <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#EAB851] to-[#C6302D] translate-x-1.5 translate-y-1.5 blur-[2px]" />
                <button
                  className="relative w-full h-14 lg:h-16 rounded-[22px] border border-brand-gold bg-gradient-to-l from-[#C6302D] to-[#EAB851] font-sans font-bold text-white text-base lg:text-lg hover:opacity-90 transition-opacity"
                  onClick={() => {
                    const productId = id ?? "detail";
                    addItem(
                      {
                        id: `${productId}`,
                        name: "GREY SWEATSHIRT",
                        price: 99.0,
                        image: productImages[currentImageIndex],
                      },
                      1
                    );
                    toast.success("Added to cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="mb-8">
              <h4 className="font-sans font-bold text-lg sm:text-xl text-foreground mb-4">
                Highlights:
              </h4>
              <ul className="font-sans text-base sm:text-lg text-foreground space-y-2 leading-relaxed">
                <li>• Lorem ipsum dolor sit amet consectetur.</li>
                <li>• Euismod in purus lectus dictum.</li>
                <li>• Nunc et ut nibh ut mi semper pharetra amet.</li>
                <li>• Aliquet proin mattis phasellus suspendisse odio pharetra amet laoreet.</li>
                <li>• Ac nunc duis pharetra turpis sit.</li>
                <li>• Ultrices et suspendisse neque aliquet tempus.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Ratings & Reviews Section */}
        <div className="mb-12 lg:mb-16">
          <div className="bg-white border border-brand-gold/20 rounded-[22px] p-6 lg:p-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Left Column: Overall Rating */}
              <div className="space-y-4">
                <h3 className="font-unbounded font-bold text-2xl sm:text-3xl lg:text-4xl text-brand-orange mb-2">
                  Ratings & Reviews
                </h3>
                
                <div className="space-y-3">
                  <p className="font-sans font-bold text-3xl sm:text-4xl text-foreground">
                    Good
                  </p>
                  
                  {/* Star Rating */}
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-6 h-6 sm:w-7 sm:h-7 ${
                          star <= 4
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-none text-yellow-400"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-sans font-semibold text-lg sm:text-xl text-foreground">
                      4.0
                    </span>
                  </div>
                  
                  <p className="font-sans text-base sm:text-lg text-foreground/70">
                    8 ratings and 0 reviews
                  </p>
                  
                  <button className="font-sans font-semibold text-base sm:text-lg text-[#9FBEFF] hover:text-brand-orange transition-colors mt-4">
                    View All Reviews
                  </button>
                </div>
              </div>

              {/* Right Column: Star Distribution */}
              <div className="space-y-4">
                <h4 className="font-sans font-bold text-xl sm:text-2xl text-[#9FBEFF] mb-4">
                  Rate Product
                </h4>
                
                <div className="space-y-3">
                  {/* 5 Stars */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <span className="font-sans text-sm text-foreground/70">5</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "75%" }}
                      />
                    </div>
                    <span className="font-sans text-sm text-foreground/70 min-w-[30px] text-right">75%</span>
                  </div>

                  {/* 4 Stars */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <span className="font-sans text-sm text-foreground/70">4</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "55%" }}
                      />
                    </div>
                    <span className="font-sans text-sm text-foreground/70 min-w-[30px] text-right">55%</span>
                  </div>

                  {/* 3 Stars */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <span className="font-sans text-sm text-foreground/70">3</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "35%" }}
                      />
                    </div>
                    <span className="font-sans text-sm text-foreground/70 min-w-[30px] text-right">35%</span>
                  </div>

                  {/* 2 Stars */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <span className="font-sans text-sm text-foreground/70">2</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "5%" }}
                      />
                    </div>
                    <span className="font-sans text-sm text-foreground/70 min-w-[30px] text-right">5%</span>
                  </div>

                  {/* 1 Star */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 min-w-[80px]">
                      <span className="font-sans text-sm text-foreground/70">1</span>
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: "15%" }}
                      />
                    </div>
                    <span className="font-sans text-sm text-foreground/70 min-w-[30px] text-right">15%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div>
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <h3 className="font-unbounded font-bold text-2xl sm:text-3xl text-brand-orange">
              More like this
            </h3>
            <button className="font-sans font-bold text-sm sm:text-base text-[#9FBEFF] hover:text-brand-orange transition-colors">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 sm:gap-6 pb-8">
            {relatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
