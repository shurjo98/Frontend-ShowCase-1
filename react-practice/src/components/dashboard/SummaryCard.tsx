import type { CSSProperties } from "react";
import { Activity } from "lucide-react";
import { colors } from "../../theme/colors";
import HoverCard from "../ui/HoverCard";

type SummaryCardProps = {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  trend: "up" | "down";
};

function SummaryCard({
  title,
  subtitle,
  value,
  change,
  trend,
}: SummaryCardProps) {
  return (
    <HoverCard
      style={{
        ...cardStyle,
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <div style={topRowStyle}>
        <div>
          <div style={titleStyle}>{title}</div>
          <div style={subtitleStyle}>{subtitle}</div>
        </div>

        <div style={iconStyle}>
          <Activity size={16} />
        </div>
      </div>

      <div style={bottomRowStyle}>
        <div style={valueStyle}>{value}</div>
        <div
          style={{
            ...pillStyle,
            backgroundColor:
              trend === "up" ? colors.successSoft : colors.dangerSoft,
            color: trend === "up" ? colors.success : colors.danger,
          }}
        >
          {change}
        </div>
      </div>

      <div style={chartPlaceholderStyle}>
        <div style={miniBarsStyle}>
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              style={{
                ...miniBarStyle,
                height: `${14 + ((index * 9) % 24)}px`,
              }}
            />
          ))}
        </div>
      </div>
    </HoverCard>
  );
}

const cardStyle: CSSProperties = {
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  gap: "14px",
};

const topRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const bottomRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const pillStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 10px",
  borderRadius: "999px",
};

const chartPlaceholderStyle: CSSProperties = {
  height: "46px",
  borderRadius: "12px",
  backgroundColor: "#f8fafc",
  padding: "8px 10px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "flex-end",
};

const miniBarsStyle: CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "flex-end",
  gap: "4px",
};

const miniBarStyle: CSSProperties = {
  flex: 1,
  borderRadius: "999px",
  background: "linear-gradient(180deg, #38bdf8 0%, #8b5cf6 100%)",
  opacity: 0.85,
};

const titleStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: colors.navy,
};

const subtitleStyle: CSSProperties = {
  fontSize: "12px",
  color: colors.slate400,
  marginTop: "4px",
};

const valueStyle: CSSProperties = {
  fontSize: "24px",
  fontWeight: 700,
  color: colors.navy,
  letterSpacing: "-0.02em",
};

const iconStyle: CSSProperties = {
  width: "34px",
  height: "34px",
  borderRadius: "12px",
  backgroundColor: colors.surfaceSoft,
  border: `1px solid ${colors.border}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colors.primary,
};

export default SummaryCard;