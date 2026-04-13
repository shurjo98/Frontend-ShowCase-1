import type { CSSProperties } from "react";
import { LayoutGrid, Settings, Bell, Search, User } from "lucide-react";
import IconButton from "../ui/IconButton";
import Card from "../ui/Card";

type TopbarProps = {
  screenWidth: number;
};

function Topbar({ screenWidth }: TopbarProps) {
  const isMobile = screenWidth < 768;

  if (isMobile) {
    return (
      <Card style={mobileTopbarStyle}>
        <div style={mobileTopRowStyle}>
          <div style={mobileTopbarLabelStyle}>Dashboard</div>

          <div style={mobileActionsStyle}>
            <IconButton>
              <User size={18} />
            </IconButton>

            <IconButton>
              <Settings size={18} />
            </IconButton>

            <IconButton>
              <Bell size={18} />
            </IconButton>
          </div>
        </div>

        <div style={mobileSearchRowStyle}>
          <div style={mobileSearchWrapperStyle}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search dashboard..."
              style={searchInputStyle}
            />
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card style={desktopTopbarStyle}>
      <div style={leftGroupStyle}>
        <IconButton>
          <LayoutGrid size={18} />
        </IconButton>

        <div style={searchWrapperStyle}>
          <Search size={16} color="#94a3b8" />
          <input
            type="text"
            placeholder="Search dashboard..."
            style={searchInputStyle}
          />
        </div>
      </div>

      <div style={topbarRightSideStyle}>
        <div style={brandMiniStyle}>
          <div style={brandMiniLogoStyle}>X</div>

          <div style={brandMiniTextWrapStyle}>
            <div style={brandMiniTitleStyle}>X Support AI</div>
          </div>
        </div>

        <div style={rightGroupStyle}>
          <div style={avatarStyle}>
            <User size={16} />
          </div>

          <IconButton>
            <Settings size={18} />
          </IconButton>

          <IconButton>
            <Bell size={18} />
          </IconButton>
        </div>
      </div>
    </Card>
  );
}

const desktopTopbarStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  minHeight: "68px",
  gap: "16px",
  padding: "14px 20px",
};

const mobileTopbarStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  padding: "14px",
};

const mobileTopRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
};

const mobileTopbarLabelStyle: CSSProperties = {
  fontSize: "16px",
  fontWeight: 700,
  color: "#0f172a",
  letterSpacing: "-0.01em",
  margin: 0,
  flex: 1,
  textAlign: "left",
};

const mobileActionsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
};

const mobileSearchRowStyle: CSSProperties = {
  width: "100%",
};

const leftGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flex: 1,
  minWidth: 0,
};

const topbarRightSideStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  flexShrink: 0,
};

const rightGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const brandMiniStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
};

const brandMiniLogoStyle: CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #4f46e5, #6366f1)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontWeight: 700,
  fontSize: "14px",
  flexShrink: 0,
};

const brandMiniTextWrapStyle: CSSProperties = {
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  lineHeight: 1.1,
};

const brandMiniTitleStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: "14px",
  color: "#0f172a",
  whiteSpace: "nowrap",
  margin: 0,
  lineHeight: 1.1,
};

const brandMiniSubtitleStyle: CSSProperties = {
  fontSize: "11px",
  color: "#94a3b8",
  whiteSpace: "nowrap",
  marginTop: "2px",
  lineHeight: 1.2,
};

const searchWrapperStyle: CSSProperties = {
  width: "300px",
  maxWidth: "100%",
  height: "42px",
  borderRadius: "999px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 14px",
  boxSizing: "border-box",
};

const mobileSearchWrapperStyle: CSSProperties = {
  width: "100%",
  height: "42px",
  borderRadius: "999px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "0 14px",
  boxSizing: "border-box",
};

const searchInputStyle: CSSProperties = {
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
  width: "100%",
  fontSize: "14px",
  color: "#334155",
};

const avatarStyle: CSSProperties = {
  width: "38px",
  height: "38px",
  borderRadius: "999px",
  background: "linear-gradient(135deg, #dbeafe 0%, #e9d5ff 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#334155",
  border: "1px solid #e2e8f0",
  flexShrink: 0,
  transition: "transform 0.18s ease",
};

export default Topbar;