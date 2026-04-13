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
  status: QueueStatus;
};

function SideInfoCard() {
  const items: QueueItem[] = useMemo(() => {
    const statuses: QueueStatus[] = [
      "open",
      "in_progress",
      "waiting",
      "resolved",
    ];

    return sideListItems.map((item, index) => ({
      name: item.name,
      value: Number(item.value),
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
              <button
                key={item.name}
                type="button"
                onClick={() => setSelectedIndex(index)}
                style={buttonWrapperStyle}
              >
                <HoverRow
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

                    <span style={nameStyle}>{item.name}</span>
                  </div>

                  <div style={rightGroupStyle}>
                    <span style={statusStyle}>{formatStatus(item.status)}</span>
                  </div>
                </HoverRow>
              </button>
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

function getPriorityColor(value: number) {
  if (value >= 80) return "#ef4444";
  if (value >= 45) return "#f59e0b";
  return "#22c55e";
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
  display: "flex",
  flexDirection: "column",
};

const buttonWrapperStyle: CSSProperties = {
  all: "unset",
  display: "contents",
  cursor: "pointer",
};

const rowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",
  padding: "18px",
  borderBottom: "1px solid #eef2f7",
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
  flex: 1,
};

const dotStyle: CSSProperties = {
  width: "10px",
  height: "10px",
  borderRadius: "999px",
  flexShrink: 0,
};

const nameStyle: CSSProperties = {
  fontSize: "14px",
  fontWeight: 700,
  color: "#0f172a",
  minWidth: 0,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const rightGroupStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  minWidth: "110px",
  flexShrink: 0,
};

const statusStyle: CSSProperties = {
  fontSize: "12px",
  color: "#64748b",
  minWidth: "80px",
  textAlign: "right",
};

export default SideInfoCard;