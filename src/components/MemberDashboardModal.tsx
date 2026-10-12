import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  ShieldCheck,
  ShoppingBag,
  Clock,
  FileText,
  Save,
  LogOut,
  Sparkles,
  Check,
  RefreshCw,
  Copy,
  Activity,
  Heart,
  Package,
} from 'lucide-react';
import { UserProfileData, logoutUser } from '../lib/auth';
import { updateUserProfile, saveStoreMemberData } from '../lib/firestore';

interface MemberDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserProfile: UserProfileData | null;
  onProfileUpdated: (updatedProfile: UserProfileData) => void;
  onLogout: () => void;
  showToast: (message: string) => void;
}

export const MemberDashboardModal: React.FC<MemberDashboardModalProps> = ({
  isOpen,
  onClose,
  currentUserProfile,
  onProfileUpdated,
  onLogout,
  showToast,
}) => {
  const [displayName, setDisplayName] = useState('');
  const [shoppingPreference, setShoppingPreference] = useState('');
  const [membershipLevel, setMembershipLevel] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(true);
  const [notes, setNotes] = useState('');

  const [isSaving, setIsSaving] = useState(false);
  const [copiedUid, setCopiedUid] = useState(false);

  // Populate state when profile changes
  useEffect(() => {
    if (currentUserProfile) {
      setDisplayName(currentUserProfile.displayName || '');
      setShoppingPreference(currentUserProfile.shoppingPreference || 'Thời Trang & Phụ Kiện');
      setMembershipLevel(currentUserProfile.membershipLevel || 'Hội Viên Bạc');
      setNewsletterSubscribed(currentUserProfile.newsletterSubscribed ?? true);
      setNotes(currentUserProfile.notes || '');
    }
  }, [currentUserProfile, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !currentUserProfile) return null;

  const handleCopyUid = () => {
    navigator.clipboard.writeText(currentUserProfile.userId);
    setCopiedUid(true);
    setTimeout(() => setCopiedUid(false), 2000);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updatedFields: Partial<UserProfileData> = {
        displayName: displayName.trim(),
        shoppingPreference,
        membershipLevel,
        newsletterSubscribed,
        notes: notes.trim(),
      };

      // 1. Update Firestore users/{uid}
      await updateUserProfile(currentUserProfile.userId, updatedFields);

      // 2. Also persist to storeMembers/{uid} collection
      await saveStoreMemberData(currentUserProfile.userId, {
        shoppingPreference,
        membershipLevel,
        newsletterSubscribed,
        notes: notes.trim(),
      });

      const newFullProfile: UserProfileData = {
        ...currentUserProfile,
        ...updatedFields,
      };

      onProfileUpdated(newFullProfile);
      showToast('Hồ sơ hội viên NOVA đã được cập nhật thành công!');
    } catch (err: any) {
      console.error('[Save Profile Error]:', err);
      showToast('Lỗi khi lưu dữ liệu: ' + (err.message || 'Vui lòng thử lại.'));
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogoutClick = async () => {
    try {
      await logoutUser();
      onLogout();
      onClose();
      showToast('Hẹn sớm gặp lại bạn tại NOVA Store.');
    } catch (err: any) {
      console.error('[Logout Error]:', err);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-dashboard-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-scale"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl bg-[#121417] text-white border border-[#2d3139] rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-6 bg-[#1a1c20] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#c4823f] to-amber-200 text-black flex items-center justify-center font-bold text-lg shadow-md">
              {displayName ? displayName.charAt(0).toUpperCase() : 'N'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="member-dashboard-title" className="font-display text-lg sm:text-xl font-bold text-white">
                  {displayName || 'Hội Viên NOVA'}
                </h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-[#c4823f]/10 text-[#c4823f] border border-[#c4823f]/20 px-2.5 py-1 rounded-sm">
                  {membershipLevel}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">{currentUserProfile.email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Đóng bảng điều khiển"
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Live Sync Status Banner */}
        <div className="px-6 py-2.5 bg-black/40 border-b border-white/5 flex items-center justify-between text-[10px] text-gray-400">
          <div className="flex items-center gap-2 uppercase tracking-widest font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4823f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4823f]"></span>
            </span>
            <span className="text-[#c4823f]">Dữ Liệu Đang Đồng Bộ</span>
          </div>

          <button
            onClick={handleCopyUid}
            className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-mono"
            title="Sao chép User UID"
          >
            <span>ID: {currentUserProfile.userId.substring(0, 12)}...</span>
            {copiedUid ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSaveProfile} className="p-6 sm:p-8 space-y-8 overflow-y-auto flex-1">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <Package size={18} className="mx-auto mb-2 text-[#c4823f]" />
              <div className="text-xl font-bold">12</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Đơn hàng</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <Heart size={18} className="mx-auto mb-2 text-rose-500" />
              <div className="text-xl font-bold">08</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Yêu thích</div>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 text-center">
              <Sparkles size={18} className="mx-auto mb-2 text-amber-400" />
              <div className="text-xl font-bold">2.4k</div>
              <div className="text-[10px] text-gray-500 uppercase font-bold">Điểm tích lũy</div>
            </div>
          </div>

          {/* Section: Profile Info */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c4823f] flex items-center gap-2 mb-4">
              <User size={14} />
              <span>Cài đặt tài khoản</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Tên Hiển Thị</label>
                <input
                  type="text"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none transition-colors"
                  placeholder="Ví dụ: Hoàng Trung"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Danh mục quan tâm</label>
                <select
                  value={shoppingPreference}
                  onChange={(e) => setShoppingPreference(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-[#1e2025] border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none transition-colors cursor-pointer appearance-none"
                >
                  <option value="Thời Trang & Phụ Kiện">Thời Trang & Phụ Kiện</option>
                  <option value="Nội Thất & Decor">Nội Thất & Decor</option>
                  <option value="Đồng Hồ Cao Cấp">Đồng Hồ Cao Cấp</option>
                  <option value="Tất cả danh mục">Tất cả danh mục</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section: Preferences */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#c4823f] flex items-center gap-2 mb-4">
              <ShieldCheck size={14} />
              <span>Quyền riêng tư & Thông báo</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1">Cấp độ hội viên</label>
                <select
                  value={membershipLevel}
                  onChange={(e) => setMembershipLevel(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-[#1e2025] border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none transition-colors cursor-pointer appearance-none"
                >
                  <option value="Hội Viên Đồng">Hội Viên Đồng (Basic)</option>
                  <option value="Hội Viên Bạc">Hội Viên Bạc (Elite)</option>
                  <option value="Hội Viên Vàng">Hội Viên Vàng (Pro)</option>
                  <option value="Thành Viên Black Card">Thành Viên Black Card</option>
                </select>
              </div>

              <div className="flex items-center gap-3 h-[46px] mt-4 sm:mt-0">
                <input
                  type="checkbox"
                  id="newsletter"
                  checked={newsletterSubscribed}
                  onChange={(e) => setNewsletterSubscribed(e.target.checked)}
                  className="w-5 h-5 rounded border-white/10 bg-white/5 text-[#c4823f] focus:ring-[#c4823f] cursor-pointer"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-300 cursor-pointer select-none">
                  Nhận tin tức ưu đãi và BST mới
                </label>
              </div>
            </div>
          </div>

          {/* Section: Notes */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500 ml-1 mb-1.5 flex items-center gap-1.5">
              <FileText size={13} />
              <span>Tiểu sử / Ghi chú cá nhân</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:outline-none transition-colors resize-none"
              placeholder="Chia sẻ về phong cách cá nhân của bạn hoặc yêu cầu đặc biệt về đơn hàng..."
            />
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleLogoutClick}
              className="px-5 py-3 text-xs font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/10 rounded-xl transition-all flex items-center gap-2 cursor-pointer uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span>Đăng Xuất</span>
            </button>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-3 text-xs font-bold text-gray-500 hover:text-white transition-colors cursor-pointer uppercase tracking-widest"
              >
                Hủy Bỏ
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-8 py-3 bg-[#c4823f] hover:bg-[#b07232] text-[#121417] font-bold text-xs rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-[#c4823f]/10 disabled:opacity-50 active:scale-95 uppercase tracking-widest"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Đang cập nhật...</span>
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    <span>Lưu thay đổi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
