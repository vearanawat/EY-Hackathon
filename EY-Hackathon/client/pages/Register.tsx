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
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto px-5 py-13">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/203ce7e1771f7cde3a51a410bb5dc6a9ffc73d4c?width=704"
          alt="Brand illustration"
          className="w-full h-[144px] object-cover rounded-[22px] mb-28"
        />

        <h2 className="font-unbounded font-bold text-base tracking-[0.25px] text-brand-orange mb-2">
          REGISTER
        </h2>
        <h1 className="font-unbounded font-bold text-[28px] leading-normal tracking-[0.25px] text-brand-orange mb-4">
          START YOUR
          <br />
          JOURNEY NOW
        </h1>
        <p className="font-helvetica text-base text-brand-orange mb-8">
          Join the future of fashion — smart styling, seamless try-ons, and sustainable
          rewards.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
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

        <p className="text-center font-helvetica text-base text-brand-orange mb-6">
          Already have an account?{" "}
          <span className="font-bold text-white">Login</span>
        </p>

        <GradientButton type="submit" variant="primary">
          Register
        </GradientButton>
      </div>
    </div>
  );
}
