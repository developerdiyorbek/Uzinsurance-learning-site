"use client";

import * as React from "react";
import Cleave from "cleave.js/react";
import { cn } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
}

function PhoneInput({ value, onChange, className, disabled }: Props) {
  return (
    <Cleave
      placeholder="+998"
      options={{
        numericOnly: true,
        prefix: "+998",
        delimiter: " ",
        blocks: [4, 2, 3, 2, 2],
      }}
      aria-label="phone-number"
      value={value}
      onChange={onChange}
      className={cn(
        // UI: `Input` componentdan olingan style
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      disabled={disabled}
    />
  );
}

export default PhoneInput;
