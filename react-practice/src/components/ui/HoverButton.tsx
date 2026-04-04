import { useState } from "react";
import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import { colors } from "../../theme/colors";

type HoverButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

function HoverButton({ children, onClick, style }: HoverButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        ...baseStyle,
        transform: isPressed
          ? "translateY(1px) scale(0.98)"
          : isHovered
          ? "translateY(-1px)"
          : "translateY(0)",
        boxShadow: isHovered
          ? "0 8px 20px rgba(15, 23, 42, 0.08)"
          : "none",
        backgroundColor: isHovered ? "#f1f5f9" : colors.surfaceSoft,
        ...style,
      }}
    >
      {children}
    </button>
  );
}

const baseStyle: CSSProperties = {
  border: `1px solid ${colors.border}`,
  borderRadius: "12px",
  backgroundColor: colors.surfaceSoft,
  color: colors.slate700,
  cursor: "pointer",
  transition: "all 0.18s ease",
};

export default HoverButton;