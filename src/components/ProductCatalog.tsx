import React, { useState, useMemo } from 'react';
import { Product, SortOption } from '../types';
import { ProductCard } from './ProductCard';
import { Search, SlidersHorizontal, RotateCcw, X } from 'lucide-react';

interface ProductCatalogProps {
  products: Product[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  recentlyAddedId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  activeCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  recentlyAddedId,
  searchQuery,
  onSearchChange,
}) => {
  const [priceRange, setPriceRange] = useState<'all' | 'under-150' | '150-300' | 'above-300'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Filter & Sort calculation
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category check
        if (activeCategory !== 'all' && p.category !== activeCategory) {
          return false;
        }

        // Search query check
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchName = p.name.toLowerCase().includes(q);
          const matchTagline = p.tagline.toLowerCase().includes(q);
          const matchMaterial = p.material.toLowerCase().includes(q);
          const matchCategory = p.categoryLabel.toLowerCase().includes(q);
          if (!matchName && !matchTagline && !matchMaterial && !matchCategory) {
            return false;
          }
        }

        // Price range check
        if (priceRange === 'under-150' && p.price >= 150) return false;
        if (priceRange === '150-300' && (p.price < 150 || p.price > 300)) return false;
        if (priceRange === 'above-300' && p.price <= 300) return false;

        // In-stock check
        if (onlyInStock && !p.inStock) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured: featured first, then id
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [products, activeCategory, searchQuery, priceRange, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('all');
    onSearchChange('');
    setPriceRange('all');
    setSortBy('featured');
    setOnlyInStock(false);
  };

  const hasActiveFilters =
    activeCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    priceRange !== 'all' ||
    onlyInStock ||
    sortBy !== 'featured';

  const categoryOptions = [
    { label: 'Tất Cả Sản Phẩm', value: 'all' },
    { label: 'Thời Trang', value: 'apparel' },
    { label: 'Đồ Da Thủ Công', value: 'accessories' },
    { label: 'Vật Dụng Nội Thất', value: 'living' },
    { label: 'Đồng Hồ Đo Giờ', value: 'timepieces' },
  ];

  return (
    <section
      id="catalog-section"
      aria-label="Danh Sách Sản Phẩm Toàn Diện"
      className="py-16 sm:py-20 bg-[#fbfaf8] border-b border-[#e6e4df]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="mb-8">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#c4823f]">
            Danh Mục Hoàn Chỉnh
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#121417] mt-1">
            Tuyển Chọn Sản Phẩm Thủ Công
          </h2>
          <p className="text-xs sm:text-sm text-[#6b7280] mt-1">
            Phân loại theo từng nhóm chất liệu, chế tác tại các xưởng gia đình giàu kinh nghiệm và hoàn thiện bền bỉ cho nhiều năm sử dụng.
          </p>
        </div>

        {/* Filter & Search Toolbar */}
        <div
          data-aos="fade-up"
          className="bg-white p-4 sm:p-5 rounded-lg border border-[#e6e4df] shadow-xs mb-8 space-y-4"
        >
          {/* Top Row: Search input + Category Filter Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9ca3af]"
              />
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm, chất liệu hoặc đặc điểm chế tác..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-[#fbfaf8] border border-[#e6e4df] rounded-md focus:bg-white transition-colors placeholder:text-[#9ca3af]"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  aria-label="Xóa nội dung tìm kiếm"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#121417]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Category Segmented Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
              {categoryOptions.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => onSelectCategory(cat.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.value
                      ? 'bg-[#121417] text-white shadow-xs'
                      : 'bg-[#f5f4f0] text-[#4b5563] hover:text-[#121417] hover:bg-[#eae8e1]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Row: Price filter, Stock toggle, Sort dropdown & Results count */}
          <div className="pt-3 border-t border-[#f0ede6] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[#6b7280] font-medium flex items-center gap-1.5">
                <SlidersHorizontal size={13} />
                <span>Khoảng giá:</span>
              </span>

              <div className="flex items-center gap-1">
                {[
                  { label: 'Tất cả', value: 'all' },
                  { label: 'Dưới $150', value: 'under-150' },
                  { label: '$150 – $300', value: '150-300' },
                  { label: 'Trên $300', value: 'above-300' },
                ].map((range) => (
                  <button
                    key={range.value}
                    onClick={() => setPriceRange(range.value as any)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      priceRange === range.value
                        ? 'bg-[#c4823f] text-white font-semibold'
                        : 'text-[#6b7280] hover:text-[#121417] hover:bg-black/5'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>

              {/* In stock toggle */}
              <label className="flex items-center gap-1.5 text-[#6b7280] hover:text-[#121417] cursor-pointer ml-2">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="rounded border-[#d1d5db] text-[#121417] focus:ring-amber-500"
                />
                <span>Chỉ hàng có sẵn</span>
              </label>
            </div>

            {/* Sort & Count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-[#6b7280]">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#fbfaf8] border border-[#e6e4df] rounded px-2.5 py-1 text-xs text-[#121417] cursor-pointer focus:bg-white"
                >
                  <option value="featured">Bộ Sưu Tập Nổi Bật</option>
                  <option value="price-asc">Giá: Thấp đến Cao</option>
                  <option value="price-desc">Giá: Cao đến Thấp</option>
                  <option value="name-asc">Tên (A-Z)</option>
                  <option value="rating">Đánh Giá Cao Nhất</option>
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[#c4823f] hover:underline font-medium cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Đặt lại</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Filter Summary */}
        <div className="mb-6 flex items-center justify-between text-xs text-[#6b7280]">
          <p>
            Đang hiển thị <strong className="text-[#121417] tabular-nums">{filteredProducts.length}</strong> trên tổng số{' '}
            <strong className="text-[#121417] tabular-nums">{products.length}</strong> sản phẩm
          </p>
          {searchQuery && (
            <p>
              Kết quả tìm kiếm cho: <span className="italic text-[#121417]">"{searchQuery}"</span>
            </p>
          )}
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isAddedJustNow={recentlyAddedId === product.id}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            data-aos="fade-in"
            className="py-16 text-center bg-white border border-dashed border-[#d1d5db] rounded-lg p-8 max-w-lg mx-auto"
          >
            <div className="w-12 h-12 bg-amber-50 text-[#c4823f] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search size={22} />
            </div>
            <h3 className="font-display text-lg font-bold text-[#121417]">
              Không Tìm Thấy Sản Phẩm Phù Hợp
            </h3>
            <p className="text-xs text-[#6b7280] mt-1 max-w-sm mx-auto leading-relaxed">
              Chúng tôi không tìm thấy món đồ nào khớp với từ khóa tìm kiếm hoặc điều kiện lọc hiện tại. Hãy thử điều chỉnh mức giá hoặc làm mới bộ lọc.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-5 px-4 py-2 bg-[#121417] text-white text-xs font-semibold rounded hover:bg-[#262930] transition-colors cursor-pointer"
            >
              Đặt Lại Toàn Bộ Bộ Lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
