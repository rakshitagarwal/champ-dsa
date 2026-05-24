"use client";

import {
  EXPERIENCE_LEVELS,
  type ExperienceLevel,
} from "@/types/job-search";
import { cn } from "@/lib/utils";

type Props = {
  value: ExperienceLevel;
  onChange: (value: ExperienceLevel) => void;
  id?: string;
  className?: string;
};

export function ExperienceSelect({
  value,
  onChange,
  id = "experience",
  className,
}: Props) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value as ExperienceLevel)}
      className={cn(
        "h-10 w-full rounded-md border border-border bg-background px-3 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-primary/40",
        className,
      )}
    >
      {EXPERIENCE_LEVELS.map((level) => (
        <option key={level} value={level}>
          {level}
        </option>
      ))}
    </select>
  );
}
