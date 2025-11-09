import { useState } from "react";
import { GradientButton } from "@/components/GradientButton";

export default function OldClothesExchange() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Uploaded images:", selectedImages);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT COLUMN — Image */}
          <div className="order-2 md:order-1">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/0939fc4996c03efa5ec77ec390ceb7facc75f7dc?width=704"
              alt="Recycle fashion"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[22px] mb-8"
            />
          </div>

          {/* RIGHT COLUMN — Text + Upload Form */}
          <div className="order-1 md:order-2 max-w-lg">
            <h2 className="font-unbounded font-bold text-lg sm:text-xl tracking-[0.25px] text-brand-gold mb-3">
              RECYCLE FASHION
            </h2>

            <h1 className="font-unbounded font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[0.25px] text-foreground mb-6">
              REWARD
              <br />
              YOURSELF
            </h1>

            <p className="font-sans text-lg sm:text-xl text-foreground mb-10 leading-relaxed">
              Sustainable style starts here — exchange, earn, and repeat.
            </p>

            <form onSubmit={handleUpload} className="space-y-6">
              <div className="relative w-full h-[200px] border-[3px] border-dashed border-[#373737] rounded-[22px] flex items-center justify-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="relative">
                  <div className="absolute inset-0 w-10 h-10 bg-brand-gold rounded-2xl translate-x-[3px] translate-y-[3px]" />
                  <div className="relative w-[46px] h-[46px] rounded-[18px] border border-brand-gold bg-white flex items-center justify-center">
                    <span className="font-unbounded text-xl text-foreground">+</span>
                  </div>
                </div>
              </div>

              {selectedImages.length > 0 && (
                <p className="text-sm text-center text-gray-600">
                  {selectedImages.length} image{selectedImages.length > 1 ? "s" : ""} selected
                </p>
              )}

              <p className="text-center font-sans text-base sm:text-lg text-foreground">
                Upload pictures of your clothes
              </p>

              <GradientButton type="submit" variant="primary" className="w-full">
                Upload
              </GradientButton>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}