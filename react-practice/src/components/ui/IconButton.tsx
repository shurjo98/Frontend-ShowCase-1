import type { CSSProperties, ReactNode, MouseEventHandler } from "react";
import HoverButton from "./HoverButton";

type IconButtonProps = {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
};

function IconButton({ children, onClick, style }: IconButtonProps) {
  return (
    <HoverButton
      onClick={onClick}
      style={{
        width: "38px",
        height: "38px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </HoverButton>
  );
}

export default IconButton;