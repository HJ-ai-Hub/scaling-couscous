import {
  G_ARC_PATH,
  G_BAR_PATH,
  LOGO_VIEEWBOX,
  P_BOWL_PATH,
  P_STEM_PATH,
  STROKE_WIDTH,
} from "./logo-paths";

interface LogoMarkProps {
  className?: string;
  monochrome?: "dark" | "light" | false;
  titleId?: string;
}

/**
 * Static GP monogram — used anywhere the logo appears more than once
 * (nav, footer, favicons-adjacent UI). The animated intro lives in MotionLogo.
 */
export function LogoMark({ className, monochrome = false, titleId }: LogoMarkProps) {
  const gColor = monochrome ? (monochrome === "dark" ? "#28314E" : "#FFFFFF") : "url(#gp-mint-grad)";
  const pColor = monochrome ? (monochrome === "dark" ? "#28314E" : "#FFFFFF") : "url(#gp-blue-grad)";

  return (
    <svg
      viewBox={LOGO_VIEEWBOX}
      className={className}
      role="img"
      aria-labelledby={titleId}
      fill="none"
    >
      {titleId ? <title id={titleId}>GajiPay</title> : null}
      <defs>
        <linearGradient id="gp-mint-grad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#C4FFF4" />
          <stop offset="1" stopColor="#5FC8B6" />
        </linearGradient>
        <linearGradient id="gp-blue-grad" x1="55" y1="30" x2="90" y2="110" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7FA0F0" />
          <stop offset="1" stopColor="#4361C9" />
        </linearGradient>
      </defs>
      <path d={G_ARC_PATH} stroke={gColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <path d={G_BAR_PATH} stroke={gColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <path d={P_BOWL_PATH} stroke={pColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
      <path d={P_STEM_PATH} stroke={pColor} strokeWidth={STROKE_WIDTH} strokeLinecap="round" />
    </svg>
  );
}
