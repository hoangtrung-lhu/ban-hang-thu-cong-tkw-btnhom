import React, { useState } from 'react';
import { ArrowRight, Check, Heart } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (category: string) => void;
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onScrollToTop,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer
      aria-label="Chân Trang"
      className="bg-[#121417] text-gray-300 border-t border-white/10 pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          {/* Brand & Manifesto (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onScrollToTop();
              }}
              className="font-display text-2xl font-bold tracking-tight text-white block"
            >
              NOVA <span className="text-[#c4823f] font-light">STORE</span>
            </a>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Cửa hàng trực tuyến tuyển chọn tôn vinh sự bền vững, nguồn gốc minh bạch và tính thẩm mỹ kiến trúc. Xây dựng theo nguyên lý web ngữ nghĩa, hệ thống thiết kế linh hoạt và chuyển động tinh tế.
            </p>
            <div className="pt-2 text-xs text-gray-500">
              <span>Đồ Án Cuối Khóa Tuần 5 AI Web Development</span>
              <span className="mx-2">·</span>
              <span>Semantic HTML5 & Kiến Trúc Responsive</span>
            </div>
          </div>

          {/* Navigation Links (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Bộ Sưu Tập
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectCategory('all')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Tất Cả Sản Phẩm
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('apparel')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Thời Trang Len Merino
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('accessories')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Đồ Da Thuộc Tuscan
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('living')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Vật Dụng Nội Thất
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('timepieces')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Đồng Hồ Titan Bấm Giờ
                </button>
              </li>
            </ul>
          </div>

          {/* Service & Standards (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Hỗ Trợ Khách Hàng
            </h3>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>Chính Sách Vận Chuyển Toàn Cầu</li>
              <li>Đổi Trả Dễ Dàng Trong 30 Ngày</li>
              <li>Bảo Hành & Sửa Chữa Tại Xưởng</li>
              <li>Hướng Dẫn Bảo Quản Đồ Da & Len</li>
              <li>Báo Cáo Tác Động Môi Trường</li>
            </ul>
          </div>

          {/* Newsletter Subscription (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white">
              Bản Tin Định Kỳ
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Nhận thông báo sớm về các đợt phát hành bộ sưu tập giới hạn theo mùa và tin tức từ xưởng chế tác.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Nhập địa chỉ email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-3 pr-10 py-2 text-xs bg-white/5 border border-white/15 rounded text-white placeholder:text-gray-500 focus:outline-none focus:border-[#c4823f]"
                />
                <button
                  type="submit"
                  aria-label="Đăng ký nhận bản tin"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 text-[#c4823f] hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowRight size={15} />
                </button>
              </div>

              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check size={12} />
                  <span>Đã đăng ký! Cảm ơn bạn đã đồng hành cùng cộng đồng của chúng tôi.</span>
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Accessibility info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} NOVA STORE. Thiết kế chuẩn xác, tinh tế và bền vững.</p>
          <div className="flex items-center gap-4">
            <span>Đạt Chuẩn Trợ Năng WCAG 2.1 AA</span>
            <span>·</span>
            <span>Không Thu Thập Cookie Quảng Cáo</span>
            <span>·</span>
            <button
              onClick={onScrollToTop}
              className="text-[#c4823f] hover:underline cursor-pointer"
            >
              Lên đầu trang ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
