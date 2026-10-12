import React from 'react';
import { CATEGORIES } from '../data/products';
import { handleImageError } from '../utils/imageFallback';
import { ArrowUpRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (categorySlug: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
}) => {
  return (
    <section
      aria-label="Danh Mục Sản Phẩm Tuyển Chọn"
      className="py-16 sm:py-20 bg-white border-b border-[#e6e4df]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          data-aos="fade-up"
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#c4823f]">
              Bộ Sưu Tập Độc Bản
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#121417] mt-1">
              Khám Phá Theo Nhóm Sản Phẩm
            </h2>
          </div>
          <p className="text-sm text-[#6b7280] max-w-md">
            Mỗi nhóm sản phẩm đại diện cho niềm đam mê nguyên liệu tự nhiên thuần túy, tay nghề thủ công đạo đức và công năng bền bỉ qua năm tháng.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, idx) => (
            <article
              key={category.id}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="group relative flex flex-col bg-[#fbfaf8] border border-[#e6e4df] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e6df]">
                <img
                  src={category.image}
                  alt={category.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  loading="lazy"
                  onError={(e) => handleImageError(e, category.name)}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity"
                />
                <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#121417] text-xs font-medium px-2.5 py-1 rounded-sm shadow-xs tabular-nums">
                  {category.itemCount} sản phẩm
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-[#121417] group-hover:text-[#c4823f] transition-colors flex items-center justify-between">
                    <span>{category.name}</span>
                    <ArrowUpRight
                      size={16}
                      className="text-[#6b7280] group-hover:text-[#c4823f] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </h3>
                  <p className="text-xs text-[#6b7280] mt-1.5 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#e6e4df]">
                  <button
                    onClick={() => onSelectCategory(category.slug)}
                    className="w-full py-1.5 text-xs font-semibold uppercase tracking-wider text-[#121417] hover:text-[#c4823f] transition-colors text-left flex items-center justify-between cursor-pointer"
                  >
                    <span>Khám phá nhóm</span>
                    <span className="text-xs">→</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
