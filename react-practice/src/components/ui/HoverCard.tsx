import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../theme/colors";

type HoverCardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

function HoverCard({ children, style }: HoverCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...baseStyle,
        transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: isHovered
          ? "0 18px 40px rgba(15, 23, 42, 0.10)"
          : colors.shadow,
        borderColor: isHovered ? "#cbd5e1" : colors.border,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const baseStyle: CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "20px",
  boxSizing: "border-box",
  transition: "all 0.22s ease",
};

export default HoverCard;