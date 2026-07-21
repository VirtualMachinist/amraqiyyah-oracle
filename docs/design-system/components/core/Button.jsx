import React from "react";

/**
 * Button — the Oracle's primary action ("Read the sky", "Cast the natal chart").
 * Gold fill with night-ink text is the primary; ghost is a copper outline used
 * for secondary/utility actions (GPS, back).
 */
export function Button({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  full = false,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    sm: { padding: "6px 12px", fontSize: "var(--text-sm)", radius: "var(--radius-sm)" },
    md: { padding: "12px 20px", fontSize: "var(--text-base)", radius: "var(--radius-md)" },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    fontFamily: "var(--font-mono)",
    fontWeight: "var(--weight-bold)",
    fontSize: s.fontSize,
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    padding: s.padding,
    borderRadius: s.radius,
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: full ? "100%" : "auto",
    transition: "var(--transition)",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  };

  const variants = {
    primary: {
      background: "var(--gold)",
      color: "var(--accent-ink)",
      borderColor: "var(--gold)",
    },
    ghost: {
      background: "transparent",
      color: "var(--copper-light)",
      borderColor: "var(--copper)",
    },
    sunken: {
      background: "var(--panel-soft)",
      color: "var(--copper-light)",
      borderColor: "var(--copper)",
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      {...rest}
    >
      {children}
    </button>
  );
}
