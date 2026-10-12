import React from 'react';
import { WATCH_IMAGE } from '../data/products';
import { handleImageError } from '../utils/imageFallback';
import { ArrowRight, Compass, Hammer, Sparkles } from 'lucide-react';

interface EditorialStoryProps {
  onExploreWatch: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({
  onExploreWatch,
}) => {
  return (
    <section
      aria-label="Triết Lý Thương Hiệu Và Nghệ Thuật Chế Tác"
      className="py-18 sm:py-24 bg-[#121417] text-white overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Image with Subtle Glow/Backdrop */}
          <div data-aos="fade-right" className="lg:col-span-6 relative">
            <div className="relative aspect-square rounded-lg overflow-hidden border border-white/10 bg-[#1a1c20] shadow-2xl group">
              <img
                src={WATCH_IMAGE}
                alt="Chi tiết kỹ nghệ chế tác Atelier Chronograph 01 từ chất liệu titan Cấp 5"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={(e) => handleImageError(e, 'Atelier Chronograph')}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50"
              />
              <div className="absolute bottom-5 left-5 right-5 text-xs text-white/80 flex items-center justify-between">
                <span>Atelier Chronograph No. 01</span>
                <span className="font-mono tabular-nums text-amber-300">Giới hạn 150 chiếc</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Essay & Value Propositions */}
          <div data-aos="fade-left" className="lg:col-span-6 space-y-6">
            <span className="text-xs font-semibold tracking-widest uppercase text-[#c4823f]">
              Tuyên Ngôn Về Chất Liệu
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
              Vật Liệu Thuần Khiết, Gia Công Tuyệt Đỉnh
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light">
              Chúng tôi nói không với xu hướng thời trang ngắn hạn và vật phẩm tiêu dùng nhanh. Từng chiếc áo len được dệt từ sợi len virgin merino kiểm định, từng chiếc túi da được cắt may từ da vai bò Tuscan thuộc thảo mộc tự nhiên càng mang càng đượm nét cá tính, và từng chi tiết đồng hồ được tiện phay với dung sai cơ khí siêu chuẩn xác.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-white/10">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#c4823f]">
                  <Hammer size={16} />
                  <h3 className="text-sm font-semibold text-white">Xưởng Nghề Gia Đình</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Sản xuất tại các xưởng may gia đình lâu đời ở Florence và Porto nơi những người thợ lành nghề nhận được mức đãi ngộ công bằng và tôn trọng.
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[#c4823f]">
                  <Compass size={16} />
                  <h3 className="text-sm font-semibold text-white">Không Thuốc Nhuộm Hóa Dầu</h3>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Chỉ sử dụng chất gắn màu nguồn gốc thực vật và các thùng ngâm tanin từ vỏ cây tự nhiên trong suốt quá trình xử lý da.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onExploreWatch}
                className="px-6 py-3 bg-[#c4823f] text-[#121417] text-xs sm:text-sm font-bold rounded-md hover:bg-[#b07232] hover:text-white transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Chiêm Ngưỡng Dòng Đồng Hồ Atelier</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
