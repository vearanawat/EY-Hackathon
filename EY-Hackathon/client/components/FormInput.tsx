import { cn } from "@/lib/utils";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function FormInput({ label, className, ...props }: FormInputProps) {
  return (
    <div className="relative w-full h-14">
      <input
        className={cn(
          "w-full h-14 rounded-xl border border-[#3E3E3C] bg-white px-6 pt-5 pb-3",
          "font-helvetica text-sm text-brand-orange placeholder:text-brand-orange",
          "focus:outline-none focus:ring-2 focus:ring-brand-orange/20",
          className
        )}
        placeholder={label}
        {...props}
      />
    </div>
  );
}
