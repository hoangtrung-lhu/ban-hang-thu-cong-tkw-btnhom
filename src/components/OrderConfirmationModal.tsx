import React from 'react';
import { OrderDetails } from '../types';
import { formatCurrency } from '../utils/formatters';
import { handleImageError } from '../utils/imageFallback';
import { CheckCircle2, Printer, ArrowRight, Package, Calendar, MapPin, CreditCard } from 'lucide-react';

interface OrderConfirmationModalProps {
  order: OrderDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-success-title"
      className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-[#e6e4df] overflow-hidden my-6 p-6 sm:p-8 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Celebration Header */}
        <div className="text-center pb-6 border-b border-[#e6e4df]">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 size={32} />
          </div>
          <span className="text-xs uppercase font-semibold tracking-wider text-[#c4823f]">
            Đơn Hàng Đã Được Xác Nhận (Mô Phỏng Trình Diễn)
          </span>
          <h2 id="order-success-title" className="font-display text-2xl font-bold text-[#121417] mt-1">
            Cảm Ơn Bạn, {order.customerName}
          </h2>
          <p className="text-xs sm:text-sm text-[#6b7280] mt-1 max-w-md mx-auto">
            Đơn hàng thử nghiệm mang mã <strong className="font-mono text-[#121417]">{order.orderId}</strong> đã được ghi nhận trong phiên làm việc hiện tại của bạn.
          </p>
        </div>

        {/* Order Logistics Summary Card */}
        <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#fbfaf8] rounded-md border border-[#e6e4df] text-xs">
          <div className="flex items-start gap-2.5">
            <Calendar size={16} className="text-[#c4823f] mt-0.5" />
            <div>
              <p className="text-[#6b7280]">Dự Kiến Giao Hàng</p>
              <p className="font-semibold text-[#121417] mt-0.5">{order.estimatedDelivery}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <MapPin size={16} className="text-[#c4823f] mt-0.5" />
            <div>
              <p className="text-[#6b7280]">Địa Điểm Nhận</p>
              <p className="font-semibold text-[#121417] mt-0.5 truncate max-w-[130px]">
                {order.city}, {order.country}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CreditCard size={16} className="text-[#c4823f] mt-0.5" />
            <div>
              <p className="text-[#6b7280]">Hình Thức</p>
              <p className="font-semibold text-[#121417] mt-0.5 truncate max-w-[130px]">
                {order.paymentMethod}
              </p>
            </div>
          </div>
        </div>

        {/* Itemized List */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase font-bold tracking-wider text-[#121417] flex items-center gap-2">
            <Package size={14} className="text-[#c4823f]" />
            <span>Danh Sách Sản Phẩm ({order.items.length})</span>
          </h3>

          <div className="divide-y divide-[#f0ede6] max-h-48 overflow-y-auto pr-1">
            {order.items.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover rounded bg-[#f5f4f0] border border-[#e6e4df]"
                    onError={(e) => handleImageError(e, item.name)}
                  />
                  <div>
                    <p className="font-semibold text-[#121417]">{item.name}</p>
                    <p className="text-[#6b7280] text-[11px]">
                      SL {item.quantity} {item.selectedColor ? `· ${item.selectedColor}` : ''}
                    </p>
                  </div>
                </div>
                <span className="font-mono tabular-nums font-semibold text-[#121417]">
                  {formatCurrency(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="pt-3 border-t border-[#e6e4df] space-y-1.5 text-xs text-[#6b7280]">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span className="font-mono tabular-nums font-semibold text-[#121417]">
                {formatCurrency(order.subtotal)}
              </span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-700">
                <span>Chiết khấu</span>
                <span className="font-mono tabular-nums font-semibold">
                  -{formatCurrency(order.discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Vận chuyển</span>
              <span className="font-mono tabular-nums font-semibold text-[#121417]">
                {order.shippingCost === 0 ? 'Miễn phí' : formatCurrency(order.shippingCost)}
              </span>
            </div>
            <div className="pt-2 border-t border-[#e6e4df] flex justify-between text-sm font-bold text-[#121417]">
              <span>Tổng thanh toán</span>
              <span className="font-mono tabular-nums text-base">
                {formatCurrency(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 pt-4 border-t border-[#e6e4df] flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto px-4 py-2 border border-[#d1d5db] text-[#121417] text-xs font-semibold rounded hover:bg-black/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Printer size={14} />
            <span>In Hóa Đơn</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#121417] text-white text-xs font-semibold rounded hover:bg-[#262930] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Tiếp Tục Mua Sắm</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
