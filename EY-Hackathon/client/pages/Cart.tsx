import { GradientButton } from "@/components/GradientButton";
import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { items, updateQuantity, removeItem, clear } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = items.length > 0 ? 20.0 : 0;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 w-full">
        <div className="flex items-center justify-between mb-8 lg:mb-12">
          <h1 className="font-unbounded font-bold text-3xl sm:text-4xl lg:text-5xl leading-normal tracking-[0.25px] text-foreground">
            CART
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="space-y-6 lg:space-y-8 mb-8">
              {items.length === 0 && (
                <div className="text-center py-16 lg:py-24">
                  <p className="font-sans text-lg sm:text-xl text-foreground/70 mb-6">Your cart is empty.</p>
                  <Link to="/" className="inline-block">
                    <GradientButton className="h-12 px-8 text-base">Continue Shopping</GradientButton>
                  </Link>
                </div>
              )}
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 lg:gap-8 p-4 lg:p-6 bg-white border border-brand-gold/20 rounded-[22px] hover:shadow-lg transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[200px] h-[220px] sm:w-[250px] sm:h-[270px] lg:w-[300px] lg:h-[320px] object-cover rounded-[22px] flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-unbounded font-bold text-xl sm:text-2xl lg:text-3xl tracking-[0.25px] text-foreground mb-3">
                        {item.name}
                      </h3>
                      <p className="font-unbounded font-bold text-xl sm:text-2xl tracking-[0.25px] text-foreground mb-4">
                        ${item.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="font-sans text-base sm:text-lg text-foreground/70 underline hover:text-foreground mb-4 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    
                    <div className="relative w-[120px] h-[44px] sm:w-[140px] sm:h-[48px]">
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#C6302D] to-[#EAB851] translate-x-[3px] translate-y-[3px]" />
                      <div className="relative w-full h-full rounded-xl border border-brand-red-dark bg-white flex items-center justify-center">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="px-3 font-unbounded text-lg sm:text-xl text-foreground hover:bg-foreground/5 rounded-l-xl transition-colors"
                        >
                          -
                        </button>
                        <span className="px-4 font-unbounded text-lg sm:text-xl text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 font-unbounded text-lg sm:text-xl text-foreground hover:bg-foreground/5 rounded-r-xl transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8">
              <div className="bg-white border border-brand-gold/20 rounded-[22px] p-6 lg:p-8">
                <h2 className="font-unbounded font-bold text-xl sm:text-2xl text-foreground mb-6">
                  Order Summary
                </h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between font-sans text-base sm:text-lg">
                    <span className="text-foreground/70">Sub Total</span>
                    <span className="font-bold text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-sans text-base sm:text-lg">
                    <span className="text-foreground/70">Shipping Fee</span>
                    <span className="font-bold text-foreground">${shippingFee.toFixed(2)}</span>
                  </div>
                  <div className="h-px bg-[#373737] my-4" />
                  <div className="flex justify-between font-sans text-lg sm:text-xl">
                    <span className="font-bold text-foreground">Total</span>
                    <span className="font-bold text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <GradientButton variant="primary" disabled={items.length === 0} className="w-full h-12 text-base">
                    Checkout
                  </GradientButton>
                  {items.length > 0 && (
                    <button
                      onClick={clear}
                      className="h-12 px-4 rounded-xl border border-brand-gold font-sans text-base text-foreground hover:bg-foreground/5 transition-colors"
                    >
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}