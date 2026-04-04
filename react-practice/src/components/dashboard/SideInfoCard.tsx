import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import Card from "../ui/Card";
import HoverRow from "../ui/HoverRow";
import { sideListItems } from "../../data/dashboardData";

type QueueStatus = "open" | "in_progress" | "waiting" | "resolved";
type SortMode = "ai_score" | "name";

type QueueItem = {
  name: string;
  value: number;
  trend: "up" | "down";
  status: QueueStatus;
};

function SideInfoCard() {
  const items: QueueItem[] = useMemo(() => {
    const statuses: QueueStatus[] = ["open", "in_progress", "waiting", "resolved"];

    return sideListItems.map((item, index) => ({
      name: item.name,
      value: item.value,
      trend: item.trend,
      status: statuses[index % statuses.length],
    }));
  }, []);

  const [sortMode, setSortMode] = useState<SortMode>("ai_score");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sortedItems = useMemo(() => {
    const copied = [...items];

    if (sortMode === "name") {
      return copied.sort((a, b) => a.name.localeCompare(b.name));
    }

    return copied.sort((a, b) => b.value - a.value);
  }, [items, sortMode]);

  const selectedItem = sortedItems[selectedIndex] ?? null;

  return (
    <Card style={cardStyle}>
      <div style={headerStyle}>
        <h3 style={titleStyle}>Priority Queue</h3>

        <select
          value={sortMode}
          onChange={(e) => setSortMode(e.target.value as SortMode)}
          style={selectStyle}
        >
          <option value="ai_score">AI Score</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div style={bodyStyle}>
        <div style={listPanelStyle}>
          {sortedItems.map((item, index) => {
            const isSelected = index === selectedIndex;

            return (
              <HoverRow
                key={item.name}
                onClick={() => setSelectedIndex(index)}
                style={{
                  ...rowStyle,
                  ...(isSelected ? selectedRowStyle : {}),
                }}
              >
                <div style={leftStyle}>
                  <div
                    style={{
                      ...dotStyle,
                      backgroundColor: getPriorityColor(item.value),
                    }}
                  />
                  <div style={textBlockStyle}>
                    <span style={nameStyle}>{item.name}</span>
                    <span style={metaStyle}>{formatStatus(item.status)}</span>
                  </div>
                </div>

                <span style={scoreStyle}>{getPriorityLabel(item.value)}</span>
              </HoverRow>
            );
          })}
        </div>

       
      </div>
    </Card>
  );
}

function formatStatus(status: QueueStatus) {
  if (status === "in_progress") return "In Progress";
  if (status === "waiting") return "Waiting";
  if (status === "resolved") return "Resolved";
  return "Open";
}

function getPriorityLabel(value: number) {
  if (value >= 80) return "High";
  if (value >= 45) return "Medium";
  return "Low";
}

function getPriorityColor(value: number) {
  if (value >= 80) return "#ef4444";
  if (value >= 45) return "#f59e0b";
  return "#22c55e";
}

function getSuggestedAction(score: number, status: QueueStatus) {
  if (status === "waiting") return "Follow up with customer.";
  if (score >= 80) return "Escalate to technician.";
  if (score >= 45) return "Monitor and assign soon.";
  return "Keep in normal queue.";
}

const cardStyle: CSSProperties = {
  minHeight: "420px",
  overflow: "hidden",
};

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "18px",
  borderBottom: "1px solid #eef2f7",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  color: "#0f172a",
};

const selectStyle: CSSProperties = {
  height: "38px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
  padding: "0 12px",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  cursor: "pointer",
};

const bodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
};

const listPanelStyle: CSSProperties = {
  borderRight: "1px solid #eef2f7",
  display: "flex",
  flexDirection: "column",
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "18px",
  borderBottom: "1px solid #eef2f7",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const selectedRowStyle: CSSProperties = {
  backgroundColor: "#f8fafc",
  boxShadow: "inset 3px 0 0 #2563eb",
};

const leftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
};

const dotStyle: CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  flexShrink: 0,
};

const textBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  minWidth: 0,
};

const nameStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0f172a",
};

const metaStyle: CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
};

const scoreStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  color: "#0f172a",
};

const detailsPanelStyle: CSSProperties = {
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  backgroundColor: "#fcfcfd",
};

const detailsHeaderStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const detailDotStyle: CSSProperties = {
  width: "12px",
  height: "12px",
  borderRadius: "999px",
  flexShrink: 0,
};

const detailsTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "18px",
  fontWeight: 700,
  color: "#0f172a",
};

const detailsSubtitleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: "13px",
  color: "#64748b",
};

const scoreBoxStyle: CSSProperties = {
  padding: "16px",
  borderRadius: "16px",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const scoreLabelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
};

const scoreValueStyle: CSSProperties = {
  fontSize: "28px",
  fontWeight: 800,
  color: "#0f172a",
};

const summaryBlockStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const summaryLabelStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#64748b",
};

const summaryTextStyle: CSSProperties = {
  margin: 0,
  fontSize: "14px",
  lineHeight: 1.5,
  color: "#0f172a",
};

export default SideInfoCard;