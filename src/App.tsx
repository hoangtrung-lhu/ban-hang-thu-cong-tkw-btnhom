import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import { Product, CartItem, OrderDetails } from './types';
import { PRODUCTS } from './data/products';
import { loadCartFromStorage, saveCartToStorage } from './utils/formatters';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { EditorialStory } from './components/EditorialStory';
import { ArtisanTeamSection } from './components/ArtisanTeamSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { MotionInspectorModal } from './components/MotionInspectorModal';
import { AuthModal } from './components/AuthModal';
import { MemberDashboardModal } from './components/MemberDashboardModal';
import { LiveStoreFeed } from './components/LiveStoreFeed';
import { Footer } from './components/Footer';
import { Check, Sparkles, Sliders } from 'lucide-react';
import { UserProfileData, subscribeToAuthChanges, fetchOrCreateUserProfile } from './lib/auth';

export default function App() {
  // State Management
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // Firebase User Authentication & Profile State
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfileData | null>(null);

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [isMotionInspectorOpen, setIsMotionInspectorOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState<string>('');
  const [promoDiscount, setPromoDiscount] = useState<number>(0);

  // Toast Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // 1. Firebase Authentication Persistence Listener
  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const profile = await fetchOrCreateUserProfile(firebaseUser);
          setCurrentUserProfile(profile);
        } catch (err) {
          console.error('[Error fetching user profile from Firestore]:', err);
        }
      } else {
        setCurrentUserProfile(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Initialize AOS Scroll Revelation (Week 5: Part 10)
  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }, []);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  // Refresh AOS scroll positions when active category changes
  useEffect(() => {
    AOS.refresh();
  }, [activeCategory, searchQuery]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    quantity: number = 1,
    color?: string,
    size?: string
  ) => {
    const chosenColor = color || (product.colors && product.colors[0]?.name);
    const chosenSize = size || (product.sizes && product.sizes[0]);
    const cartItemId = `${product.id}-${chosenColor || 'def'}-${chosenSize || 'def'}`;

    setCart((prev) => {
      const existing = prev.find((i) => i.id === cartItemId);
      if (existing) {
        return prev.map((i) =>
          i.id === cartItemId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
        },
      ];
    });

    setRecentlyAddedId(product.id);
    setTimeout(() => {
      setRecentlyAddedId(null);
    }, 1500);

    showToast(`Đã thêm ${quantity}x "${product.name}" vào giỏ hàng`);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    const target = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (target) {
      showToast(`Đã xóa "${target.name}" khỏi giỏ hàng`);
    }
  };

  const handleApplyPromo = (code: string): { success: boolean; message: string } => {
    if (code === 'NOVA10') {
      setAppliedPromo('NOVA10');
      setPromoDiscount(10);
      showToast('Đã áp dụng mã NOVA10: Giảm 10% toàn bộ đơn hàng');
      return { success: true, message: 'Đã áp dụng mã NOVA10: Giảm 10%' };
    }
    if (code === 'VIP15') {
      setAppliedPromo('VIP15');
      setPromoDiscount(15);
      showToast('Đã áp dụng mã VIP15: Giảm 15% toàn bộ đơn hàng');
      return { success: true, message: 'Đã áp dụng mã VIP15: Giảm 15%' };
    }
    return { success: false, message: 'Mã ưu đãi không hợp lệ. Hãy thử dùng mã NOVA10' };
  };

  const handleRemovePromo = () => {
    setAppliedPromo('');
    setPromoDiscount(0);
    showToast('Đã gỡ bỏ mã giảm giá');
  };

  // Navigation helpers
  const scrollToCatalog = () => {
    const catalogElement = document.getElementById('catalog-section');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectCategory = (category: string) => {
    setActiveCategory(category);
    scrollToCatalog();
  };

  const handleFocusSearch = () => {
    scrollToCatalog();
    setTimeout(() => {
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }, 400);
  };

  const handleOpenWatchStory = () => {
    setActiveCategory('timepieces');
    scrollToCatalog();
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfaf8] text-[#1a1c1e] selection:bg-[#c4823f] selection:text-white">
      {/* 1. Header & Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        onOpenSearch={handleFocusSearch}
        onScrollToCatalog={scrollToCatalog}
        onOpenAuth={() => {
          if (currentUserProfile) {
            setIsDashboardOpen(true);
          } else {
            setIsAuthOpen(true);
          }
        }}
        currentUser={
          currentUserProfile
            ? { name: currentUserProfile.displayName, email: currentUserProfile.email }
            : null
        }
      />

      {/* Main Semantic Landmark */}
      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          onExploreClick={scrollToCatalog}
          onOpenStory={handleOpenWatchStory}
        />

        {/* 3. Category Showcase */}
        <CategoryShowcase onSelectCategory={handleSelectCategory} />

        {/* 4. Complete Product Catalog */}
        <ProductCatalog
          products={products}
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          onQuickView={(p) => setSelectedProduct(p)}
          onAddToCart={(p) => handleAddToCart(p, 1)}
          recentlyAddedId={recentlyAddedId}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* 5. Editorial Craftsmanship & Material Story */}
        <EditorialStory onExploreWatch={handleOpenWatchStory} />

        {/* 6. Master Artisans & Design Guild Portfolio (Interactive 3D Flip Cards) */}
        <ArtisanTeamSection
          onSelectCategory={handleSelectCategory}
          onScrollToCatalog={scrollToCatalog}
        />

        {/* 7. Real-Time Firestore Community Stream & Experience Feed */}
        <LiveStoreFeed
          currentUserProfile={currentUserProfile}
          onOpenAuth={() => setIsAuthOpen(true)}
          showToast={showToast}
        />
      </main>

      {/* 7. Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      {/* 8. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* 9. Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        promoDiscount={promoDiscount}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* 10. Checkout Simulation Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        discountPercent={promoDiscount}
        onOrderSuccess={(order) => {
          setConfirmedOrder(order);
          setCart([]); // Clear cart upon successful order
        }}
      />

      {/* 11. Order Confirmation Receipt Modal */}
      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={!!confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      {/* 12. AI Prompt Engineering & Motion Inspector Modal */}
      <MotionInspectorModal
        isOpen={isMotionInspectorOpen}
        onClose={() => setIsMotionInspectorOpen(false)}
      />

      {/* 13. Firebase Authentication (Sign Up / Login) Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthSuccess={(profile) => {
          setCurrentUserProfile(profile);
          setIsDashboardOpen(true); // Open dashboard immediately upon registration / login!
        }}
        showToast={showToast}
      />

      {/* 14. Protected Member Dashboard Modal (Gym / Club Profile Editor) */}
      <MemberDashboardModal
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        currentUserProfile={currentUserProfile}
        onProfileUpdated={(updatedProfile) => {
          setCurrentUserProfile(updatedProfile);
        }}
        onLogout={() => {
          setCurrentUserProfile(null);
        }}
        showToast={showToast}
      />

      {/* Floating Trigger: Smart Motion & AI Prompt Engineering Inspector */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => setIsMotionInspectorOpen(true)}
          aria-label="Mở bảng kiểm tra Smart Motion và câu Prompt bậc thầy"
          className="btn-tactile bg-[#121417]/95 hover:bg-[#121417] text-white border border-white/20 px-3.5 py-2.5 rounded-full shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold cursor-pointer group"
        >
          <Sparkles size={14} className="text-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Motion & AI Prompt</span>
        </button>
      </div>

      {/* Toast Notification Micro-interaction */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#121417] text-white px-4 py-3 rounded-md shadow-xl border border-white/10 flex items-center gap-2.5 text-xs animate-fade-in-up"
        >
          <div className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center shrink-0">
            <Check size={12} className="text-white" />
          </div>
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
