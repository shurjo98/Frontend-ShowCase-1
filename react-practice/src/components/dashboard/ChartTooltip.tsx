import type { CSSProperties } from "react";
import { colors } from "../../theme/colors";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      label: string;
      value: number;
    };
  }>;
  label?: string;
};

function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  const point = payload[0];

  return (
    <div style={tooltipStyle}>
      <div style={tooltipLabelStyle}>{label}</div>
      <div style={tooltipValueStyle}>{point.value.toLocaleString()}</div>
      <div style={tooltipMetaStyle}>Performance value</div>
      <div style={tooltipMetaStyle}>Health Score</div>
    </div>
  );
}

const tooltipStyle: CSSProperties = {
  minWidth: "140px",
  borderRadius: "16px",
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  boxShadow: colors.shadowStrong,
  padding: "12px 14px",
};

const tooltipLabelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: colors.slate400,
  marginBottom: "6px",
};

const tooltipValueStyle: CSSProperties = {
  fontSize: "18px",
  fontWeight: 700,
  color: colors.navy,
  letterSpacing: "-0.02em",
  marginBottom: "4px",
};

const tooltipMetaStyle: CSSProperties = {
  fontSize: "12px",
  color: colors.slate500,
};

export default ChartTooltip;