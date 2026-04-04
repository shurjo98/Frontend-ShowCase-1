import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Card from "../ui/Card";
import ChartTooltip from "./ChartTooltip";
import { performanceChartByRange } from "../../data/dashboardData";
import { colors } from "../../theme/colors";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import HoverButton from "../ui/HoverButton";

type RangeKey = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

type ChartPoint = {
  label: string;
  value: number;
};

const rangeButtons: Array<{ label: string; value: RangeKey }> = [
  { label: "1 min", value: "1m" },
  { label: "5 min", value: "5m" },
  { label: "15 min", value: "15m" },
  { label: "1 h", value: "1h" },
  { label: "4 h", value: "4h" },
  { label: "1 day", value: "1d" },
];

function MainChartCard() {
  const [activeRange, setActiveRange] = useState<RangeKey>("1h");

  const chartData: ChartPoint[] = useMemo(() => {
    return performanceChartByRange[activeRange].map((item) => ({
      label: String(item.label),
      value: Number(item.value),
    }));
  }, [activeRange]);

  const currentValue = chartData[chartData.length - 1]?.value ?? 0;
  const previousValue = chartData[chartData.length - 2]?.value ?? currentValue;

  const changePercent = useMemo(() => {
    if (previousValue <= 0) return "0.00%";

    const change = ((currentValue - previousValue) / previousValue) * 100;
    const sign = change > 0 ? "+" : "";

    return `${sign}${change.toFixed(2)}%`;
  }, [currentValue, previousValue]);

  const isNegative = changePercent.startsWith("-");
  const trendColor = isNegative ? colors.danger : colors.success;
  const trendBg = isNegative ? colors.dangerSoft : colors.successSoft;

  const highValue = Math.max(...chartData.map((item) => item.value));
  const lowValue = Math.min(...chartData.map((item) => item.value));

  return (
    <Card style={cardStyle}>
      <div style={headerStyle}>
        <div>
          <div style={titleRowStyle}>
            <h3 style={titleStyle}>Service Performance</h3>
            <span style={smallLabelStyle}>/ {activeRange}</span>
          </div>

          <div style={statsRowStyle}>
            <span style={bigValueStyle}>{currentValue.toLocaleString()}</span>
            <span
              style={{
                ...changePillStyle,
                color: trendColor,
                backgroundColor: trendBg,
              }}
            >
              {changePercent}
            </span>
          </div>
        </div>

        <HoverButton style={actionButtonStyle}>View</HoverButton>
      </div>

      <div style={metaRowStyle}>
        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>High</span>
          <span style={metaValueStyle}>{highValue.toLocaleString()}</span>
        </div>

        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Low</span>
          <span style={metaValueStyle}>{lowValue.toLocaleString()}</span>
        </div>

        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Points</span>
          <span style={metaValueStyle}>{chartData.length}</span>
        </div>

        <div style={metaItemStyle}>
          <span style={metaLabelStyle}>Range</span>
          <span style={metaValueStyle}>{activeRange}</span>
        </div>
      </div>

      <div style={filterRowStyle}>
        {rangeButtons.map((button) => {
          const isActive = activeRange === button.value;

          return (
            <button
              key={button.value}
              onClick={() => setActiveRange(button.value)}
              style={isActive ? activeFilterButtonStyle : filterButtonStyle}
            >
              {button.label}
            </button>
          );
        })}
      </div>

      <div style={chartAreaStyle}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="performanceStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={colors.cyan} />
                <stop offset="100%" stopColor={colors.primaryGlow} />
              </linearGradient>

              <linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={colors.primaryGlow}
                  stopOpacity={0.32}
                />
                <stop
                  offset="55%"
                  stopColor={colors.primary}
                  stopOpacity={0.12}
                />
                <stop offset="100%" stopColor="#ffffff" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid
              stroke={colors.border}
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: colors.slate400 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: colors.slate400 }}
              tickFormatter={(value: number) => `${Math.round(value / 1000)}k`}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#performanceStroke)"
              strokeWidth={3}
              fill="url(#performanceFill)"
              dot={{
                r: 4,
                fill: colors.primary,
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 6,
                fill: colors.primaryGlow,
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

const cardStyle: CSSProperties = {
  minHeight: "420px",
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gap: "16px",
};

const titleRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "clamp(22px, 4vw, 28px)",
  fontWeight: 500,
  color: colors.navy,
  letterSpacing: "-0.02em",
};

const smallLabelStyle: CSSProperties = {
  fontSize: "14px",
  color: colors.slate400,
};

const statsRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap",
};

const bigValueStyle: CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  color: colors.navy,
  letterSpacing: "-0.02em",
};

const changePillStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  padding: "6px 10px",
  borderRadius: "999px",
};

const actionButtonStyle: CSSProperties = {
  border: "none",
  borderRadius: "12px",
  padding: "10px 18px",
  background: `linear-gradient(90deg, ${colors.primary} 0%, ${colors.primaryGlow} 100%)`,
  color: "#ffffff",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 8px 20px rgba(99, 102, 241, 0.25)",
};

const metaRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "18px",
  paddingBottom: "14px",
  borderBottom: `1px solid ${colors.border}`,
};

const metaItemStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const metaLabelStyle: CSSProperties = {
  fontSize: "13px",
  color: colors.slate400,
};

const metaValueStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 600,
  color: colors.slate700,
};

const filterRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
};

const filterButtonStyle: CSSProperties = {
  border: "none",
  background: "transparent",
  color: colors.slate400,
  fontSize: "13px",
  fontWeight: 600,
  cursor: "pointer",
  padding: "8px 10px",
  borderRadius: "999px",
  transition: "all 0.2s ease",
};

const activeFilterButtonStyle: CSSProperties = {
  ...filterButtonStyle,
  color: colors.primary,
  backgroundColor: colors.primarySoft,
  boxShadow: "inset 0 0 0 1px rgba(79, 70, 229, 0.08)",
};

const chartAreaStyle: CSSProperties = {
  flex: 1,
  minHeight: "260px",
};

export default MainChartCard;