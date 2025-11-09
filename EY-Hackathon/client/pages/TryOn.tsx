import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Camera, RotateCcw, Download, Share2 } from "lucide-react";
import { GradientButton } from "@/components/GradientButton";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

export default function TryOn() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItem } = useCart();

  // Get product data from location state or use defaults
  const productData = location.state || {
    name: "GREY SWEATSHIRT",
    price: 99.0,
    image: "https://api.builder.io/api/v1/image/assets/TEMP/a29472c3f6e32e843ed70ea44a01356a42c57941?width=682",
    images: [
      "https://api.builder.io/api/v1/image/assets/TEMP/a29472c3f6e32e843ed70ea44a01356a42c57941?width=682",
      "https://api.builder.io/api/v1/image/assets/TEMP/06893b6c82b1bf2a92b9512324fe2768ba1153c1?width=680",
      "https://api.builder.io/api/v1/image/assets/TEMP/e78b67ea7b1405d80b7f70ab4178313f607bf242?width=682",
    ],
  };

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cameraActive, setCameraActive] = useState(false);
  const [mirrorMode, setMirrorMode] = useState(true);

  const handleAddToCart = () => {
    addItem(
      {
        id: id || "try-on",
        name: productData.name,
        price: productData.price,
        image: productData.images?.[selectedImageIndex] || productData.image,
      },
      1
    );
    toast.success("Added to cart");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Try on ${productData.name}`,
        text: `Check out this ${productData.name} on Cosmos!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-2xl flex items-center justify-center shadow-md hover:shadow-lg transition-shadow border border-brand-gold/20"
          >
            <ArrowLeft className="w-5 h-5 lg:w-6 lg:h-6 text-foreground" />
          </button>
          <h1 className="font-unbounded font-bold text-xl sm:text-2xl lg:text-3xl text-foreground">
            Virtual Try On
          </h1>
          <div className="w-10 h-10 lg:w-12 lg:h-12" /> {/* Spacer for centering */}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Try On View Area */}
          <div className="space-y-4">
            <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 rounded-[22px] overflow-hidden border-2 border-brand-gold/30">
              {cameraActive ? (
                <div className="w-full h-full flex items-center justify-center bg-black/50">
                  <div className="text-center space-y-4">
                    <Camera className="w-16 h-16 text-white mx-auto animate-pulse" />
                    <p className="font-sans text-white text-lg">Camera access required</p>
                    <p className="font-sans text-white/70 text-sm">Allow camera access to try on virtually</p>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={productData.images?.[selectedImageIndex] || productData.image}
                    alt={productData.name}
                    className={`w-full h-full object-cover ${mirrorMode ? "scale-x-[-1]" : ""}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="font-sans text-white text-sm sm:text-base font-semibold">
                      {productData.name}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setCameraActive(!cameraActive)}
                className={`flex-1 min-w-[120px] h-12 rounded-xl border-2 font-sans font-semibold transition-all ${
                  cameraActive
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-foreground border-brand-gold hover:bg-brand-gold/10"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Camera className="w-4 h-4" />
                  <span>{cameraActive ? "Stop Camera" : "Start Camera"}</span>
                </div>
              </button>

              <button
                onClick={() => setMirrorMode(!mirrorMode)}
                className={`flex-1 min-w-[120px] h-12 rounded-xl border-2 font-sans font-semibold transition-all ${
                  mirrorMode
                    ? "bg-brand-orange text-white border-brand-orange"
                    : "bg-white text-foreground border-brand-gold hover:bg-brand-gold/10"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  <span>Mirror</span>
                </div>
              </button>

              <button
                onClick={handleShare}
                className="flex-1 min-w-[120px] h-12 rounded-xl border-2 border-brand-gold bg-white text-foreground font-sans font-semibold hover:bg-brand-gold/10 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </div>
              </button>

              <button
                onClick={() => {
                  // Simulate screenshot/download
                  toast.success("Screenshot saved!");
                }}
                className="flex-1 min-w-[120px] h-12 rounded-xl border-2 border-brand-gold bg-white text-foreground font-sans font-semibold hover:bg-brand-gold/10 transition-all"
              >
                <div className="flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>Save</span>
                </div>
              </button>
            </div>

            {/* Image Thumbnails */}
            {productData.images && productData.images.length > 1 && (
              <div>
                <p className="font-sans font-semibold text-sm text-foreground/70 mb-3">
                  Select View:
                </p>
                <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
                  {productData.images.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImageIndex === idx
                          ? "border-brand-orange shadow-md"
                          : "border-transparent hover:border-brand-gold/50"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`View ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Info & Actions */}
          <div className="flex flex-col">
            <div className="mb-6">
              <h3 className="font-unbounded font-bold text-base sm:text-lg tracking-[0.25px] text-foreground mb-2">
                DATE/ TRAVEL
              </h3>
              <h2 className="font-unbounded font-bold text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-[0.25px] text-foreground mb-4">
                {productData.name}
              </h2>
              <p className="font-sans font-bold text-2xl sm:text-3xl text-foreground mb-6">
                ${productData.price.toFixed(2)}
              </p>
            </div>

            {/* Instructions */}
            <div className="bg-brand-gold/10 rounded-[22px] p-6 mb-6">
              <h4 className="font-sans font-bold text-lg text-foreground mb-3">
                How to Try On:
              </h4>
              <ol className="font-sans text-base text-foreground space-y-2 list-decimal list-inside">
                <li>Click "Start Camera" to enable your camera</li>
                <li>Allow camera access when prompted</li>
                <li>Position yourself in front of the camera</li>
                <li>Use the mirror toggle to flip the view</li>
                <li>Try different product views using thumbnails</li>
                <li>Save or share your try-on session</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <GradientButton
                variant="primary"
                className="w-full h-14 lg:h-16 text-base lg:text-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </GradientButton>

              <button
                onClick={() => navigate(`/product/${id || ""}`)}
                className="w-full h-12 rounded-xl border-2 border-brand-gold bg-white text-foreground font-sans font-semibold hover:bg-brand-gold/10 transition-all"
              >
                View Product Details
              </button>
            </div>

            {/* Tips */}
            <div className="mt-6 p-4 bg-white border border-brand-gold/20 rounded-xl">
              <p className="font-sans text-sm text-foreground/70">
                <span className="font-bold">Tip:</span> For best results, ensure good lighting and stand
                at a comfortable distance from your camera.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
