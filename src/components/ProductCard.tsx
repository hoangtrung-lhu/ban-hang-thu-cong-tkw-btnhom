import React, { useState } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';
import { Eye, Plus, Check, RotateCw, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  isAddedJustNow?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isAddedJustNow = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      data-aos="fade-up"
      className="perspective-1000 w-full min-h-[460px] h-full"
    >
      <article
        className={`relative w-full h-full transition-transform duration-500 ease-out preserve-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* ==================== MẶT TRƯỚC (FRONT FACE) ==================== */}
        <div className="backface-hidden w-full h-full flex flex-col bg-white border border-[#e6e4df] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#d4d1c8]">
          {/* Product Image Stage */}
          <div className="relative aspect-[4/3] bg-[#f5f4f0] overflow-hidden group">
            {/* Subtle badge if applicable */}
            {product.badge && (
              <div className="absolute top-3 left-3 z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-[#121417] text-white px-2.5 py-1 rounded-sm shadow-xs">
                  {product.badge}
                </span>
              </div>
            )}

            {/* 3D Flip Affordance Button on Front Card */}
            <button
              onClick={() => setIsFlipped(true)}
              aria-label={`Lật thẻ 3D xem thông số kỹ thuật của ${product.name}`}
              className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-xs text-[#121417] hover:bg-[#121417] hover:text-white rounded-full shadow-xs transition-colors duration-150 cursor-pointer flex items-center gap-1 group/flip"
              title="Lật thẻ xem thông số (3D Flip)"
            >
              <RotateCw size={13} className="transition-transform duration-300 group-hover/flip:rotate-180" />
              <span className="text-[10px] font-medium pr-0.5 hidden sm:inline">Thông số</span>
            </button>

            <img
              src={product.image}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              loading="lazy"
              onError={(e) => handleImageError(e, product.name)}
            />

            {/* Hover Quick Action Overlay */}
            <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
              <button
                onClick={() => onQuickView(product)}
                aria-label={`Xem chi tiết sản phẩm ${product.name}`}
                className="p-3 bg-white text-[#121417] hover:bg-[#121417] hover:text-white rounded-full shadow-md transition-transform duration-150 transform hover:scale-110 active:scale-95 cursor-pointer"
                title="Xem nhanh (Quick View)"
              >
                <Eye size={17} />
              </button>

              <button
                onClick={() => onAddToCart(product)}
                aria-label={`Thêm nhanh ${product.name} vào giỏ hàng`}
                className={`p-3 rounded-full shadow-md transition-all duration-150 transform hover:scale-110 active:scale-95 cursor-pointer ${
                  isAddedJustNow
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-[#121417] hover:bg-[#c4823f] hover:text-white'
                }`}
                title="Thêm nhanh vào giỏ"
              >
                {isAddedJustNow ? <Check size={17} /> : <Plus size={17} />}
              </button>
            </div>
          </div>

          {/* Product Information Container */}
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              {/* Zero-Pill Metadata Line */}
              <div className="flex items-center gap-2 text-xs text-[#6b7280] mb-1.5">
                <span className="uppercase tracking-wider font-medium text-[11px] text-[#c4823f]">
                  {product.categoryLabel}
                </span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{product.material}</span>
              </div>

              {/* Product Title */}
              <h3 className="font-display text-base font-semibold text-[#121417] group-hover:text-[#c4823f] transition-colors line-clamp-1">
                <button
                  onClick={() => onQuickView(product)}
                  className="text-left cursor-pointer hover:underline"
                >
                  {product.name}
                </button>
              </h3>

              {/* Subtitle / Tagline */}
              <p className="text-xs text-[#6b7280] mt-1 line-clamp-2 leading-relaxed">
                {product.tagline}
              </p>
            </div>

            {/* Price & CTA Row */}
            <div className="mt-5 pt-3 border-t border-[#e6e4df] flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="font-mono tabular-nums text-base font-bold text-[#121417]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-xs text-[#9ca3af] line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsFlipped(true)}
                  aria-label="Lật xem thông số kỹ thuật"
                  className="p-1.5 text-[#6b7280] hover:text-[#121417] hover:bg-black/5 rounded transition-colors"
                  title="3D Flip Card"
                >
                  <RotateCw size={14} />
                </button>

                <button
                  onClick={() => onAddToCart(product)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded transition-all duration-150 cursor-pointer flex items-center gap-1 active:scale-95 ${
                    isAddedJustNow
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                      : 'bg-[#121417] text-white hover:bg-[#262930]'
                  }`}
                >
                  {isAddedJustNow ? (
                    <>
                      <Check size={13} />
                      <span>Đã thêm</span>
                    </>
                  ) : (
                    <span>Thêm vào giỏ</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ==================== MẶT SAU (BACK FACE - 3D FLIPPED) ==================== */}
        <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full flex flex-col bg-[#121417] text-white border border-[#2d3139] rounded-lg p-5 justify-between shadow-xl">
          <div>
            {/* Header row with flip back button */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-1.5 text-[#c4823f]">
                <Sparkles size={14} />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Hồ Sơ Kỹ Nghệ Chế Tác
                </span>
              </div>
              <button
                onClick={() => setIsFlipped(false)}
                aria-label="Lật lại mặt trước của thẻ sản phẩm"
                className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center gap-1 text-xs"
                title="Lật lại ảnh sản phẩm"
              >
                <ArrowLeft size={13} />
                <span>Trở lại</span>
              </button>
            </div>

            {/* Title & Material */}
            <div className="mt-3">
              <h4 className="font-display text-base font-bold text-white line-clamp-1">
                {product.name}
              </h4>
              <p className="text-xs text-amber-300/90 mt-0.5 font-medium">
                {product.material}
              </p>
            </div>

            {/* Technical Specifications Matrix */}
            <div className="mt-4 space-y-2 text-xs bg-white/5 p-3 rounded-md border border-white/5">
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Xuất xứ xưởng:</span>
                <span className="font-medium text-white">
                  {product.category === 'accessories' ? 'Florence, Ý' : product.category === 'timepieces' ? 'Zurich & Kyoto' : product.category === 'apparel' ? 'Porto, Bồ Đào Nha' : 'Copenhagen, Đan Mạch'}
                </span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Tiêu chuẩn:</span>
                <span className="font-mono text-[11px] text-amber-200">ISO 14001 / Zero-Waste</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="text-gray-400">Bảo hành:</span>
                <span className="font-medium text-emerald-400">Trọn đời xưởng chế tác</span>
              </div>
            </div>

            {/* Key Craft Highlights */}
            <div className="mt-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2">
                Chi Tiết Hoàn Thiện:
              </p>
              <ul className="space-y-1.5 text-xs text-gray-300">
                {product.details.slice(0, 3).map((detail, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-snug">
                    <span className="text-[#c4823f] mt-0.5">•</span>
                    <span className="line-clamp-2">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Actions on Flipped Card */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
            <span className="font-mono tabular-nums text-base font-bold text-amber-300">
              {formatCurrency(product.price)}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onQuickView(product)}
                className="px-2.5 py-1.5 text-xs bg-white/10 hover:bg-white/20 text-white rounded transition-colors cursor-pointer"
              >
                Chi tiết
              </button>

              <button
                onClick={() => onAddToCart(product)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
                  isAddedJustNow
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#c4823f] text-[#121417] hover:bg-[#b07232] hover:text-white'
                }`}
              >
                {isAddedJustNow ? (
                  <>
                    <Check size={13} />
                    <span>Đã thêm</span>
                  </>
                ) : (
                  <span>Thêm vào giỏ</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
