import { cn } from "@/utils/cn";
import NumberFlow from "@number-flow/react";

export type NumberDisplayProps = {
  value: number;
  type?: "currency" | "token" | "percent";
  className?: string;
  prefix?: string;
  suffix?: string;
};

export const NumberDisplay = ({
  value,
  type = "token",
  className,
  prefix: customPrefix,
  suffix,
}: NumberDisplayProps) => {
  let displayValue = value;
  let prefix: string | undefined = customPrefix;

  if (type === "currency") {
    if (value > 0 && value < 0.01) {
      displayValue = 0.01;
      prefix = customPrefix ? `${customPrefix}<` : "<";
    }

    if (value > 1e15) {
      displayValue = 1e15;
      prefix = customPrefix ? `${customPrefix}>` : ">";
    }

    return (
      <NumberFlow
        value={displayValue}
        format={{
          notation: "compact",
          maximumFractionDigits: 2,
          compactDisplay: "short",
          style: "currency",
          currency: "USD",
          currencyDisplay: "narrowSymbol",
          roundingMode: "floor",
        }}
        locales="en-US"
        prefix={prefix}
        suffix={suffix}
        className={cn("font-normal", className)}
      />
    );
  }

  if (type === "percent") {
    if (value > 0 && value < 0.01) {
      displayValue = 0.01;
      prefix = customPrefix ? `${customPrefix}<` : "<";
    }

    if (value > 1e15) {
      displayValue = 1e15;
      prefix = customPrefix ? `${customPrefix}>` : ">";
    }

    return (
      <NumberFlow
        value={displayValue / 100}
        format={{
          notation: "compact",
          maximumFractionDigits: 2,
          style: "percent",
          roundingMode: "floor",
        }}
        prefix={prefix}
        suffix={suffix}
        className={cn("font-normal", className)}
      />
    );
  }

  if (Math.abs(value) >= 1000) {
    return (
      <NumberFlow
        value={value}
        format={{
          notation: "compact",
          maximumFractionDigits: 2,
          compactDisplay: "short",
          roundingMode: "floor",
        }}
        prefix={prefix}
        suffix={suffix}
        className={cn("font-normal", className)}
      />
    );
  }

  if (value > 0 && value < 0.00001) {
    displayValue = 0.00001;
    prefix = customPrefix ? `${customPrefix}<` : "<";
  }

  return (
    <NumberFlow
      value={displayValue}
      format={{
        maximumFractionDigits: 5,
        minimumFractionDigits: 2,
        roundingMode: "floor",
      }}
      prefix={prefix}
      suffix={suffix}
      className={cn("font-normal", className)}
    />
  );
};
