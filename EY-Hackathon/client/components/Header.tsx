import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart } from "lucide-react";
import { GradientButton } from "@/components/GradientButton";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-brand-gold/30 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-orange" />
            <span className="hidden sm:block font-unbounded font-bold text-foreground">Cosmos</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) => `font-helvetica text-sm ${isActive ? "font-bold text-foreground" : "text-foreground/80 hover:text-foreground"}`}>
            Home
          </NavLink>
          <NavLink to="/recycle" className={({ isActive }) => `font-helvetica text-sm ${isActive ? "font-bold text-foreground" : "text-foreground/80 hover:text-foreground"}`}>
            Recycle
          </NavLink>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/register">
            <GradientButton className="h-9 px-4 text-sm">Register</GradientButton>
          </Link>
          <Link to="/cart" className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-foreground" />
          </Link>
        </div>

        <button
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded border border-brand-gold"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-brand-gold/30 bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 flex flex-col gap-4">
            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => `font-helvetica ${isActive ? "font-bold text-foreground" : "text-foreground/80"}`}>
              Home
            </NavLink>
            <NavLink to="/recycle" onClick={() => setOpen(false)} className={({ isActive }) => `font-helvetica ${isActive ? "font-bold text-foreground" : "text-foreground/80"}`}>
              Recycle
            </NavLink>
            <Link to="/register" onClick={() => setOpen(false)}>
              <GradientButton className="w-full justify-center h-10">Register</GradientButton>
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)} className="inline-flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;


