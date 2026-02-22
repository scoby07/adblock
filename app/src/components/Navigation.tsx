import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X, Chrome, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-300/90 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-[92vw] max-w-[1200px] mx-auto">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-cyan/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan" />
              </div>
              <span className="text-lg font-bold text-white hidden sm:block">AdBlock Pro</span>
            </Link>

            {/* Desktop Navigation */}
            {isLandingPage && (
              <div className="hidden md:flex items-center gap-8">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-text-secondary hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            )}

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/10 flex items-center gap-2"
                  >
                    <img src={user?.avatar} alt={user?.name} className="w-6 h-6 rounded-full" />
                    {user?.name}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                      Sign in
                    </Button>
                  </Link>
                  <Button className="bg-cyan hover:bg-cyan-600 text-navy font-semibold rounded-full px-6">
                    <Chrome className="w-4 h-4 mr-2" />
                    Get AdBlock Pro
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden w-10 h-10 flex items-center justify-center text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-navy-300/98 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {isLandingPage &&
            navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollToSection(link.href)}
                className="text-2xl font-semibold text-white hover:text-cyan transition-colors"
              >
                {link.label}
              </button>
            ))}

          <div className="flex flex-col gap-4 mt-8">
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  size="lg"
                  className="bg-cyan hover:bg-cyan-600 text-navy font-semibold rounded-full px-8"
                >
                  <User className="w-5 h-5 mr-2" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/20 text-white hover:bg-white/10 rounded-full px-8"
                  >
                    Sign in
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-cyan hover:bg-cyan-600 text-navy font-semibold rounded-full px-8"
                >
                  <Chrome className="w-5 h-5 mr-2" />
                  Get AdBlock Pro
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
