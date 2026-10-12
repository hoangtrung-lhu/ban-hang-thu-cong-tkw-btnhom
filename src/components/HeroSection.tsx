import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { handleImageError } from '../utils/imageFallback';
import { ArrowDown, ShieldCheck, Sparkles, Truck } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenStory: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenStory,
}) => {
  return (
    <section
      aria-label="Bộ Sưu Tập Nổi Bật"
      className="relative overflow-hidden bg-[#fbfaf8] pt-6 pb-16 lg:pt-10 lg:pb-24 border-b border-[#e6e4df]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 z-10">
            {/* Editorial Lead Kicker */}
            <div className="animate-fade-in-up">
              <span className="text-xs uppercase font-semibold tracking-widest text-[#c4823f]">
                Bộ Sưu Tập Thu / Đông 2026
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-fade-in-up animation-delay-100 font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#121417] leading-[1.08] text-balance">
              Chế Tác Cho Lối Sống Tinh Tế & Giá Trị Bền Lâu
            </h1>

            {/* Subtitle */}
            <p className="animate-fade-in-up animation-delay-200 text-base sm:text-lg text-[#6b7280] leading-relaxed max-w-xl">
              Bộ sưu tập tuyển chọn gồm sợi len virgin merino thượng hạng, đồ da thuộc thảo mộc thủ công Ý và các vật phẩm trang trí điêu khắc—được thiết kế để trở nên đẹp hơn theo thời gian.
            </p>

            {/* CTA Buttons */}
            <div className="animate-fade-in-up animation-delay-300 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="btn-tactile px-6 py-3.5 bg-[#121417] text-white text-sm font-semibold rounded-md hover:bg-[#262930] shadow-sm flex items-center gap-2 group cursor-pointer"
              >
                <span>Khám Phá Danh Mục</span>
                <ArrowDown size={16} className="group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenStory}
                className="btn-tactile px-6 py-3.5 bg-transparent border border-[#121417]/25 text-[#121417] text-sm font-medium rounded-md hover:bg-black/5 cursor-pointer"
              >
                Nghệ Thuật Chế Tác
              </button>
            </div>

            {/* Clean unboxed proof markers */}
            <div className="animate-fade-in-up animation-delay-400 pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#6b7280]">
              <span>Sản Xuất Số Lượng Giới Hạn</span>
              <span aria-hidden="true">·</span>
              <span>Đóng Gói Không Nhựa</span>
              <span aria-hidden="true">·</span>
              <span>Bảo Hành Xưởng Trọn Đời</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase (Slide-in-right + Scale) */}
          <div className="lg:col-span-6 animate-fade-in-right animation-delay-200">
            <div className="relative group overflow-hidden rounded-lg bg-[#f0ede6] aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] shadow-md border border-[#e6e4df]">
              <img
                src={HERO_IMAGE}
                alt="Chiến dịch Thu Đông NOVA tôn vinh áo len merino tối giản và túi da thủ công"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
                onError={(e) => handleImageError(e, 'NOVA Lookbook')}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"
              />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 text-white flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wider text-amber-200 font-medium">
                    Ấn Bản Lookbook
                  </p>
                  <p className="font-display text-sm sm:text-base font-semibold">
                    Tủ Đồ Phong Cách Hiện Đại
                  </p>
                </div>
                <button
                  onClick={onExploreClick}
                  className="btn-tactile text-xs bg-white/20 backdrop-blur-md hover:bg-white/30 text-white px-3 py-1.5 rounded"
                >
                  Xem Bộ Sưu Tập
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Adjacency Trust Strip */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="mt-14 pt-8 border-t border-[#e6e4df] grid grid-cols-1 sm:grid-cols-3 gap-6 text-left"
        >
          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-50 text-[#c4823f] rounded-md shrink-0">
              <Truck size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#121417]">Vận Chuyển Trung Hòa Carbon</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">Miễn phí cho đơn hàng từ $150 với mã theo dõi chuyển phát.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-50 text-[#c4823f] rounded-md shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#121417]">Da Bò Thuộc Thảo Mộc Tuscan</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">Thuộc da đạo đức bằng chiết xuất vỏ cây hạt dẻ tự nhiên tại Florence.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2 bg-amber-50 text-[#c4823f] rounded-md shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-[#121417]">Dịch Vụ Phục Hồi Trọn Đời</h2>
              <p className="text-xs text-[#6b7280] mt-0.5">Bảo hành đường may, dây khóa kéo và các chi tiết cơ khí bền lâu.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
