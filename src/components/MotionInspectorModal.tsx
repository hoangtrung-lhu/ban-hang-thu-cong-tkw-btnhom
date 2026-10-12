import React, { useState } from 'react';
import { Sliders, Sparkles, X, Copy, Check, Activity, Cpu, Zap } from 'lucide-react';

interface MotionInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MotionInspectorModal: React.FC<MotionInspectorModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [testBallTrigger, setTestBallTrigger] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<'artisanal' | 'spring' | 'linear'>('artisanal');

  const masterPromptText = `[PROMPT ENGINEERING BẬC THẦY CHO CUBIC-BEZIER & COMPOSITOR-ONLY MOTION]

"Bạn là chuyên gia Senior Motion Designer và Web Performance Engineer tại Apple / Vercel. Hãy thiết kế một hệ thống đường cong chuyển động (Easing Curves) cao cấp cho một thương hiệu thương mại điện tử xa xỉ (Luxury Artisanal Storefront) với các tiêu chuẩn khắt khe sau:

1. ĐẶC TẢ TÂM LÝ HỌC CHUYỂN ĐỘNG:
- Entrance Easing (Xuất hiện): Không dùng linear hay ease-in-out generic. Tính toán chính xác tọa độ cubic-bezier(0.22, 1, 0.36, 1) với lực gia tốc cực mạnh trong 20% đầu tiên và hãm tốc từ tốn trong 80% thời lượng còn lại (deceleration curve), tạo cảm giác vững chãi, thanh lịch như một cánh cửa gỗ nặng tự động khép êm ái.
- Routine Micro-interactions (Hover & Button Press): Đặt cubic-bezier(0.2, 0.8, 0.2, 1) trong biên độ 160ms–200ms để người dùng cảm nhận độ nảy vật lý tức thì (tactile feedback) mà không có bất kỳ độ trễ nào.
- 3D Flip Card Transition: Áp dụng cubic-bezier(0.34, 1.56, 0.64, 1) cho chuyển động lật thẻ không gian 3D, tạo độ nảy đàn hồi tinh tế (subtle overshoot spring) ở điểm kết thúc 180 độ.

2. RÀNG BUỘC KỸ THUẬT HIỆU NĂNG BẤT KHẢ XÂM PHẠM:
- Tuyệt đối 100% chuyển động chỉ được can thiệp vào thuộc tính GPU Compositor: 'transform: translate()', 'transform: rotateY()', 'transform: scale()', và 'opacity'.
- Cấm triệt để animate các thuộc tính kích hoạt Layout Reflow hoặc Paint như 'top', 'left', 'bottom', 'right', 'width', 'height', 'margin', 'padding'.
- Đóng gói toàn bộ vào các Design Tokens CSS :root, tích hợp will-change: transform, opacity và khai báo fallback đầy đủ cho @media (prefers-reduced-motion: reduce)."`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(masterPromptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runTestMotion = () => {
    setTestBallTrigger((prev) => prev + 1);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bảng kiểm tra chuyển động và Prompt Engineering"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in-scale"
    >
      <div className="bg-[#121417] text-white border border-[#2d3139] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg border border-amber-500/20">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                AI Prompt Engineering & Motion Inspector
              </h3>
              <p className="text-xs text-gray-400">
                Tuần 5: Smart Interface • Chuẩn Compositor-Only • Cubic-Bezier Tuning
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ kiểm tra chuyển động"
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Performance Matrix */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold">
              <Activity size={14} />
              <span>FPS Baseline</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1 tabular-nums">60 FPS</p>
            <p className="text-[10px] text-gray-400">GPU Accelerated</p>
          </div>

          <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1.5 text-amber-400 text-xs font-semibold">
              <Cpu size={14} />
              <span>Reflow Impact</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1">0 Paint</p>
            <p className="text-[10px] text-gray-400">Transform & Opacity</p>
          </div>

          <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-center">
            <div className="flex items-center justify-center gap-1.5 text-cyan-400 text-xs font-semibold">
              <Zap size={14} />
              <span>Latency</span>
            </div>
            <p className="text-lg font-bold font-mono text-white mt-1 tabular-nums">160ms</p>
            <p className="text-[10px] text-gray-400">Tactile Micro-state</p>
          </div>
        </div>

        {/* Master Prompt Section */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
              <Sliders size={13} />
              <span>Prompt Bậc Thầy Điều Chỉnh Cubic-Bezier</span>
            </span>
            <button
              onClick={handleCopyPrompt}
              className="text-xs bg-white/10 hover:bg-white/20 text-white px-2.5 py-1 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
              <span>{copied ? 'Đã sao chép' : 'Sao chép Prompt'}</span>
            </button>
          </div>

          <pre className="p-4 bg-black/60 border border-white/10 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed max-h-48 whitespace-pre-wrap">
            {masterPromptText}
          </pre>
        </div>

        {/* Interactive Cubic-Bezier Sandbox */}
        <div className="mt-6 pt-5 border-t border-white/10">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-300 mb-3">
            Thử Nghiệm Trực Quan Đường Cong Chuyển Động:
          </h4>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setSelectedPreset('artisanal')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedPreset === 'artisanal'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              Entrance: cubic-bezier(0.22, 1, 0.36, 1)
            </button>

            <button
              onClick={() => setSelectedPreset('spring')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedPreset === 'spring'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              Spring: cubic-bezier(0.34, 1.56, 0.64, 1)
            </button>

            <button
              onClick={() => setSelectedPreset('linear')}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                selectedPreset === 'linear'
                  ? 'bg-amber-500 text-black font-semibold'
                  : 'bg-white/10 text-gray-300 hover:text-white'
              }`}
            >
              Linear (Anti-pattern so sánh)
            </button>
          </div>

          {/* Track and Animated Ball */}
          <div className="relative bg-black/40 border border-white/10 rounded-lg h-16 p-3 flex items-center overflow-hidden">
            <div
              key={testBallTrigger}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-[#c4823f] shadow-lg flex items-center justify-center text-black font-bold text-xs"
              style={{
                transition: `transform 700ms ${
                  selectedPreset === 'artisanal'
                    ? 'cubic-bezier(0.22, 1, 0.36, 1)'
                    : selectedPreset === 'spring'
                    ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
                    : 'linear'
                }`,
                transform: testBallTrigger % 2 === 1 ? 'translateX(calc(100% + 280px))' : 'translateX(0px)',
              }}
            >
              GPU
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button
              onClick={runTestMotion}
              className="px-4 py-2 bg-white text-black hover:bg-gray-200 text-xs font-bold rounded cursor-pointer transition-transform active:scale-95"
            >
              Kích hoạt chuyển động (Test Pulse)
            </button>

            <span className="text-xs text-gray-400">
              Chỉ dùng: <code className="text-amber-300 font-mono">transform: translateX(...)</code>
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded cursor-pointer transition-colors"
          >
            Đóng Cửa Sổ
          </button>
        </div>
      </div>
    </div>
  );
};
