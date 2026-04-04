import type { CSSProperties } from "react";

type WelcomeBarProps = {
  screenWidth: number;
};

function WelcomeBar({ screenWidth }: WelcomeBarProps) {
  const isMobile = screenWidth < 768;

  return (
    <div
      style={{
        ...wrapperStyle,
        flexDirection: isMobile ? "column" : "row",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? "12px" : "0",
      }}
    >
      <div style={breadcrumbStyle}>Welcome / Dashboard</div>

      <div style={actionsStyle}>
        <button style={smallButtonStyle}>◻◻</button>
        <button style={smallButtonStyle}>‹</button>
        <button style={smallButtonStyle}>›</button>
      </div>
    </div>
  );
}

const wrapperStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
};

const breadcrumbStyle: CSSProperties = {
  fontSize: "14px",
  color: "#64748b",
  fontWeight: 600,
  letterSpacing: "-0.01em",
};

const actionsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const smallButtonStyle: CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  color: "#64748b",
  cursor: "pointer",
};

export default WelcomeBar;