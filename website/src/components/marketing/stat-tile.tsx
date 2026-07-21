import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface StatTileProps {
  label: string;
  value: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
  icon?: LucideIcon;
  className?: string;
}

export function StatTile({ label, value, trend, trendDirection = "neutral", icon: Icon, className }: StatTileProps) {
  return (
    <div className={cn("rounded-2xl border border-border bg-white p-5 shadow-soft", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-faint">{label}</span>
        {Icon ? <Icon className="size-4 text-ink-faint" /> : null}
      </div>
      <p className="mt-2 font-brand text-2xl font-semibold text-ink">{value}</p>
      {trend ? (
        <p
          className={cn(
            "mt-1 text-xs font-medium",
            trendDirection === "up" && "text-mint-deep",
            trendDirection === "down" && "text-rose-500",
            trendDirection === "neutral" && "text-ink-faint",
          )}
        >
          {trend}
        </p>
      ) : null}
    </div>
  );
}
