import { forwardRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

type HoverRowProps = {
  children: ReactNode;
  style?: CSSProperties;
};

const HoverRow = forwardRef<HTMLDivElement, HoverRowProps>(function HoverRow(
  { children, style },
  ref
) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transition: "all 0.18s ease",
        backgroundColor: isHovered ? "#f8fafc" : "#ffffff",
        ...style,
      }}
    >
      {children}
    </div>
  );
});

export default HoverRow;