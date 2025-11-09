import { cn } from "@/lib/utils";

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function GradientButton({ variant = "primary", className, children, ...props }: GradientButtonProps) {
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "absolute inset-0 rounded-[20px] blur-[2px]",
          variant === "primary"
            ? "bg-gradient-to-r from-[#C6302D] via-[#C6302D] to-[#EAB851]"
            : "bg-gradient-to-r from-[#EAB851] to-[#C6302D]",
          "translate-x-1.5 translate-y-1.5"
        )}
      />
      <button
        className={cn(
          "relative w-full h-[70px] rounded-[22px] border font-helvetica font-bold text-white text-base",
          variant === "primary"
            ? "bg-gradient-to-r from-[rgba(198,48,45,0.7)] via-[rgba(198,48,45,0.7)] to-[rgba(234,184,81,0.7)] border-brand-red-dark"
            : "bg-gradient-to-r from-[#EAB851] to-[#C6302D] border-brand-gold",
          className
        )}
        {...props}
      >
        {children}
      </button>
    </div>
  );
}
