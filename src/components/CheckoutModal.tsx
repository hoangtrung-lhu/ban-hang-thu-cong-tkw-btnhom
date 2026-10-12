import React, { useState } from 'react';
import { CartItem, OrderDetails } from '../types';
import { formatCurrency, calculateShipping } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';
import { X, ShieldCheck, Lock, CreditCard, Truck, Check, Info } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  discountPercent: number;
  onOrderSuccess: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  discountPercent,
  onOrderSuccess,
}) => {
  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');

  // Dummy Card inputs for simulation
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  // Form errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const baseShipping = calculateShipping(subtotal - discountAmount);
  const shippingCost = shippingMethod === 'express' ? baseShipping + 25 : baseShipping;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Vui lòng nhập họ và tên của bạn';
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errs.email = 'Vui lòng nhập địa chỉ email hợp lệ';
    if (!phone.trim() || phone.replace(/\D/g, '').length < 7) errs.phone = 'Vui lòng nhập số điện thoại hợp lệ';
    if (!address.trim()) errs.address = 'Vui lòng nhập địa chỉ nhận hàng';
    if (!city.trim()) errs.city = 'Vui lòng nhập tỉnh/thành phố';
    if (!postalCode.trim()) errs.postalCode = 'Vui lòng nhập mã bưu chính';

    if (paymentMethod === 'card') {
      if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length < 12) {
        errs.cardNumber = 'Vui lòng nhập số thẻ mô phỏng hợp lệ';
      }
      if (!cardExpiry.trim()) errs.cardExpiry = 'Nhập tháng/năm hết hạn (MM/YY)';
      if (!cardCvc.trim() || cardCvc.length < 3) errs.cardCvc = 'Nhập mã bảo mật CVC';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      // Fire celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#c4823f', '#121417', '#e6e4df'],
        });
      } catch (err) {
        // Fallback gracefully if canvas context unavailable
      }

      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const generatedOrder: OrderDetails = {
        orderId: `NOV-${randomNum}`,
        date: new Date().toLocaleDateString('vi-VN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        customerName: name,
        email,
        phone,
        address,
        city,
        postalCode,
        country,
        shippingMethod: shippingMethod === 'express' ? 'Chuyển Phát Hỏa Tốc (1–2 Ngày)' : 'Vận Chuyển Trung Hòa Carbon (3–5 Ngày)',
        shippingCost,
        paymentMethod:
          paymentMethod === 'card'
            ? `Thẻ Tín Dụng Mô Phỏng (•••• ${cardNumber.slice(-4) || '4242'})`
            : paymentMethod === 'cod'
            ? 'Thanh Toán Khi Nhận Hàng (COD Đã Xác Nhận)'
            : 'Thanh Toán Apple Pay Demo',
        items: [...items],
        subtotal,
        discount: discountAmount,
        total: grandTotal,
        estimatedDelivery: shippingMethod === 'express' ? 'Trong vòng 48 giờ tới' : 'Dự kiến từ 3–5 ngày làm việc',
      };

      setIsSubmitting(false);
      onOrderSuccess(generatedOrder);
      onClose();
    }, 900);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-dialog-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-lg shadow-2xl border border-[#e6e4df] overflow-hidden my-6 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#fbfaf8] border-b border-[#e6e4df] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock size={16} className="text-[#c4823f]" />
            <h2 id="checkout-dialog-title" className="font-display text-lg font-bold text-[#121417]">
              Mô Phỏng Thanh Toán & Đặt Hàng
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Hủy quá trình đặt hàng"
            className="p-1.5 text-[#6b7280] hover:text-[#121417] rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Demo Disclaimer Banner */}
        <div className="px-6 py-2.5 bg-amber-50/80 border-b border-amber-200/60 text-amber-900 text-xs flex items-center gap-2">
          <Info size={15} className="shrink-0 text-amber-700" />
          <span>
            <strong>Bản Trình Diễn Tương Tác:</strong> Đây là môi trường mô phỏng phía máy khách, không thu thập thông tin thẻ thật hay thực hiện trừ tiền tài khoản ngân hàng.
          </span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 max-h-[75vh] overflow-y-auto">
            {/* Left Column: Form Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Section 1: Customer Info */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#121417] mb-3 pb-1 border-b border-[#e6e4df]">
                  1. Thông Tin Người Nhận
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4b5563] mb-1">
                      Họ và tên đầy đủ *
                    </label>
                    <input
                      type="text"
                      placeholder="Nguyễn Văn An"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                        errors.name ? 'border-rose-500' : 'border-[#d1d5db]'
                      }`}
                    />
                    {errors.name && <p className="text-[11px] text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-[#4b5563] mb-1">
                        Địa chỉ Email *
                      </label>
                      <input
                        type="email"
                        placeholder="an.nguyen@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                          errors.email ? 'border-rose-500' : 'border-[#d1d5db]'
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#4b5563] mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        placeholder="0912 345 678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                          errors.phone ? 'border-rose-500' : 'border-[#d1d5db]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Delivery Destination */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#121417] mb-3 pb-1 border-b border-[#e6e4df]">
                  2. Địa Chỉ Giao Hàng
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-[#4b5563] mb-1">
                      Địa chỉ nhà / Số đường *
                    </label>
                    <input
                      type="text"
                      placeholder="Số 45, Đường Lê Duẩn, Phường Bến Nghé"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                        errors.address ? 'border-rose-500' : 'border-[#d1d5db]'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-[#4b5563] mb-1">
                        Tỉnh / Thành phố *
                      </label>
                      <input
                        type="text"
                        placeholder="Hà Nội"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                          errors.city ? 'border-rose-500' : 'border-[#d1d5db]'
                        }`}
                      />
                      {errors.city && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-[#4b5563] mb-1">
                        Mã bưu chính *
                      </label>
                      <input
                        type="text"
                        placeholder="100000"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className={`w-full px-3 py-2 text-xs bg-[#fbfaf8] border rounded-md focus:bg-white ${
                          errors.postalCode ? 'border-rose-500' : 'border-[#d1d5db]'
                        }`}
                      />
                      {errors.postalCode && (
                        <p className="text-[11px] text-rose-600 mt-1">{errors.postalCode}</p>
                      )}
                    </div>

                    <div className="sm:col-span-1">
                      <label className="block text-xs font-medium text-[#4b5563] mb-1">
                        Quốc gia
                      </label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-[#fbfaf8] border border-[#d1d5db] rounded-md focus:bg-white"
                      >
                        <option value="Vietnam">Việt Nam</option>
                        <option value="United States">Hoa Kỳ</option>
                        <option value="United Kingdom">Vương Quốc Anh</option>
                        <option value="Germany">Đức</option>
                        <option value="France">Pháp</option>
                        <option value="Japan">Nhật Bản</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Shipping Method */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#121417] mb-3 pb-1 border-b border-[#e6e4df]">
                  3. Phương Thức Vận Chuyển
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label
                    className={`p-3 rounded-md border cursor-pointer flex items-start gap-3 transition-colors ${
                      shippingMethod === 'standard'
                        ? 'border-[#121417] bg-[#fbfaf8]'
                        : 'border-[#d1d5db] hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'standard'}
                      onChange={() => setShippingMethod('standard')}
                      className="mt-0.5 text-[#121417]"
                    />
                    <div>
                      <span className="font-semibold text-[#121417] block">
                        Tiêu Chuẩn (Trung Hòa Carbon)
                      </span>
                      <span className="text-[#6b7280] text-[11px] block mt-0.5">
                        3–5 ngày làm việc · {baseShipping === 0 ? 'Miễn phí' : formatCurrency(baseShipping)}
                      </span>
                    </div>
                  </label>

                  <label
                    className={`p-3 rounded-md border cursor-pointer flex items-start gap-3 transition-colors ${
                      shippingMethod === 'express'
                        ? 'border-[#121417] bg-[#fbfaf8]'
                        : 'border-[#d1d5db] hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={shippingMethod === 'express'}
                      onChange={() => setShippingMethod('express')}
                      className="mt-0.5 text-[#121417]"
                    />
                    <div>
                      <span className="font-semibold text-[#121417] block">
                        Chuyển Phát Hỏa Tốc
                      </span>
                      <span className="text-[#6b7280] text-[11px] block mt-0.5">
                        1–2 ngày làm việc · {formatCurrency(baseShipping + 25)}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Section 4: Payment Simulation */}
              <div>
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#121417] mb-3 pb-1 border-b border-[#e6e4df]">
                  4. Hình Thức Thanh Toán
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {[
                      { id: 'card', label: 'Thẻ Tín Dụng (Demo)', icon: CreditCard },
                      { id: 'cod', label: 'Thanh Toán Khi Nhận (COD)', icon: Truck },
                      { id: 'applepay', label: 'Apple Pay Demo', icon: ShieldCheck },
                    ].map((p) => {
                      const Icon = p.icon;
                      return (
                        <button
                          type="button"
                          key={p.id}
                          onClick={() => setPaymentMethod(p.id as any)}
                          className={`flex-1 py-2 px-3 text-xs font-medium rounded-md border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            paymentMethod === p.id
                              ? 'bg-[#121417] text-white border-[#121417]'
                              : 'bg-[#fbfaf8] text-[#4b5563] border-[#d1d5db] hover:bg-white'
                          }`}
                        >
                          <Icon size={14} />
                          <span className="hidden sm:inline">{p.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="p-4 bg-[#fbfaf8] rounded-md border border-[#e6e4df] space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-[#4b5563] mb-1">
                          Số thẻ ngân hàng (Nhập mẫu thử nghiệm)
                        </label>
                        <input
                          type="text"
                          placeholder="4242 •••• •••• 4242"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-white border border-[#d1d5db] rounded"
                        />
                        {errors.cardNumber && (
                          <p className="text-[11px] text-rose-600 mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-[#4b5563] mb-1">
                            Hạn thẻ (MM/YY)
                          </label>
                          <input
                            type="text"
                            placeholder="12/28"
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-[#d1d5db] rounded"
                          />
                          {errors.cardExpiry && (
                            <p className="text-[11px] text-rose-600 mt-1">{errors.cardExpiry}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-[#4b5563] mb-1">
                            Mã bảo mật CVC
                          </label>
                          <input
                            type="text"
                            placeholder="789"
                            maxLength={4}
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full px-3 py-2 text-xs bg-white border border-[#d1d5db] rounded"
                          />
                          {errors.cardCvc && (
                            <p className="text-[11px] text-rose-600 mt-1">{errors.cardCvc}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="p-3 bg-emerald-50 text-emerald-900 rounded-md text-xs border border-emerald-200">
                      Khoản thanh toán <strong>{formatCurrency(grandTotal)}</strong> sẽ được nhân viên giao hàng thu và ký nhận tại địa chỉ của bạn. Không yêu cầu chuyển khoản trước.
                    </div>
                  )}

                  {paymentMethod === 'applepay' && (
                    <div className="p-3 bg-gray-50 text-gray-800 rounded-md text-xs border border-gray-200 text-center">
                      Mô phỏng xác thực sinh trắc học Touch ID / Face ID sẽ kích hoạt ngay khi bạn bấm xác nhận đặt hàng.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 bg-[#fbfaf8] p-5 rounded-lg border border-[#e6e4df] flex flex-col justify-between space-y-6">
              <div>
                <h3 className="font-display text-sm font-bold text-[#121417] mb-3 pb-1 border-b border-[#e6e4df]">
                  Tóm Tắt Đơn Hàng ({items.length})
                </h3>

                <div className="divide-y divide-[#e6e4df] max-h-56 overflow-y-auto pr-1">
                  {items.map((i) => (
                    <div key={i.id} className="py-2.5 flex items-center gap-3 text-xs">
                      <img
                        src={i.image}
                        alt={i.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 object-cover rounded bg-white border border-[#e6e4df]"
                        onError={(e) => handleImageError(e, i.name)}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#121417] truncate">{i.name}</p>
                        <p className="text-[#6b7280] text-[11px]">
                          SL: {i.quantity} {i.selectedColor ? `· ${i.selectedColor}` : ''}
                        </p>
                      </div>
                      <span className="font-mono tabular-nums font-semibold text-[#121417]">
                        {formatCurrency(i.price * i.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation breakdown */}
                <div className="mt-4 pt-3 border-t border-[#e6e4df] space-y-2 text-xs text-[#6b7280]">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng</span>
                    <span className="font-mono tabular-nums font-semibold text-[#121417]">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Ưu đãi giảm giá</span>
                      <span className="font-mono tabular-nums font-semibold">
                        -{formatCurrency(discountAmount)}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Cước vận chuyển</span>
                    <span className="font-mono tabular-nums font-semibold text-[#121417]">
                      {shippingCost === 0 ? 'Miễn phí' : formatCurrency(shippingCost)}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#e6e4df] flex justify-between text-base font-bold text-[#121417]">
                    <span>Tổng thanh toán</span>
                    <span className="font-mono tabular-nums text-lg">
                      {formatCurrency(grandTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="space-y-2 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#121417] text-white text-xs sm:text-sm font-semibold rounded-md hover:bg-[#262930] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Đang xử lý đơn thử nghiệm...</span>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Xác Nhận Đặt Hàng Thử Nghiệm ({formatCurrency(grandTotal)})</span>
                    </>
                  )}
                </button>
                <p className="text-[11px] text-center text-[#9ca3af]">
                  Giao thức mô phỏng an toàn 256-bit · Không trừ tiền tài khoản thực tế
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
