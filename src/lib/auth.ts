import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './firebase';

export interface UserProfileData {
  userId: string;
  email: string;
  displayName: string;
  shoppingPreference: string;
  membershipLevel?: string;
  newsletterSubscribed?: boolean;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

/**
 * Maps Firebase Auth error codes into clear human-readable messages
 * perfect for tutorial explanation and user feedback.
 */
export const getAuthErrorMessage = (error: any): string => {
  const code = error?.code || '';
  switch (code) {
    case 'auth/email-already-in-use':
      return 'Email này đã được đăng ký. Vui lòng đăng nhập hoặc sử dụng email khác.';
    case 'auth/invalid-email':
      return 'Định dạng email không hợp lệ. Vui lòng kiểm tra lại.';
    case 'auth/weak-password':
      return 'Mật khẩu quá yếu. Vui lòng nhập tối thiểu 6 ký tự.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Email hoặc mật khẩu không chính xác. Vui lòng thử lại.';
    case 'auth/too-many-requests':
      return 'Bạn đã thử đăng nhập quá nhiều lần. Vui lòng đợi trong giây lát.';
    case 'auth/network-request-failed':
      return 'Lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền internet.';
    case 'auth/operation-not-allowed':
      return 'Phương thức Email/Password chưa được kích hoạt trong Firebase Console.';
    default:
      return error?.message || 'Đã xảy ra lỗi trong quá trình xác thực. Vui lòng thử lại.';
  }
};

/**
 * 1. REGISTER / SIGN UP USER
 * Creates Firebase Auth account and stores user profile in Firestore `users/{uid}`
 */
export const signUpUser = async (
  email: string,
  pass: string,
  displayName: string,
  shoppingPreference: string = 'Thời Trang & Phụ Kiện'
): Promise<{ user: User; profile: UserProfileData }> => {
  // Step 1: Create user in Firebase Authentication
  const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
  const user = userCredential.user;

  // Step 2: Update Auth user display name
  if (displayName.trim()) {
    await updateProfile(user, { displayName: displayName.trim() });
  }

  // Step 3: Create Firestore profile document in users/{uid}
  const profileData: UserProfileData = {
    userId: user.uid,
    email: user.email || email,
    displayName: displayName.trim() || email.split('@')[0],
    shoppingPreference: shoppingPreference || 'Thời Trang & Phụ Kiện',
    membershipLevel: 'Hội Viên Bạc',
    newsletterSubscribed: true,
    notes: 'Khách hàng quan tâm đến các bộ sưu tập thủ công.',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  const userDocRef = doc(db, 'users', user.uid);
  await setDoc(userDocRef, profileData);

  return { user, profile: profileData };
};

/**
 * 2. LOGIN USER
 * Authenticates user credentials with Firebase Auth
 */
export const loginUser = async (email: string, pass: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, pass);
  return userCredential.user;
};

/**
 * 3. LOGOUT USER
 * Terminates the authenticated session
 */
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

/**
 * 4. AUTH STATE PERSISTENCE LISTENER
 * Subscribes to real-time auth changes across page reloads and browser tabs
 */
export const subscribeToAuthChanges = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

/**
 * 5. GET OR CREATE USER DOCUMENT
 * Reads Firestore users/{uid} document or creates it if missing
 */
export const fetchOrCreateUserProfile = async (user: User): Promise<UserProfileData> => {
  const userDocRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userDocRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserProfileData;
  }

  // If document doesn't exist yet, seed a default one
  const newProfile: UserProfileData = {
    userId: user.uid,
    email: user.email || '',
    displayName: user.displayName || user.email?.split('@')[0] || 'Hội Viên NOVA',
    shoppingPreference: 'Thời Trang & Phụ Kiện',
    membershipLevel: 'Hội Viên Bạc',
    newsletterSubscribed: true,
    notes: 'Tham gia các buổi workshop & ra mắt BST mới.',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  await setDoc(userDocRef, newProfile);
  return newProfile;
};
