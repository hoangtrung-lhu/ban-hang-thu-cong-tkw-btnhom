import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';
import { X, Check, ShoppingBag, ShieldCheck, Truck, RefreshCw, Star } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string, size?: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
  const [addedSuccess, setAddedSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setQuantity(1);
      setAddedSuccess(false);
    }
  }, [product]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(10, prev + delta)));
  };

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 1800);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden border border-[#e6e4df] my-8 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Đóng hộp thoại chi tiết sản phẩm"
          className="absolute top-4 right-4 z-20 p-2 text-[#6b7280] hover:text-[#121417] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left: Product Image Stage */}
          <div className="md:col-span-6 bg-[#f5f4f0] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#e6e4df]">
            <div className="relative aspect-square rounded-md overflow-hidden bg-white shadow-xs border border-[#e6e4df]">
              {product.badge && (
                <span className="absolute top-3 left-3 z-10 text-[11px] font-semibold uppercase tracking-wider bg-[#121417] text-white px-2 py-0.5 rounded-xs">
                  {product.badge}
                </span>
              )}
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => handleImageError(e, product.name)}
              />
            </div>

            {/* Quick Guarantees */}
            <div className="mt-6 pt-6 border-t border-[#e6e4df] grid grid-cols-3 gap-3 text-center text-[11px] text-[#6b7280]">
              <div className="flex flex-col items-center gap-1">
                <Truck size={15} className="text-[#c4823f]" />
                <span>Giao Hàng Có Mã Vận Đơn</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck size={15} className="text-[#c4823f]" />
                <span>Bảo Hành Xưởng Thủ Công</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RefreshCw size={15} className="text-[#c4823f]" />
                <span>Đổi Trả Trong 30 Ngày</span>
              </div>
            </div>
          </div>

          {/* Right: Product Purchase Module */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#6b7280] mb-1.5">
                <span className="text-[#c4823f] uppercase font-semibold tracking-wider text-[11px]">
                  {product.categoryLabel}
                </span>
                <div className="flex items-center gap-1">
                  <Star size={13} className="fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#121417] tabular-nums">{product.rating}</span>
                  <span>({product.reviewCount} đánh giá)</span>
                </div>
              </div>

              {/* Title & Tagline */}
              <h2
                id="modal-product-title"
                className="font-display text-2xl font-bold text-[#121417] leading-snug"
              >
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#6b7280] mt-1">{product.tagline}</p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono tabular-nums text-2xl font-bold text-[#121417]">
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="font-mono tabular-nums text-sm text-[#9ca3af] line-through">
                    {formatCurrency(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-medium">
                  Còn hàng & Sẵn sàng giao ngay
                </span>
              </div>

              {/* Color selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#121417]">Tùy Chọn Màu Sắc:</span>
                    <span className="text-[#6b7280]">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        aria-label={`Chọn màu ${c.name}`}
                        className={`w-7 h-7 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-[#121417] scale-110 shadow-xs'
                            : 'border-transparent hover:border-gray-300'
                        }`}
                        style={{ backgroundColor: c.hex }}
                      >
                        {selectedColor === c.name && (
                          <Check
                            size={12}
                            className={
                              c.hex.toLowerCase() === '#1e2022' ||
                              c.hex.toLowerCase() === '#26292b' ||
                              c.hex.toLowerCase() === '#333538' ||
                              c.hex.toLowerCase() === '#1a1b1d'
                                ? 'text-white'
                                : 'text-[#121417]'
                            }
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-[#121417]">Kích Cỡ:</span>
                    <span className="text-[#6b7280]">Chọn size phù hợp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`min-w-10 h-9 px-2 text-xs font-medium rounded border transition-colors cursor-pointer ${
                          selectedSize === s
                            ? 'bg-[#121417] text-white border-[#121417]'
                            : 'bg-white text-[#121417] border-[#d1d5db] hover:border-[#121417]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Stepper & Add To Bag */}
              <div className="mt-6 pt-5 border-t border-[#e6e4df] flex items-center gap-4">
                <div className="flex items-center border border-[#d1d5db] rounded-md overflow-hidden bg-[#fbfaf8]">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    aria-label="Giảm số lượng"
                    className="w-9 h-11 flex items-center justify-center text-[#121417] hover:bg-black/5 disabled:opacity-30 cursor-pointer font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono tabular-nums text-sm font-semibold text-[#121417]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 10}
                    aria-label="Tăng số lượng"
                    className="w-9 h-11 flex items-center justify-center text-[#121417] hover:bg-black/5 disabled:opacity-30 cursor-pointer font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={addedSuccess}
                  className={`flex-1 h-11 px-5 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#121417] text-white hover:bg-[#262930]'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check size={17} />
                      <span>Đã Thêm Vào Giỏ Hàng</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={17} />
                      <span>Thêm Vào Giỏ Hàng · {formatCurrency(product.price * quantity)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Accordion / Information Tabs */}
            <div className="pt-4 border-t border-[#e6e4df]">
              <div className="flex border-b border-[#e6e4df] text-xs">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 mr-4 font-semibold transition-colors cursor-pointer ${
                    activeTab === 'details'
                      ? 'text-[#121417] border-b-2 border-[#c4823f]'
                      : 'text-[#6b7280] hover:text-[#121417]'
                  }`}
                >
                  Tổng Quan & Chế Tác
                </button>
                <button
                  onClick={() => setActiveTab('materials')}
                  className={`pb-2 mr-4 font-semibold transition-colors cursor-pointer ${
                    activeTab === 'materials'
                      ? 'text-[#121417] border-b-2 border-[#c4823f]'
                      : 'text-[#6b7280] hover:text-[#121417]'
                  }`}
                >
                  Thông Số Chất Liệu
                </button>
                <button
                  onClick={() => setActiveTab('shipping')}
                  className={`pb-2 font-semibold transition-colors cursor-pointer ${
                    activeTab === 'shipping'
                      ? 'text-[#121417] border-b-2 border-[#c4823f]'
                      : 'text-[#6b7280] hover:text-[#121417]'
                  }`}
                >
                  Vận Chuyển & Bảo Quản
                </button>
              </div>

              <div className="py-3 text-xs text-[#6b7280] leading-relaxed min-h-24">
                {activeTab === 'details' && (
                  <div>
                    <p>{product.description}</p>
                    <ul className="mt-2.5 space-y-1 list-disc list-inside text-[#4b5563]">
                      {product.details.map((detail, idx) => (
                        <li key={idx}>{detail}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === 'materials' && (
                  <div className="space-y-1.5">
                    <p>
                      <strong>Thành phần:</strong> {product.material}
                    </p>
                    <p>
                      <strong>Chuẩn mực đạo đức:</strong> Chứng nhận không gây hại cho động vật, thuốc nhuộm hữu cơ không độc tố và bao bì 100% không nhựa.
                    </p>
                    <p>
                      <strong>Quy chuẩn bảo quản:</strong> Lau nhẹ bằng khăn mềm ẩm hoặc mang đến dịch vụ giặt hấp chăm sóc chuyên nghiệp.
                    </p>
                  </div>
                )}
                {activeTab === 'shipping' && (
                  <div className="space-y-1.5">
                    <p>
                      <strong>Xuất kho:</strong> Đóng gói và giao hãng vận chuyển trong ngày đối với đơn xác nhận trước 14:00.
                    </p>
                    <p>
                      <strong>Thời gian giao hàng:</strong> 2–4 ngày làm việc thông qua dịch vụ chuyển phát nhanh DHL Express Carbon Neutral.
                    </p>
                    <p>
                      <strong>Chính sách đổi trả:</strong> Trải nghiệm miễn phí trong 30 ngày với chính sách đổi trả nguyên vẹn ban đầu.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
