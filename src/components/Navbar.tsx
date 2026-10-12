import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, User } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  activeCategory: string;
  onOpenSearch: () => void;
  onScrollToCatalog: () => void;
  onOpenAuth?: () => void;
  currentUser?: { name: string; email: string } | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  activeCategory,
  onOpenSearch,
  onScrollToCatalog,
  onOpenAuth,
  currentUser,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Tất Cả Sản Phẩm', value: 'all' },
    { label: 'Thời Trang', value: 'apparel' },
    { label: 'Đồ Da Thủ Công', value: 'accessories' },
    { label: 'Vật Dụng Nội Thất', value: 'living' },
    { label: 'Đồng Hồ Đo Giờ', value: 'timepieces' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Dismissible Top Announcement Banner */}
      {showBanner && (
        <aside
          aria-label="Thông báo ưu đãi"
          className="relative bg-[#121417] text-[#e6e4df] text-xs py-2 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-white/10"
        >
          <span>Miễn phí vận chuyển trung hòa carbon cho đơn hàng từ $150</span>
          <span className="hidden sm:inline text-amber-300">· Sử dụng mã NOVA10 để giảm 10%</span>
          <button
            onClick={() => setShowBanner(false)}
            aria-label="Đóng thông báo ưu đãi"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
          >
            <X size={13} />
          </button>
        </aside>
      )}

      {/* Primary Top Bar Contract */}
      <div
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-[#e6e4df]'
            : 'bg-[#fbfaf8]/95 backdrop-blur-xs border-b border-[#e6e4df]/60'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-8 animate-fade-in-down">
          {/* Zone 1: Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#121417] whitespace-nowrap hover:opacity-85 transition-opacity"
            >
              NOVA <span className="font-light text-[#c4823f]">STORE</span>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav
            aria-label="Điều hướng chính"
            className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#6b7280]"
          >
            {navLinks.map((link) => {
              const isActive = activeCategory === link.value;
              return (
                <button
                  key={link.value}
                  onClick={() => {
                    onSelectCategory(link.value);
                    onScrollToCatalog();
                  }}
                  className={`relative py-1 whitespace-nowrap transition-colors cursor-pointer text-sm ${
                    isActive
                      ? 'text-[#121417] font-semibold'
                      : 'hover:text-[#121417]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c4823f] rounded-full transition-all duration-300"
                      aria-hidden="true"
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Search, Cart & Mobile Menu) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenSearch}
              aria-label="Mở công cụ tìm kiếm"
              className="p-2.5 text-[#121417] hover:text-[#c4823f] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              <Search size={19} />
            </button>

            {/* Auth / Account Trigger Button */}
            <button
              onClick={onOpenAuth}
              aria-label={currentUser ? `Tài khoản ${currentUser.name}` : 'Đăng nhập hoặc đăng ký'}
              className="p-2.5 text-[#121417] hover:text-[#c4823f] hover:bg-black/5 rounded-full transition-colors cursor-pointer flex items-center gap-1.5 group active:scale-95"
              title={currentUser ? `Hội viên: ${currentUser.name}` : 'Đăng nhập / Đăng ký'}
            >
              <User size={19} />
              {currentUser && (
                <span className="hidden lg:inline text-xs font-semibold max-w-[70px] truncate text-[#c4823f]">
                  {currentUser.name}
                </span>
              )}
            </button>

            <button
              onClick={onOpenCart}
              aria-label={`Xem giỏ hàng với ${cartCount} sản phẩm`}
              className="relative p-2.5 text-[#121417] hover:text-[#c4823f] hover:bg-black/5 rounded-full transition-all cursor-pointer group active:scale-95"
            >
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#121417] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-xs group-hover:bg-[#c4823f] transition-colors">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Đóng bảng điều hướng' : 'Mở bảng điều hướng'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 text-[#121417] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu điều hướng di động"
          className="md:hidden bg-white border-b border-[#e6e4df] shadow-lg animate-fade-in-down"
        >
          <div className="px-6 py-6 space-y-4">
            <p className="text-xs font-semibold tracking-wider text-[#6b7280] uppercase">
              Danh Mục Sản Phẩm
            </p>
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <button
                  key={link.value}
                  onClick={() => {
                    onSelectCategory(link.value);
                    setMobileMenuOpen(false);
                    onScrollToCatalog();
                  }}
                  className={`flex items-center justify-between text-base py-2 text-left transition-colors ${
                    activeCategory === link.value
                      ? 'text-[#c4823f] font-semibold'
                      : 'text-[#1a1c1e] hover:text-[#c4823f]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={16} className="opacity-50" />
                </button>
              ))}

              <div className="pt-2 border-t border-[#e6e4df]">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="w-full py-2.5 px-3 bg-[#121417] text-white text-xs font-semibold rounded-lg flex items-center justify-between cursor-pointer"
                >
                  <span>{currentUser ? `Hồ Sơ: ${currentUser.name}` : 'Đăng Nhập / Đăng Ký Hội Viên'}</span>
                  <User size={14} className="text-amber-300" />
                </button>
              </div>
            </nav>
            <div className="pt-4 border-t border-[#e6e4df] flex items-center justify-between text-xs text-[#6b7280]">
              <span>Chăm sóc khách hàng: concierge@novastore.com</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
