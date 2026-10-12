import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, User, Eye, EyeOff, ArrowRight, RefreshCw, Sparkles, CheckCircle2, ShieldCheck, ShoppingBag, Dumbbell } from 'lucide-react';
import { signUpUser, loginUser, getAuthErrorMessage, UserProfileData } from '../lib/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (profile: UserProfileData) => void;
  showToast: (message: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  showToast,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [shoppingPreference, setShoppingPreference] = useState('Thời Trang & Phụ Kiện');

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset errors when modal changes mode or opens
  useEffect(() => {
    if (isOpen) {
      setErrorMessage(null);
    }
  }, [isOpen, mode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Basic frontend validations
    if (!email || !email.includes('@')) {
      setErrorMessage('Vui lòng nhập định dạng email hợp lệ.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Mật khẩu bảo mật phải có tối thiểu 6 ký tự.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setErrorMessage('Vui lòng nhập họ và tên của bạn.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Mật khẩu xác nhận không trùng khớp.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'register') {
        // Register with Firebase Auth & save profile to Firestore users/{uid}
        const { profile } = await signUpUser(email, password, name, shoppingPreference);
        showToast(`Chào mừng ${profile.displayName} đến với thế giới NOVA!`);
        onAuthSuccess(profile);
        onClose();
      } else {
        // Log in with Firebase Auth
        const firebaseUser = await loginUser(email, password);
        const profile: UserProfileData = {
          userId: firebaseUser.uid,
          email: firebaseUser.email || email,
          displayName: firebaseUser.displayName || email.split('@')[0],
          shoppingPreference: shoppingPreference,
          membershipLevel: 'Hội Viên Bạc',
        };
        showToast(`Mừng bạn trở lại, ${profile.displayName}!`);
        onAuthSuccess(profile);
        onClose();
      }
    } catch (err: any) {
      console.error('[Firebase Auth Error]:', err);
      const friendlyMsg = getAuthErrorMessage(err);
      setErrorMessage(friendlyMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in-scale"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#121417] text-white border border-[#2d3139] rounded-2xl shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-500 flex flex-col md:flex-row min-h-[580px]">
        
        {/* Left Side: Editorial / Brand Content (Desktop Only) */}
        <div className="hidden md:flex w-5/12 bg-[#1a1c20] p-10 flex-col justify-between relative overflow-hidden border-r border-white/5">
          {/* Background decoration */}
          <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-[#c4823f]/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-48 h-48 bg-blue-500/5 rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-12">
              <div className="p-2.5 bg-[#c4823f] rounded-xl shadow-lg shadow-[#c4823f]/20 flex items-center justify-center">
                <ShoppingBag size={22} className="text-[#121417]" />
              </div>
              <span className="font-display font-bold tracking-tight text-2xl">
                NOVA <span className="font-light text-[#c4823f]">STORE</span>
              </span>
            </div>

            <h3 className="font-display text-2xl lg:text-3xl font-bold leading-tight mb-5">
              {mode === 'login' ? 'Khởi đầu phong cách sống mới' : 'Gia nhập cộng đồng tinh hoa'}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              {mode === 'login' 
                ? 'Truy cập vào kho lưu trữ cá nhân, theo dõi những món đồ thủ công đang trên đường tới bạn.' 
                : 'Trở thành hội viên để nhận đặc quyền truy cập sớm các bộ sưu tập giới hạn và ưu đãi độc bản.'}
            </p>

            <div className="space-y-5">
              {[
                { icon: <CheckCircle2 size={18} className="text-emerald-400" />, text: 'Ưu đãi 10% cho đơn đầu tiên' },
                { icon: <CheckCircle2 size={18} className="text-emerald-400" />, text: 'Theo dõi đơn hàng thời gian thực' },
                { icon: <CheckCircle2 size={18} className="text-emerald-400" />, text: 'Quyền truy cập sớm BST mới' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 text-xs text-gray-300">
                  <div className="shrink-0">{item.icon}</div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/5">
            <div className="flex items-center gap-2.5 text-[10px] uppercase tracking-widest text-gray-500 font-bold">
              <ShieldCheck size={14} className="text-[#c4823f]" />
              <span>Bảo mật chuẩn mã hóa NOVA 256-bit</span>
            </div>
          </div>
        </div>

        {/* Right Side: Auth Forms */}
        <div className="flex-1 p-6 sm:p-12 flex flex-col justify-center bg-[#121417]">
          {/* Close button for mobile or as general */}
          <button
            onClick={onClose}
            aria-label="Đóng cửa sổ"
            className="absolute top-5 right-5 p-2.5 text-gray-500 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer z-20"
          >
            <X size={22} />
          </button>

          {/* Form Content */}
          <div className="max-w-sm mx-auto w-full">
            {/* Header info for mobile (Hidden on desktop as it's in left panel) */}
            <div className="md:hidden text-center mb-10">
              <span className="font-display font-bold tracking-tight text-2xl">
                NOVA <span className="font-light text-[#c4823f]">STORE</span>
              </span>
            </div>

            <div className="mb-8">
              <h2 id="auth-modal-title" className="font-display text-2xl font-bold mb-2.5">
                {mode === 'login' ? 'Đăng nhập' : 'Tạo tài khoản'}
              </h2>
              <p className="text-gray-400 text-sm">
                {mode === 'login' ? 'Chào mừng bạn trở lại với NOVA.' : 'Bắt đầu hành trình mua sắm cao cấp của bạn.'}
              </p>
            </div>

            {/* Error notice */}
            {errorMessage && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl flex items-start gap-3 animate-shake">
                <div className="mt-0.5 shrink-0">⚠️</div>
                <p className="leading-relaxed">{errorMessage}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Họ và tên</label>
                  <div className="relative group">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4823f] transition-colors" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nguyễn Văn A"
                      className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:bg-white/[0.08] focus:outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Email</label>
                <div className="relative group">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4823f] transition-colors" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:bg-white/[0.08] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Danh mục quan tâm</label>
                  <div className="relative group">
                    <Sparkles size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4823f] transition-colors" />
                    <select
                      value={shoppingPreference}
                      onChange={(e) => setShoppingPreference(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:bg-white/[0.08] focus:outline-none transition-all appearance-none cursor-pointer"
                    >
                      <option value="Thời Trang & Phụ Kiện">Thời trang & Phụ kiện</option>
                      <option value="Nội Thất & Decor">Nội thất & Decor</option>
                      <option value="Đồng Hồ Cao Cấp">Đồng hồ cao cấp</option>
                      <option value="Tất cả danh mục">Tất cả danh mục</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Mật khẩu</label>
                  {mode === 'login' && (
                    <button type="button" className="text-[10px] font-bold text-[#c4823f] hover:underline uppercase tracking-tighter cursor-pointer">Quên mật khẩu?</button>
                  )}
                </div>
                <div className="relative group">
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4823f] transition-colors" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Tối thiểu 6 ký tự"
                    className="w-full pl-12 pr-12 py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:bg-white/[0.08] focus:outline-none transition-all placeholder:text-gray-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div className="space-y-1.5 animate-fade-in-up">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1">Xác nhận mật khẩu</label>
                  <div className="relative group">
                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#c4823f] transition-colors" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3.5 text-sm bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#c4823f] focus:bg-white/[0.08] focus:outline-none transition-all placeholder:text-gray-600"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#c4823f] hover:bg-[#b07232] text-[#121417] font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50 mt-6 shadow-xl shadow-[#c4823f]/10 active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Đang xử lý...</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Tiếp tục' : 'Tạo tài khoản ngay'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/5 text-center">
              <p className="text-gray-500 text-xs">
                {mode === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã là hội viên?'}
                <button
                  onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="ml-2 text-[#c4823f] font-bold hover:underline cursor-pointer"
                >
                  {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập tại đây'}
                </button>
              </p>
            </div>
            
            {/* Quick Demo Credentials Tip */}
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-amber-500/5 rounded-full border border-amber-500/10">
                <Sparkles size={14} className="text-amber-400" />
                <span className="text-[10px] text-amber-200/70 font-bold uppercase tracking-wider">Demo: guest@novastore.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
