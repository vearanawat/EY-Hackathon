import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-brand-gold/30 bg-white mt-auto">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-brand-orange rounded" />
              <span className="font-unbounded font-bold text-xl text-foreground">Cosmos</span>
            </Link>
            <p className="font-sans text-sm text-foreground/70">
              Smart styling, seamless try-ons, and sustainable rewards.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-unbounded font-bold text-base text-foreground">Shop</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/recycle" className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors">
                Recycle
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-unbounded font-bold text-base text-foreground">Account</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/register" className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors">
                Register
              </Link>
              <Link to="/cart" className="font-sans text-sm text-foreground/70 hover:text-foreground transition-colors">
                Cart
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-unbounded font-bold text-base text-foreground">Contact</h3>
            <p className="font-sans text-sm text-foreground/70">
              support@cosmos.com
            </p>
            <p className="font-sans text-sm text-foreground/70">
              +1 (555) 123-4567
            </p>
          </div>
        </div>
        
        <div className="border-t border-brand-gold/30 pt-8">
          <p className="font-sans text-sm text-center text-foreground/70">
            © {new Date().getFullYear()} Cosmos. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

