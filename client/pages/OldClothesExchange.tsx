import { useState } from "react";
import { GradientButton } from "@/components/GradientButton";

export default function OldClothesExchange() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto px-5 py-13">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/0939fc4996c03efa5ec77ec390ceb7facc75f7dc?width=704"
          alt="Recycle fashion"
          className="w-full h-[175px] object-cover rounded-[22px] mb-28"
        />

        <h2 className="font-unbounded font-bold text-base tracking-[0.25px] text-foreground mb-2">
          RECYCLE FASHION
        </h2>
        <h1 className="font-unbounded font-bold text-[28px] leading-normal tracking-[0.25px] text-foreground mb-4">
          REWARD
          <br />
          YOURSELF
        </h1>
        <p className="font-helvetica text-base text-foreground mb-12">
          Sustainable style starts here — exchange, earn, and repeat.
        </p>

        <div className="relative w-[173px] h-[187px] mx-auto mb-4 border-[3px] border-dashed border-[#373737] rounded-[22px] flex items-center justify-center">
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

        <p className="text-center font-helvetica text-base text-foreground mb-32">
          Upload Pictures of your clothes
        </p>

        <GradientButton variant="primary">Upload</GradientButton>
      </div>
    </div>
  );
}
