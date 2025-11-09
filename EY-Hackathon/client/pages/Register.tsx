import { useState } from "react";
import { FormInput } from "@/components/FormInput";
import { GradientButton } from "@/components/GradientButton";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register:", { email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 w-full">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 md:order-1">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/203ce7e1771f7cde3a51a410bb5dc6a9ffc73d4c?width=704"
              alt="Brand illustration"
              className="w-full h-[300px] md:h-[400px] lg:h-[500px] object-cover rounded-[22px] mb-8"
            />
          </div>

          <div className="order-1 md:order-2 max-w-lg">
            <h2 className="font-unbounded font-bold text-lg sm:text-xl tracking-[0.25px] text-brand-orange mb-3">
              REGISTER
            </h2>
            <h1 className="font-unbounded font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-[0.25px] text-brand-orange mb-6">
              START YOUR
              <br />
              JOURNEY NOW
            </h1>
            <p className="font-sans text-lg sm:text-xl text-brand-orange mb-10 leading-relaxed">
              Join the future of fashion — smart styling, seamless try-ons, and sustainable
              rewards.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5 mb-8">
              <FormInput
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <FormInput
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FormInput
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </form>

            <p className="text-center font-sans text-base sm:text-lg text-brand-orange mb-6">
              Already have an account?{" "}
              <span className="font-bold text-brand-orange"><a href="" className="hover:underline">Login</a></span>
            </p>

            <GradientButton type="submit" variant="primary" className="w-full">
              Register
            </GradientButton>
          </div>
        </div>
      </div>
    </div>
  );
}