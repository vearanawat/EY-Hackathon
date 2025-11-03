import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";

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

  const productImages = [
    "https://api.builder.io/api/v1/image/assets/TEMP/a29472c3f6e32e843ed70ea44a01356a42c57941?width=682",
    "https://api.builder.io/api/v1/image/assets/TEMP/06893b6c82b1bf2a92b9512324fe2768ba1153c1?width=680",
    "https://api.builder.io/api/v1/image/assets/TEMP/e78b67ea7b1405d80b7f70ab4178313f607bf242?width=682",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto">
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 px-5 py-11">
              {productImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Product view ${idx + 1}`}
                  className="min-w-[341px] h-[369px] object-cover rounded-[22px] cursor-pointer"
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="absolute top-14 left-9 w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <div className="px-6">
          <h3 className="font-unbounded font-bold text-base tracking-[0.25px] text-foreground mb-2">
            DATE/ TRAVEL
          </h3>
          <h1 className="font-unbounded font-bold text-[28px] leading-normal tracking-[0.25px] text-foreground mb-2">
            GREY SWEATSHIRT
          </h1>
          <p className="font-helvetica font-bold text-xl text-foreground mb-4">
            $99.00
          </p>
          <p className="font-helvetica text-base text-foreground mb-8">
            H&M' inspired cotton sweatshirt, great for long travel & lunch dates
          </p>

          <h4 className="font-helvetica font-bold text-base text-foreground mb-4">
            Size
          </h4>
          <div className="flex gap-3 mb-8">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-helvetica text-base transition-colors ${
                  selectedSize === size
                    ? "bg-brand-orange text-white"
                    : "text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex gap-0 mb-8">
            <div className="relative flex-1">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#C6302D] to-[#EAB851] translate-x-1.5 translate-y-1.5 blur-[2px]" />
              <button className="relative w-full h-[103px] rounded-l-[22px] border border-brand-red-dark bg-gradient-to-r from-[#C6302D] to-[#EAB851] font-helvetica font-bold text-white text-base">
                Try On
              </button>
            </div>
            <div className="w-px bg-white" />
            <div className="relative flex-1">
              <div className="absolute inset-0 rounded-[20px] bg-gradient-to-r from-[#EAB851] to-[#C6302D] translate-x-1.5 translate-y-1.5 blur-[2px]" />
              <button className="relative w-full h-[103px] rounded-r-[22px] border border-brand-gold bg-gradient-to-l from-[#C6302D] to-[#EAB851] font-helvetica font-bold text-white text-base">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-helvetica font-bold text-base text-foreground mb-2">
              Highlights:
            </h4>
            <ul className="font-helvetica text-base text-foreground space-y-1 leading-[140%]">
              <li>• Lorem ipsum dolor sit amet consectetur.</li>
              <li>• Euismod in purus lectus dictum.</li>
              <li>• Nunc et ut nibh ut mi semper pharetra amet.</li>
              <li>• Aliquet proin mattis phasellus suspendisse odio pharetra amet laoreet.</li>
              <li>• Ac nunc duis pharetra turpis sit.</li>
              <li>• Ultrices et suspendisse neque aliquet tempus.</li>
            </ul>
          </div>

          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/a2e743eb3673d5f5a256ba41e578e42d4b8a9ca7?width=680"
            alt="Ratings & Reviews"
            className="w-full h-auto mb-6"
          />

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-helvetica font-bold text-base text-brand-orange">
              More like this
            </h3>
            <button className="font-inter font-bold text-xs text-[#9FBEFF]">
              See all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-5 pb-8">
            {relatedProducts.map((product) => (
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
    </div>
  );
}
