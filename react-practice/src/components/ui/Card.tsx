import type { CSSProperties, ReactNode } from "react";
import { colors } from "../../theme/colors";

type CardProps = {
  children: ReactNode;
  style?: CSSProperties;
};

function Card({ children, style }: CardProps) {
  return <div style={{ ...cardStyle, ...style }}>{children}</div>;
}

const cardStyle: CSSProperties = {
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  borderRadius: "20px",
  boxSizing: "border-box",
  boxShadow: colors.shadow,
};

export default Card;