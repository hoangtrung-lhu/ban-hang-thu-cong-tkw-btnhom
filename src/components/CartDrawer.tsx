import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency, FREE_SHIPPING_THRESHOLD, calculateShipping } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string;
  promoDiscount: number;
  onApplyPromo: (code: string) => { success: boolean; message: string };
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  promoDiscount,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * promoDiscount) / 100;
  const shipping = calculateShipping(subtotal - discountAmount);
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = onApplyPromo(promoInput.trim().toUpperCase());
    if (res.success) {
      setPromoMessage({ text: res.message, isError: false });
      setPromoInput('');
    } else {
      setPromoMessage({ text: res.message, isError: true });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ngăn Kéo Giỏ Hàng"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs transition-opacity flex justify-end"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white h-full flex flex-col shadow-2xl animate-fade-in-down border-l border-[#e6e4df]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#e6e4df] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#121417]" />
            <h2 className="font-display text-lg font-bold text-[#121417]">
              Giỏ Hàng Mua Sắm
            </h2>
            <span className="text-xs text-[#6b7280] font-mono tabular-nums">
              ({items.reduce((acc, i) => acc + i.quantity, 0)} sản phẩm)
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng ngăn giỏ hàng"
            className="p-1.5 text-[#6b7280] hover:text-[#121417] hover:bg-black/5 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free shipping motivator strip */}
        <div className="px-6 py-3 bg-[#fbfaf8] border-b border-[#e6e4df] text-xs">
          {amountToFreeShipping > 0 ? (
            <div>
              <p className="text-[#6b7280]">
                Mua thêm <strong className="text-[#121417]">{formatCurrency(amountToFreeShipping)}</strong> để được miễn phí vận chuyển.
              </p>
              <div className="mt-2 w-full h-1.5 bg-[#e5e7eb] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c4823f] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          ) : (
            <p className="text-emerald-700 font-semibold flex items-center gap-1.5">
              <Sparkles size={14} />
              <span>Đơn hàng của bạn đã đủ điều kiện miễn phí vận chuyển hỏa tốc!</span>
            </p>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#f0ede6]">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-14 h-14 bg-amber-50 text-[#c4823f] rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="font-display text-base font-bold text-[#121417]">
                Giỏ hàng của bạn đang trống
              </p>
              <p className="text-xs text-[#6b7280] mt-1 max-w-xs leading-relaxed">
                Khám phá các sản phẩm thời trang may đo, đồ da Tuscan thủ công và vật dụng nội thất tinh xảo.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-5 py-2.5 bg-[#121417] text-white text-xs font-semibold rounded hover:bg-[#262930] transition-colors cursor-pointer"
              >
                Bắt Đầu Mua Sắm
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 flex gap-4 items-center">
                <div className="w-18 h-18 rounded-md bg-[#f5f4f0] overflow-hidden shrink-0 border border-[#e6e4df]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                    onError={(e) => handleImageError(e, item.name)}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-[#121417] truncate">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#6b7280] mt-0.5">
                    {item.selectedColor && <span>{item.selectedColor}</span>}
                    {item.selectedColor && item.selectedSize && <span aria-hidden="true">·</span>}
                    {item.selectedSize && <span>Size {item.selectedSize}</span>}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-[#d1d5db] rounded bg-[#fbfaf8]">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label={`Giảm số lượng ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-black/5 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-7 text-center font-mono tabular-nums text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label={`Tăng số lượng ${item.name}`}
                        className="w-6 h-6 flex items-center justify-center text-xs hover:bg-black/5 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-mono tabular-nums text-xs font-bold text-[#121417]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Xóa ${item.name} khỏi giỏ hàng`}
                        className="text-[#9ca3af] hover:text-rose-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-6 bg-[#fbfaf8] border-t border-[#e6e4df] space-y-4">
            {/* Promo Code Form */}
            {!appliedPromo ? (
              <form onSubmit={handleApplyPromoCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Mã ưu đãi (thử NOVA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-white border border-[#d1d5db] rounded focus:border-[#121417]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-[#121417] text-white text-xs font-medium rounded hover:bg-[#262930] transition-colors cursor-pointer shrink-0"
                  >
                    Áp Dụng
                  </button>
                </div>
                {promoMessage && (
                  <p
                    className={`text-[11px] ${
                      promoMessage.isError ? 'text-rose-600' : 'text-emerald-600'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </form>
            ) : (
              <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded border border-emerald-200">
                <div className="flex items-center gap-1.5">
                  <Check size={14} />
                  <span>
                    Đã áp dụng mã: <strong>{appliedPromo}</strong> (GIẢM {promoDiscount}%)
                  </span>
                </div>
                <button
                  onClick={onRemovePromo}
                  className="text-emerald-700 hover:text-emerald-950 underline font-medium cursor-pointer"
                >
                  Xóa mã
                </button>
              </div>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#6b7280]">
              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span className="font-mono tabular-nums font-semibold text-[#121417]">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              {promoDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Ưu đãi giảm ({promoDiscount}%)</span>
                  <span className="font-mono tabular-nums font-semibold">
                    -{formatCurrency(discountAmount)}
                  </span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Phí vận chuyển dự kiến</span>
                <span className="font-mono tabular-nums font-semibold text-[#121417]">
                  {shipping === 0 ? 'Miễn phí' : formatCurrency(shipping)}
                </span>
              </div>

              <div className="pt-2 border-t border-[#e6e4df] flex justify-between text-sm font-bold text-[#121417]">
                <span>Tổng cộng dự tính</span>
                <span className="font-mono tabular-nums text-base">
                  {formatCurrency(grandTotal)}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-3.5 bg-[#121417] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#262930] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Tiến Hành Đặt Hàng</span>
              <ArrowRight size={15} />
            </button>

            <p className="text-[11px] text-center text-[#9ca3af]">
              Đã bao gồm thuế phí · Đổi trả thuận tiện trong vòng 30 ngày
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
