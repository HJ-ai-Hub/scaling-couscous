import type { SVGProps } from "react";

// lucide-react no longer ships trademarked brand glyphs — these minimal
// outline versions keep the footer's social row visually consistent with
// the rest of the (Lucide-based) icon system.

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4.5 8.5h3v11h-3z" />
      <circle cx="6" cy="5" r="1.6" />
      <path d="M10.5 19.5v-11h3v1.6c.7-1.1 1.9-1.9 3.4-1.9 2.6 0 4.1 1.7 4.1 4.8v6.5h-3v-6c0-1.5-.6-2.4-1.9-2.4-1 0-1.7.7-2 1.4-.1.3-.1.6-.1 1v6z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 8.5h2v-3.2c-.5-.06-1.5-.3-2.7-.3-2.7 0-4.3 1.6-4.3 4.6v2.4H7.5v3.4H10V21h3.4v-6.6h2.6l.5-3.4h-3.1V9.6c0-1 .3-1.1 1.6-1.1z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="16" rx="4.5" />
      <circle cx="12" cy="12" r="3.6" />
      <circle cx="16.8" cy="7.2" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
