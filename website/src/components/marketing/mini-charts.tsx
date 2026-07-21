"use client";

import { motion } from "framer-motion";

export function MiniBarChart({ values, color = "#658AE4" }: { values: number[]; color?: string }) {
  const max = Math.max(...values);
  return (
    <div className="flex h-16 items-end gap-1.5">
      {values.map((value, index) => (
        <motion.div
          key={index}
          className="w-full rounded-full"
          style={{ background: index === values.length - 1 ? "#28314E" : color, opacity: index === values.length - 1 ? 1 : 0.35 }}
          initial={{ height: 0 }}
          whileInView={{ height: `${(value / max) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </div>
  );
}

export function Sparkline({ points, color = "#4361C9" }: { points: number[]; color?: string }) {
  const width = 200;
  const height = 56;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);

  const coords = points.map((point, index) => {
    const x = index * step;
    const y = height - ((point - min) / range) * (height - 8) - 4;
    return [x, y] as const;
  });

  const linePath = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
  const areaPath = `${linePath} L ${width} ${height} L 0 ${height} Z`;
  const last = coords[coords.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full overflow-visible" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.22" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={areaPath}
        fill="url(#sparkline-fill)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />
      <motion.path
        d={linePath}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      <circle cx={last[0]} cy={last[1]} r={4} fill={color} />
      <circle cx={last[0]} cy={last[1]} r={7} fill={color} opacity={0.18} />
    </svg>
  );
}
