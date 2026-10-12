import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';

/**
 * ==============================================================================
 * FIREBASE INITIALIZATION & CLIENT CONFIGURATION
 * ==============================================================================
 *
 * For YouTube Tutorial & Vercel Production Deployment:
 * Environment variables must be set in your Vercel Dashboard under:
 * Settings -> Environment Variables.
 *
 * For Vite (React SPA): Prefix with VITE_
 * For Next.js: Prefix with NEXT_PUBLIC_
 *
 * Note: Firebase client config values (API Key, Project ID, etc.) are public
 * identifiers designed to be included in client-side bundles. Security is
 * strictly enforced at the database level via Firestore Security Rules and
 * Firebase App Check.
 */

// Safe getter for environment variables supporting both Vite (import.meta.env)
// and Next.js / Node (process.env) if running in server environments.
const getEnvVar = (viteKey: string, nextKey: string, fallback: string): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[viteKey]) {
    return import.meta.env[viteKey];
  }
  if (typeof process !== 'undefined' && process.env && process.env[nextKey]) {
    return process.env[nextKey] as string;
  }
  return fallback;
};

// Firebase Configuration Object with user-provided project credentials & fallback placeholders
const firebaseConfig = {
  apiKey: getEnvVar(
    'VITE_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'AIzaSyARYjbFC2XUsSqgSAh2EoV_KFoGFin9pqU'
  ),
  authDomain: getEnvVar(
    'VITE_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'smart-alliance-ltgzl.firebaseapp.com'
  ),
  projectId: getEnvVar(
    'VITE_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'smart-alliance-ltgzl'
  ),
  storageBucket: getEnvVar(
    'VITE_FIREBASE_STORAGE_BUCKET',
    'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
    'smart-alliance-ltgzl.firebasestorage.app'
  ),
  messagingSenderId: getEnvVar(
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
    '938178082963'
  ),
  appId: getEnvVar(
    'VITE_FIREBASE_APP_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
    '1:938178082963:web:dd6a9b0feebc153372f566'
  ),
  measurementId: getEnvVar(
    'VITE_FIREBASE_MEASUREMENT_ID',
    'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
    ''
  ),
};

// Initialize Firebase App (Singleton Pattern: prevents duplicate initialization)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore Database
export const db = getFirestore(app);

/**
 * ==============================================================================
 * FIREBASE APP CHECK INTEGRATION
 * ==============================================================================
 * Protects backend resources (Firestore) from abuse such as billing fraud,
 * unauthorized bots, and scraping using Google reCAPTCHA v3.
 */
const reCaptchaSiteKey = getEnvVar(
  'VITE_FIREBASE_RECAPTCHA_SITE_KEY',
  'NEXT_PUBLIC_FIREBASE_RECAPTCHA_SITE_KEY',
  '' // Optional: set reCAPTCHA v3 site key in .env or Vercel settings
);

if (typeof window !== 'undefined' && reCaptchaSiteKey && reCaptchaSiteKey !== 'REPLACE_WITH_YOUR_RECAPTCHA_SITE_KEY') {
  try {
    initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(reCaptchaSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
    console.info('[Firebase App Check] Initialized successfully with reCAPTCHA v3.');
  } catch (error) {
    console.warn('[Firebase App Check] Initialization skipped or error:', error);
  }
}
