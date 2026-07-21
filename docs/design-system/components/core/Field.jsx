import React from "react";

/**
 * Field — a sunken text input on panel-soft fill with a hairline border.
 * Used for the question, the querent's Arabic name, city search, natal date parts.
 */
export function Field({ value, onChange, placeholder, width, align = "left", style, ...rest }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange && onChange(e.target.value)}
      placeholder={placeholder}
      style={{
        background: "var(--panel-soft)",
        color: "var(--text)",
        border: "1px solid var(--line)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 12px",
        fontFamily: "var(--font-body)",
        fontSize: "var(--text-base)",
        width: width || "100%",
        textAlign: align,
        outline: "none",
        transition: "var(--transition)",
        ...style,
      }}
      onFocus={(e) => (e.target.style.borderColor = "var(--copper)")}
      onBlur={(e) => (e.target.style.borderColor = "var(--line)")}
      {...rest}
    />
  );
}
