import React, { useState, useEffect } from 'react';
import {
  Radio,
  Send,
  Sparkles,
  MessageSquare,
  Activity,
  CheckCircle,
  Calendar,
  Award,
  RefreshCw,
  Plus,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import {
  LiveAnnouncement,
  subscribeToLiveAnnouncements,
  postLiveAnnouncement,
  seedInitialAnnouncementsIfEmpty,
} from '../lib/firestore';
import { UserProfileData } from '../lib/auth';

interface LiveStoreFeedProps {
  currentUserProfile: UserProfileData | null;
  onOpenAuth: () => void;
  showToast: (message: string) => void;
}

export const LiveStoreFeed: React.FC<LiveStoreFeedProps> = ({
  currentUserProfile,
  onOpenAuth,
  showToast,
}) => {
  const [announcements, setAnnouncements] = useState<LiveAnnouncement[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedError, setFeedError] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'announcement' | 'collection' | 'purchase' | 'event'>('purchase');
  const [showPostForm, setShowPostForm] = useState(false);

  // Initialize and subscribe to Firestore Real-Time Listener
  useEffect(() => {
    // 1. Seed initial sample data if collection is blank
    seedInitialAnnouncementsIfEmpty();

    // 2. Attach real-time Firestore onSnapshot listener
    const unsubscribe = subscribeToLiveAnnouncements(
      (items) => {
        setAnnouncements(items);
        setIsLoading(false);
        setFeedError(null);
      },
      (err) => {
        setFeedError('Không thể kết nối đến Firestore. Vui lòng kiểm tra Security Rules.');
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentUserProfile) {
      showToast('Vui lòng đăng nhập để chia sẻ trải nghiệm mua sắm của bạn.');
      onOpenAuth();
      return;
    }

    if (!title.trim() || !content.trim()) {
      showToast('Vui lòng điền đầy đủ tiêu đề và nội dung.');
      return;
    }

    setIsSubmitting(true);

    try {
      await postLiveAnnouncement({
        title: title.trim(),
        content: content.trim(),
        category,
        authorName: currentUserProfile.displayName || 'Hội Viên NOVA',
        authorId: currentUserProfile.userId,
      });

      setTitle('');
      setContent('');
      setShowPostForm(false);
      showToast('Đã chia sẻ thông báo mua sắm thời gian thực thành công!');
    } catch (err: any) {
      console.error('[Post Announcement Error]:', err);
      showToast('Lỗi khi phát sóng: ' + (err.message || 'Kiểm tra quyền ghi'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimestamp = (timestamp: any): string => {
    if (!timestamp) return 'Vừa xong';
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' · ' +
             date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
    } catch {
      return 'Vừa xong';
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'purchase':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-sm">
            <ShoppingBag size={11} /> Mua Sắm Mới
          </span>
        );
      case 'collection':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-sm">
            <Sparkles size={11} /> Bộ Sưu Tập
          </span>
        );
      case 'event':
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-sm">
            <Calendar size={11} /> Sự Kiện
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-sm">
            <Radio size={11} /> Thông Báo
          </span>
        );
    }
  };

  return (
    <section
      id="live-feed-section"
      aria-label="Cộng đồng NOVA Thời Gian Thực"
      className="py-18 sm:py-24 bg-[#121417] text-white border-b border-[#2d3139] relative overflow-hidden"
    >
      {/* Visual background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#c4823f]/5 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Pulse Indicator */}
        <div data-aos="fade-up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4823f] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c4823f]"></span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c4823f]">
                NOVA LIVE STREAM · FIRESTORE ONSNAPSHOT
              </span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Dòng Chảy Cộng Đồng <br className="hidden sm:block" /> & Trải Nghiệm Thời Gian Thực
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (!currentUserProfile) {
                  onOpenAuth();
                } else {
                  setShowPostForm(!showPostForm);
                }
              }}
              className="px-6 py-3 bg-[#c4823f] hover:bg-[#b07232] text-[#121417] text-xs font-bold rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xl shadow-[#c4823f]/10 active:scale-95 uppercase tracking-widest"
            >
              <Plus size={16} />
              <span>{showPostForm ? 'Đóng form' : 'Chia sẻ khoảnh khắc'}</span>
            </button>
          </div>
        </div>

        {/* Tutorial Callout */}
        <div data-aos="fade-up" className="mb-10 p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
            <Zap size={20} className="text-amber-400" />
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-white">Trải nghiệm đồng bộ tức thì:</strong> Hãy thử mở NOVA Store trên hai trình duyệt khác nhau. Bất kỳ thông báo hay chia sẻ nào được đăng tải sẽ lập tức xuất hiện trên mọi màn hình mà <span className="text-[#c4823f] font-bold">không cần tải lại trang</span>, nhờ vào công nghệ kết nối thời gian thực của Cloud Firestore.
          </p>
        </div>

        {/* Post Form Drawer */}
        {showPostForm && (
          <form
            onSubmit={handlePostSubmit}
            className="mb-10 p-8 bg-[#1a1c20] border border-[#c4823f]/30 rounded-2xl space-y-6 animate-fade-in-down shadow-2xl"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c4823f]">
                Phát sóng thông tin lên cộng đồng NOVA
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-bold">
                Tác giả: <span className="text-white">{currentUserProfile?.displayName}</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Tiêu Đề Chia Sẻ</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ví dụ: Vừa sở hữu chiếc Atelier Chronograph đầu tiên..."
                  className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Chủ Đề</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 text-sm bg-[#121417] border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="purchase">Mua Sắm Mới</option>
                  <option value="collection">Bộ Sưu Tập</option>
                  <option value="event">Sự Kiện & Workshop</option>
                  <option value="announcement">Thông Báo Hệ Thống</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Cảm nhận & Chi tiết</label>
              <textarea
                rows={3}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Chia sẻ trải nghiệm của bạn về chất liệu, thiết kế hoặc dịch vụ của chúng tôi..."
                className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none resize-none transition-colors"
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => setShowPostForm(false)}
                className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-[#c4823f] hover:bg-[#b07232] text-[#121417] font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c4823f]/10 disabled:opacity-50 uppercase tracking-widest"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Đang gửi...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Phát sóng ngay</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Live List Feed Container */}
        {isLoading ? (
          <div className="py-24 text-center">
            <RefreshCw size={32} className="animate-spin mx-auto mb-4 text-[#c4823f]" />
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-bold">Đang kết nối luồng dữ liệu...</p>
          </div>
        ) : feedError ? (
          <div className="py-16 text-center p-8 bg-rose-500/5 border border-rose-500/10 rounded-2xl text-rose-300 text-xs font-medium">
            {feedError}
          </div>
        ) : announcements.length === 0 ? (
          <div className="py-24 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-3xl p-12">
            <MessageSquare size={40} className="mx-auto text-gray-600 mb-4" />
            <h4 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">Không gian tĩnh lặng</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">Hãy là người đầu tiên chia sẻ cảm nhận hoặc cập nhật thông tin lên cộng đồng NOVA Store.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="group bg-[#1a1c20] border border-white/5 hover:border-[#c4823f]/40 rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    {getCategoryBadge(item.category)}
                    <span className="text-[10px] font-mono text-gray-500 tabular-nums uppercase font-bold tracking-tighter">
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-white mb-3 line-clamp-2 group-hover:text-[#c4823f] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">
                    {item.content}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-[#c4823f] text-[#121417] flex items-center justify-center font-bold text-[10px]">
                      {item.authorName ? item.authorName.charAt(0).toUpperCase() : 'N'}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300 truncate max-w-[120px]">
                      {item.authorName}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[9px] text-gray-500 uppercase tracking-[0.1em] font-bold italic">Verified</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
