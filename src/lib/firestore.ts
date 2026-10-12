import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
  serverTimestamp,
  getDocs,
} from 'firebase/firestore';
import { db } from './firebase';
import { UserProfileData } from './auth';

export interface StoreMemberData {
  userId: string;
  membershipLevel: string;
  shoppingPreference: string;
  newsletterSubscribed: boolean;
  wishlistCount?: number;
  totalOrders?: number;
  notes: string;
  updatedAt: any;
}

export interface LiveAnnouncement {
  id: string;
  title: string;
  content: string;
  category: 'announcement' | 'collection' | 'purchase' | 'event';
  authorName: string;
  authorId?: string;
  timestamp: any;
}

/**
 * ==============================================================================
 * FIRESTORE CRUD: USER & STORE MEMBER DATA
 * ==============================================================================
 */

/**
 * Updates user profile in `users/{userId}`
 */
export const updateUserProfile = async (
  userId: string,
  updatedFields: Partial<UserProfileData>
): Promise<void> => {
  const userDocRef = doc(db, 'users', userId);
  await updateDoc(userDocRef, {
    ...updatedFields,
    updatedAt: serverTimestamp(),
  });
};

/**
 * Saves or updates dedicated store member profile in `storeMembers/{userId}`
 */
export const saveStoreMemberData = async (
  userId: string,
  data: Partial<StoreMemberData>
): Promise<void> => {
  const memberDocRef = doc(db, 'storeMembers', userId);
  await setDoc(
    memberDocRef,
    {
      ...data,
      userId,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
};

/**
 * Fetches store member data from `storeMembers/{userId}`
 */
export const getStoreMemberData = async (
  userId: string
): Promise<StoreMemberData | null> => {
  const memberDocRef = doc(db, 'storeMembers', userId);
  const snap = await getDoc(memberDocRef);
  if (snap.exists()) {
    return snap.data() as StoreMemberData;
  }
  return null;
};

/**
 * ==============================================================================
 * REAL-TIME FIRESTORE LISTENER: LIVE ANNOUNCEMENTS & MEMBER FEED
 * ==============================================================================
 */

export const subscribeToLiveAnnouncements = (
  callback: (announcements: LiveAnnouncement[]) => void,
  errorCallback?: (error: Error) => void
): (() => void) => {
  const announcementsRef = collection(db, 'public_posts');
  const q = query(announcementsRef, orderBy('timestamp', 'desc'), limit(15));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: LiveAnnouncement[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<LiveAnnouncement, 'id'>),
      }));
      callback(items);
    },
    (error) => {
      console.error('[Firestore Real-Time Listener Error]:', error);
      if (errorCallback) errorCallback(error);
    }
  );
};

export const postLiveAnnouncement = async (data: {
  title: string;
  content: string;
  category: 'announcement' | 'collection' | 'purchase' | 'event';
  authorName: string;
  authorId: string;
}): Promise<string> => {
  const ref = collection(db, 'public_posts');
  const docRef = await addDoc(ref, {
    ...data,
    timestamp: serverTimestamp(),
  });
  return docRef.id;
};

export const seedInitialAnnouncementsIfEmpty = async (): Promise<void> => {
  try {
    const ref = collection(db, 'public_posts');
    const existingSnap = await getDocs(query(ref, limit(1)));
    if (!existingSnap.empty) return;

    const initialFeed = [
      {
        title: 'Ra Mắt Bộ Sưu Tập Thu-Đông 2026',
        content: 'Khám phá những thiết kế len Merino và da thuộc Tuscan mới nhất vừa cập bến kho hàng.',
        category: 'collection' as const,
        authorName: 'NOVA Concierge',
        authorId: 'system-admin',
        timestamp: serverTimestamp(),
      },
      {
        title: 'Đơn Hàng Mới: Atelier Chronograph 01',
        content: 'Một hội viên vừa sở hữu kiệt tác thời gian titan nguyên khối tại Hà Nội.',
        category: 'purchase' as const,
        authorName: 'Hoàng M.',
        authorId: 'demo-user-1',
        timestamp: serverTimestamp(),
      },
      {
        title: 'Workshop: Nghệ Thuật Thuộc Da Thủ Công',
        content: 'Buổi giao lưu cùng nghệ nhân Matteo Bellini diễn ra vào thứ 7 tuần này tại TP.HCM.',
        category: 'event' as const,
        authorName: 'NOVA Events',
        authorId: 'system-events',
        timestamp: serverTimestamp(),
      },
    ];

    for (const item of initialFeed) {
      await addDoc(ref, item);
    }
  } catch (err) {
    console.info('[Firestore Seed Info]: Seeding skipped or rules active:', err);
  }
};
