import React from 'react';

/**
 * Generates an inline SVG data URI as an elegant, neutral fallback image
 * in case network errors or sandboxes block image asset retrieval.
 */
export const getFallbackImageSvg = (label: string = 'NOVA'): string => {
  const safeLabel = label.replace(/[<>&"]/g, '');
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="450" viewBox="0 0 600 450" fill="#f5f4f0">
      <rect width="100%" height="100%" fill="#f5f4f0"/>
      <rect x="20" y="20" width="560" height="410" fill="none" stroke="#e6e4df" stroke-width="1"/>
      <circle cx="300" cy="200" r="32" fill="#edeae1"/>
      <path d="M292 208 L308 208 M300 192 L300 208" stroke="#c4823f" stroke-width="2" stroke-linecap="round"/>
      <text x="300" y="255" text-anchor="middle" fill="#121417" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="16" letter-spacing="1">NOVA STORE</text>
      <text x="300" y="278" text-anchor="middle" fill="#6b7280" font-family="'Plus Jakarta Sans', sans-serif" font-size="12">${safeLabel}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

/**
 * Multi-stage error recovery handler:
 * 1. Attempts /images/[filename] from the static public directory.
 * 2. If that fails, renders the inline vector SVG fallback.
 */
export const handleImageError = (
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackLabel: string = 'NOVA'
) => {
  const img = e.currentTarget;
  if (!img.dataset.attemptedPublic) {
    img.dataset.attemptedPublic = 'true';
    const currentSrc = img.src || '';
    const parts = currentSrc.split('/');
    const filename = parts[parts.length - 1]?.split('?')[0];
    if (filename && !currentSrc.includes('/images/')) {
      img.src = `/images/${filename}`;
      return;
    }
  }

  // Final fallback to graceful SVG placeholder
  img.src = getFallbackImageSvg(fallbackLabel);
};
