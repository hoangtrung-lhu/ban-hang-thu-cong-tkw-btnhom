import React, { useState } from 'react';
import { ARTISANS } from '../data/team';
import { ArtisanMember } from '../types';
import { RotateCw, ArrowLeft, Award, MapPin, Compass, ArrowUpRight } from 'lucide-react';

interface ArtisanTeamSectionProps {
  onSelectCategory: (category: string) => void;
  onScrollToCatalog: () => void;
}

export const ArtisanTeamSection: React.FC<ArtisanTeamSectionProps> = ({
  onSelectCategory,
  onScrollToCatalog,
}) => {
  const [flippedIds, setFlippedIds] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExploreArtisanDiscipline = (member: ArtisanMember) => {
    if (member.id === 'artisan-matteo') {
      onSelectCategory('accessories');
    } else if (member.id === 'artisan-elena') {
      onSelectCategory('apparel');
    } else if (member.id === 'artisan-kenji') {
      onSelectCategory('timepieces');
    } else {
      onSelectCategory('living');
    }
    onScrollToCatalog();
  };

  return (
    <section
      id="artisans-section"
      aria-label="Đội Ngũ Nghệ Nhân & Giám Tuyển Sáng Tạo"
      className="py-18 sm:py-24 bg-[#f5f4f0] border-b border-[#e6e4df]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#c4823f]">
              Đội Ngũ Chế Tác & Giám Tuyển
            </span>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#121417] mt-1">
              Bàn Tay & Khối Óc Đằng Sau NOVA
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#6b7280] max-w-md leading-relaxed">
            Hợp tác cùng những nghệ nhân bậc thầy và nhà điêu khắc hàng đầu Châu Âu và Á Đông. Nhấp vào thẻ để lật (Flip 3D) và khám phá triết lý thiết kế.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ARTISANS.map((member, idx) => {
            const isFlipped = !!flippedIds[member.id];
            return (
              <div
                key={member.id}
                data-aos="fade-up"
                data-aos-delay={idx * 120}
                className="perspective-1000 w-full min-h-[440px] h-[450px]"
              >
                <article
                  className={`relative w-full h-full transition-transform duration-500 ease-out preserve-3d ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* ==================== MẶT TRƯỚC (FRONT) ==================== */}
                  <div className="backface-hidden w-full h-full flex flex-col bg-white border border-[#e6e4df] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group">
                    {/* Portrait Image */}
                    <div className="relative h-56 bg-[#e6e4df] overflow-hidden">
                      <img
                        src={member.avatar}
                        alt={`Nghệ nhân ${member.name} - ${member.role}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        onError={(e) => {
                          // Resilient fallback portrait
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                      {/* Location Badge */}
                      <div className="absolute bottom-3 left-3 text-white flex items-center gap-1 text-xs">
                        <MapPin size={12} className="text-amber-300" />
                        <span>{member.location}</span>
                      </div>

                      {/* Flip Affordance Button */}
                      <button
                        onClick={() => toggleFlip(member.id)}
                        aria-label={`Lật xem triết lý của ${member.name}`}
                        className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-xs text-[#121417] hover:bg-[#121417] hover:text-white rounded-full shadow-xs transition-colors cursor-pointer flex items-center gap-1 group/btn"
                        title="Lật thẻ xem triết lý (3D Flip)"
                      >
                        <RotateCw size={13} className="transition-transform duration-300 group-hover/btn:rotate-180" />
                        <span className="text-[10px] font-medium pr-0.5">Triết lý</span>
                      </button>
                    </div>

                    {/* Member Info */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Zero-Pill specialty */}
                        <div className="text-[11px] uppercase tracking-wider text-[#c4823f] font-semibold mb-1">
                          {member.role}
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#121417] group-hover:text-[#c4823f] transition-colors">
                          {member.name}
                        </h3>
                        <p className="text-xs text-[#6b7280] mt-1.5 line-clamp-2 leading-relaxed">
                          {member.specialty}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-[#e6e4df] flex items-center justify-between text-xs">
                        <span className="text-[#6b7280]">
                          Kinh nghiệm: <strong className="text-[#121417] tabular-nums">{member.yearsOfExperience} năm</strong>
                        </span>
                        <button
                          onClick={() => toggleFlip(member.id)}
                          className="text-[#c4823f] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <span>Xem hồ sơ</span>
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* ==================== MẶT SAU (BACK - 3D FLIPPED) ==================== */}
                  <div className="backface-hidden rotate-y-180 absolute inset-0 w-full h-full flex flex-col bg-[#121417] text-white border border-[#2d3139] rounded-lg p-6 justify-between shadow-xl">
                    <div>
                      {/* Top Bar with Flip Back */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10">
                        <div className="flex items-center gap-1.5 text-amber-300">
                          <Award size={14} />
                          <span className="text-[11px] font-semibold uppercase tracking-wider">
                            {member.badge}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleFlip(member.id)}
                          aria-label="Lật lại mặt trước của thẻ nghệ nhân"
                          className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer flex items-center gap-1 text-xs"
                          title="Lật lại ảnh chân dung"
                        >
                          <ArrowLeft size={13} />
                          <span>Trở lại</span>
                        </button>
                      </div>

                      {/* Header */}
                      <div className="mt-3">
                        <h4 className="font-display text-lg font-bold text-white">
                          {member.name}
                        </h4>
                        <p className="text-xs text-[#c4823f] mt-0.5">
                          {member.location}
                        </p>
                      </div>

                      {/* Philosophy Quote */}
                      <blockquote className="mt-4 p-3 bg-white/5 rounded-md border border-white/5 text-xs text-gray-200 italic leading-relaxed">
                        "{member.philosophy}"
                      </blockquote>

                      {/* Bio brief */}
                      <p className="mt-3 text-xs text-gray-400 leading-relaxed line-clamp-3">
                        {member.bio}
                      </p>
                    </div>

                    {/* Bottom Action */}
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                        Tác phẩm tiêu biểu:
                      </p>
                      <p className="text-xs font-medium text-amber-200 mb-3 truncate">
                        {member.masterpiece}
                      </p>
                      <button
                        onClick={() => handleExploreArtisanDiscipline(member)}
                        className="w-full py-2 bg-[#c4823f] text-[#121417] hover:bg-[#b07232] hover:text-white text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>Xem Bộ Sưu Tập Phụ Trách</span>
                        <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
