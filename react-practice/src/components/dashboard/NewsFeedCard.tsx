import type { CSSProperties } from "react";
import { newsItems } from "../../data/dashboardData";
import { colors } from "../../theme/colors";
import Card from "../ui/Card";
import HoverRow from "../ui/HoverRow";
import HoverButton from "../ui/HoverButton";

type NewsItem = {
  time: string;
  title: string;
  description: string;
  tag: string;
  accent: string;
};

function NewsFeedCard() {
  const items: NewsItem[] = newsItems.map((item) => ({
    time: String(item.time),
    title: String(item.title),
    description: String(item.description ?? ""),
    tag: String(item.tag),
    accent: String(item.accent),
  }));

  return (
    <Card style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>AI Insights</h3>

        <HoverButton style={subscribeButtonStyle}>
          Subscribe
        </HoverButton>
      </div>

      <div style={contentStyle}>
        {items.map((item) => (
          <HoverRow
            key={`${item.time}-${item.title}`}
            style={newsBlockStyle}
          >
            <div style={newsMetaStyle}>{item.time}</div>
            <h4 style={newsTitleStyle}>{item.title}</h4>
            <p style={newsTextStyle}>{item.description}</p>

            <div
              style={{
                ...cornerAccentStyle,
                background: item.accent,
              }}
            >
              {item.tag}
            </div>
          </HoverRow>
        ))}
      </div>
    </Card>
  );
}

// ============ STYLES ============

const cardStyle: CSSProperties = {
  minHeight: "280px",
  overflow: "hidden",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px 18px 14px 18px",
  borderBottom: `1px solid ${colors.border}`,
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  color: colors.navy,
  letterSpacing: "-0.01em",
};

const subscribeButtonStyle: CSSProperties = {
  border: `1px solid ${colors.border}`,
  backgroundColor: colors.surface,
  color: colors.slate500,
  borderRadius: "10px",
  padding: "8px 14px",
  fontSize: "13px",
  fontWeight: 600,
};

const contentStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "18px",
};

const newsBlockStyle: CSSProperties = {
  position: "relative",
  border: `1px solid ${colors.border}`,
  borderRadius: "18px",
  padding: "16px",
  overflow: "hidden",
  minHeight: "120px",
  backgroundColor: "#fcfcfd",
};

const newsMetaStyle: CSSProperties = {
  fontSize: "13px",
  color: colors.slate500,
  marginBottom: "10px",
};

const newsTitleStyle: CSSProperties = {
  margin: "0 0 10px 0",
  fontSize: "20px",
  lineHeight: 1.35,
  fontWeight: 600,
  color: colors.slate700,
  letterSpacing: "-0.01em",
  maxWidth: "78%",
};

const newsTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.5,
  color: colors.slate400,
  maxWidth: "76%",
};

const cornerAccentStyle: CSSProperties = {
  position: "absolute",
  right: 0,
  bottom: 0,
  width: "130px",
  height: "90px",
  clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
  color: "#ffffff",
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  padding: "0 14px 12px 0",
  boxSizing: "border-box",
  fontSize: "18px",
  fontWeight: 700,
  pointerEvents: "none",
};

export default NewsFeedCard;