import { useState } from "react";
import { GradientButton } from "@/components/GradientButton";

interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "GREY SWE...",
      price: 99.0,
      size: "Large",
      quantity: 2,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/28bb0f0f3a5526766df06bb1d18c3abad8b8e162?width=296",
    },
    {
      id: "2",
      name: "BLACK BL...",
      price: 99.0,
      size: "Large",
      quantity: 1,
      image: "https://api.builder.io/api/v1/image/assets/TEMP/c80397b057e7ff7f86c37f917adea82bb2434d1c?width=296",
    },
  ]);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 20.0;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[390px] mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-unbounded font-bold text-[28px] leading-normal tracking-[0.25px] text-foreground">
            CART
          </h1>
          <div className="w-10 h-10 rounded-full border border-[#373737] overflow-hidden">
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/14faff47a41c720b383bdcac66f42fc8d590fa40?width=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="space-y-8 mb-8">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-[148px] h-[161px] object-cover rounded-[22px]"
              />
              <div className="flex-1">
                <h3 className="font-unbounded font-bold text-xl tracking-[0.25px] text-foreground mb-2">
                  {item.name}
                </h3>
                <p className="font-unbounded font-bold text-base tracking-[0.25px] text-foreground mb-2">
                  ${item.price.toFixed(2)}
                </p>
                <p className="font-helvetica text-base text-foreground mb-4">
                  Size : <span className="font-bold">{item.size}</span>
                </p>
                <div className="relative w-[106px] h-[38px]">
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C6302D] to-[#EAB851] translate-x-[3px] translate-y-[3px]" />
                  <div className="relative w-full h-full rounded-xl border border-brand-red-dark bg-white flex items-center justify-center">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="px-2 font-unbounded text-base text-foreground"
                    >
                      -
                    </button>
                    <span className="px-3 font-unbounded text-base text-foreground">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="px-2 font-unbounded text-base text-foreground"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between font-helvetica text-base">
            <span className="text-foreground">Sub Total</span>
            <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-helvetica text-base">
            <span className="text-foreground">Shipping Fee</span>
            <span className="font-bold text-foreground">${shippingFee.toFixed(2)}</span>
          </div>
          <div className="h-px bg-[#373737]" />
          <div className="flex justify-between font-helvetica text-base">
            <span className="text-foreground">Total</span>
            <span className="font-bold text-foreground">${total.toFixed(2)}</span>
          </div>
        </div>

        <GradientButton variant="primary">Checkout</GradientButton>
      </div>
    </div>
  );
}
