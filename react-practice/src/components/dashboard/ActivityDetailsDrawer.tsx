import { useEffect } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  X,
  Cpu,
  Ticket,
  Wrench,
  Clock3,
  User,
  CircleAlert,
} from "lucide-react";
import { colors } from "../../theme/colors";
import HoverButton from "../ui/HoverButton";

type ActivityCategory = "tickets" | "machines" | "visits" | string;
type StatusType = "positive" | "negative" | "neutral" | string;

type ActivityItem = {
  time: string;
  category: ActivityCategory;
  machine: string;
  detail: string;
  source: string;
  status: string;
  statusType: StatusType;
};

type ActivityDetailsDrawerProps = {
  item: ActivityItem | null;
  isOpen: boolean;
  onClose: () => void;
  screenWidth: number;
};

type InfoRowProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function ActivityDetailsDrawer({
  item,
  isOpen,
  onClose,
  screenWidth,
}: ActivityDetailsDrawerProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const isMobile = screenWidth < 768;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          ...overlayStyle,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
        }}
      />

      <aside
        aria-hidden={!isOpen}
        style={{
          ...drawerStyle,
          width: isMobile ? "100vw" : "420px",
          maxWidth: isMobile ? "100vw" : "92vw",
          borderLeft: isMobile ? "none" : `1px solid ${colors.border}`,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
        }}
      >
        <div style={headerStyle}>
          <div>
            <p style={eyebrowStyle}>Activity Details</p>
            <h3 style={titleStyle}>Operations Event</h3>
          </div>

          <HoverButton onClick={onClose} style={closeButtonStyle}>
            <X size={18} />
          </HoverButton>
        </div>

        {item ? (
          <div style={contentStyle}>
            <div style={heroCardStyle}>
              <div style={heroTopStyle}>
                <div style={heroIconStyle}>{getActivityIcon(item.category)}</div>

                <span
                  style={{
                    ...statusPillStyle,
                    ...getStatusTheme(item.statusType),
                  }}
                >
                  {item.status}
                </span>
              </div>

              <h4 style={machineStyle}>{item.machine}</h4>
              <p style={detailStyle}>{item.detail}</p>
            </div>

            <div style={infoSectionStyle}>
              <div style={sectionTitleStyle}>Event Summary</div>

              <div style={infoGridStyle}>
                <InfoRow
                  icon={<Clock3 size={16} />}
                  label="Time"
                  value={item.time}
                />
                <InfoRow
                  icon={<User size={16} />}
                  label="Source"
                  value={item.source}
                />
                <InfoRow
                  icon={<CircleAlert size={16} />}
                  label="Category"
                  value={formatCategory(item.category)}
                />
              </div>
            </div>

            <div style={infoSectionStyle}>
              <div style={sectionTitleStyle}>Recommended Actions</div>

              <div style={actionListStyle}>
                <div style={actionItemStyle}>Review the machine history</div>
                <div style={actionItemStyle}>Check technician availability</div>
                <div style={actionItemStyle}>Create or link a support ticket</div>
              </div>
            </div>

            <div style={buttonRowStyle}>
              <HoverButton style={secondaryButtonStyle}>
                Create Ticket
              </HoverButton>

              <HoverButton style={primaryButtonStyle}>
                Assign Technician
              </HoverButton>
            </div>
          </div>
        ) : (
          <div style={emptyStyle}>No activity selected.</div>
        )}
      </aside>
    </>
  );
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div style={infoRowStyle}>
      <div style={infoIconStyle}>{icon}</div>

      <div>
        <div style={infoLabelStyle}>{label}</div>
        <div style={infoValueStyle}>{value}</div>
      </div>
    </div>
  );
}

function getActivityIcon(category: ActivityCategory) {
  if (category === "tickets") return <Ticket size={18} />;
  if (category === "machines") return <Cpu size={18} />;
  return <Wrench size={18} />;
}

function formatCategory(category: ActivityCategory) {
  if (category === "tickets") return "Support Ticket";
  if (category === "machines") return "Machine Alert";
  if (category === "visits") return "Technician Visit";
  return category;
}

function getStatusTheme(statusType: StatusType): CSSProperties {
  if (statusType === "positive") {
    return {
      color: colors.success,
      backgroundColor: colors.successSoft,
    };
  }

  if (statusType === "negative") {
    return {
      color: colors.danger,
      backgroundColor: colors.dangerSoft,
    };
  }

  return {
    color: colors.slate700,
    backgroundColor: colors.surfaceSoft,
  };
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.28)",
  transition: "opacity 0.25s ease",
  zIndex: 40,
};

const drawerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "420px",
  maxWidth: "92vw",
  height: "100vh",
  backgroundColor: colors.surface,
  boxShadow: "-20px 0 50px rgba(15, 23, 42, 0.18)",
  borderLeft: `1px solid ${colors.border}`,
  transition: "transform 0.28s ease",
  zIndex: 50,
  display: "flex",
  flexDirection: "column",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px",
  borderBottom: `1px solid ${colors.border}`,
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: "12px",
  fontWeight: 700,
  color: colors.slate400,
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const titleStyle: CSSProperties = {
  margin: "6px 0 0 0",
  fontSize: "22px",
  fontWeight: 700,
  color: colors.navy,
  letterSpacing: "-0.02em",
};

const closeButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const contentStyle: CSSProperties = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  overflowY: "auto",
};

const heroCardStyle: CSSProperties = {
  border: `1px solid ${colors.border}`,
  borderRadius: "20px",
  padding: "18px",
  background:
    "linear-gradient(180deg, rgba(248,250,252,1) 0%, rgba(255,255,255,1) 100%)",
};

const heroTopStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "16px",
};

const heroIconStyle: CSSProperties = {
  width: "42px",
  height: "42px",
  borderRadius: "14px",
  backgroundColor: colors.primarySoft,
  color: colors.primary,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const statusPillStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 10px",
  borderRadius: "999px",
};

const machineStyle: CSSProperties = {
  margin: "0 0 8px 0",
  fontSize: "20px",
  fontWeight: 700,
  color: colors.navy,
};

const detailStyle: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.6,
  color: colors.slate700,
};

const infoSectionStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  color: colors.slate500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
};

const infoGridStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const infoRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  padding: "14px",
  border: `1px solid ${colors.border}`,
  borderRadius: "16px",
  backgroundColor: colors.surfaceSoft,
};

const infoIconStyle: CSSProperties = {
  width: "32px",
  height: "32px",
  borderRadius: "10px",
  backgroundColor: colors.surface,
  border: `1px solid ${colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.primary,
};

const infoLabelStyle: CSSProperties = {
  fontSize: "12px",
  color: colors.slate400,
  marginBottom: "4px",
};

const infoValueStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: colors.slate700,
};

const actionListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};

const actionItemStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surfaceSoft,
  fontSize: "14px",
  fontWeight: 600,
  color: colors.slate700,
};

const buttonRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px",
  marginTop: "8px",
};

const secondaryButtonStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  fontWeight: 700,
  backgroundColor: colors.surface,
  color: colors.slate700,
};

const primaryButtonStyle: CSSProperties = {
  padding: "12px 14px",
  borderRadius: "14px",
  fontWeight: 700,
  border: "none",
  background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryGlow} 100%)`,
  color: "#ffffff",
};

const emptyStyle: CSSProperties = {
  padding: "24px",
  color: colors.slate500,
};

export default ActivityDetailsDrawer;