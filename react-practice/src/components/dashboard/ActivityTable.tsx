import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Wrench, Ticket, Cpu, ArrowRight } from "lucide-react";
import { activityItems } from "../../data/dashboardData";
import { colors } from "../../theme/colors";
import Card from "../ui/Card";
import HoverRow from "../ui/HoverRow";
import ActivityDetailsDrawer from "./ActivityDetailsDrawer";

type FilterType = "all" | "tickets" | "machines" | "visits";
type ActivityItem = (typeof activityItems)[number];

function ActivityTable() {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");
    const [selectedItem, setSelectedItem] = useState<ActivityItem | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const filteredItems = useMemo(() => {
        if (activeFilter === "all") return activityItems;
        return activityItems.filter((item) => item.category === activeFilter);
    }, [activeFilter]);

    function handleRowClick(item: ActivityItem) {
        setSelectedItem(item);
        setIsDrawerOpen(true);

        const key = `${item.time}-${item.machine}-${item.detail}`;
        const rowEl = rowRefs.current[key];

        if (rowEl) {
            rowEl.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }

    function handleCloseDrawer() {
        setIsDrawerOpen(false);
    }

    const rowRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenWidth < 768;

    const selectedRowMobileStyle: CSSProperties = {
        outline: `2px solid ${colors.primary}`,
        outlineOffset: "-2px",
    };

    return (
        <>
            <Card style={cardStyle}>
                <div style={headerStyle}>
                    <div>
                        <h3 style={titleStyle}>Live Operations Feed</h3>
                        <p style={subtitleStyle}>
                            Real-time maintenance events, AI alerts, and technician activity
                        </p>
                    </div>

                    <div style={tabsStyle}>
                        <button
                            onClick={() => setActiveFilter("all")}
                            style={activeFilter === "all" ? activeTabStyle : tabStyle}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setActiveFilter("tickets")}
                            style={activeFilter === "tickets" ? activeTabStyle : tabStyle}
                        >
                            Tickets
                        </button>
                        <button
                            onClick={() => setActiveFilter("machines")}
                            style={activeFilter === "machines" ? activeTabStyle : tabStyle}
                        >
                            Machines
                        </button>
                        <button
                            onClick={() => setActiveFilter("visits")}
                            style={activeFilter === "visits" ? activeTabStyle : tabStyle}
                        >
                            Visits
                        </button>
                    </div>
                </div>

                <div style={listStyle}>
                    {filteredItems.map((item) => {
                        const rowKey = `${item.time}-${item.machine}-${item.detail}`;

                        const isSelected =
                            isDrawerOpen &&
                            selectedItem?.time === item.time &&
                            selectedItem?.machine === item.machine &&
                            selectedItem?.detail === item.detail;

                        return (
                            <HoverRow
                                ref={(el) => {
                                    rowRefs.current[rowKey] = el;
                                }}
                                key={rowKey}
                                style={{
                                    ...rowStyle,
                                    ...(isSelected ? selectedRowStyle : {}),
                                    ...(isSelected && isMobile ? selectedRowMobileStyle : {}),
                                    cursor: "pointer",
                                }}
                            >
                                <div
                                    style={rowClickLayerStyle}
                                    onClick={() => handleRowClick(item)}
                                />

                                <div style={timeColStyle}>
                                    <div style={timeStyle}>{item.time}</div>
                                </div>

                                <div style={iconColStyle}>
                                    <div
                                        style={{
                                            ...iconWrapStyle,
                                            ...(isSelected ? selectedIconWrapStyle : {}),
                                        }}
                                    >
                                        {getActivityIcon(item.category)}
                                    </div>
                                </div>

                                <div style={contentColStyle}>
                                    <div style={machineStyle}>{item.machine}</div>
                                    <div style={detailStyle}>{item.detail}</div>
                                    <div style={sourceStyle}>Source: {item.source}</div>
                                </div>

                                <div style={rightColStyle}>
                                    <span
                                        style={{
                                            ...statusStyle,
                                            ...getStatusTheme(item.statusType),
                                        }}
                                    >
                                        {item.status}
                                    </span>

                                    <div
                                        style={{
                                            ...arrowWrapStyle,
                                            color: isSelected ? colors.primary : colors.slate400,
                                        }}
                                    >
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </HoverRow>
                        );
                    })}
                </div>
            </Card>

            <ActivityDetailsDrawer
                item={selectedItem}
                isOpen={isDrawerOpen}
                onClose={handleCloseDrawer}
                screenWidth={screenWidth}
            />
        </>
    );
}

function getActivityIcon(category: string) {
    if (category === "tickets") return <Ticket size={16} />;
    if (category === "machines") return <Cpu size={16} />;
    return <Wrench size={16} />;
}

function getStatusTheme(statusType: string): CSSProperties {
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

const cardStyle: CSSProperties = {
    minHeight: "280px",
    overflow: "hidden",
};

const headerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
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

const subtitleStyle: CSSProperties = {
    margin: "6px 0 0 0",
    fontSize: "13px",
    color: colors.slate500,
};

const tabsStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
};

const tabStyle: CSSProperties = {
    border: "none",
    background: "transparent",
    color: colors.slate400,
    fontSize: "13px",
    fontWeight: 600,
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "999px",
    transition: "all 0.2s ease",
};

const activeTabStyle: CSSProperties = {
    ...tabStyle,
    color: colors.primary,
    backgroundColor: colors.primarySoft,
};

const listStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
};

const rowStyle: CSSProperties = {
    position: "relative",
    display: "grid",
    gridTemplateColumns: "70px 48px minmax(0, 1fr) auto",
    gap: "14px",
    alignItems: "center",
    padding: "16px 18px",
    borderBottom: `1px solid ${colors.border}`,
    transition: "all 0.2s ease",
};

const selectedRowStyle: CSSProperties = {
    backgroundColor: colors.primarySoft,
    boxShadow: `inset 3px 0 0 ${colors.primary}`,
};

const rowClickLayerStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    zIndex: 1,
};

const timeColStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    position: "relative",
    zIndex: 2,
};

const timeStyle: CSSProperties = {
    fontSize: "13px",
    fontWeight: 700,
    color: colors.slate500,
};

const iconColStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 2,
};

const iconWrapStyle: CSSProperties = {
    width: "34px",
    height: "34px",
    borderRadius: "12px",
    backgroundColor: colors.surfaceSoft,
    border: `1px solid ${colors.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.primary,
    transition: "all 0.2s ease",
};

const selectedIconWrapStyle: CSSProperties = {
    backgroundColor: colors.surface,
    border: `1px solid ${colors.primary}`,
};

const contentColStyle: CSSProperties = {
    minWidth: 0,
    position: "relative",
    zIndex: 2,
};

const machineStyle: CSSProperties = {
    fontSize: "14px",
    fontWeight: 700,
    color: colors.navy,
    marginBottom: "4px",
};

const detailStyle: CSSProperties = {
    fontSize: "14px",
    lineHeight: 1.45,
    color: colors.slate700,
    marginBottom: "4px",
};

const sourceStyle: CSSProperties = {
    fontSize: "12px",
    color: colors.slate400,
};

const rightColStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    position: "relative",
    zIndex: 2,
};

const statusStyle: CSSProperties = {
    fontSize: "12px",
    fontWeight: 700,
    padding: "6px 10px",
    borderRadius: "999px",
    whiteSpace: "nowrap",
};

const arrowWrapStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    transition: "color 0.2s ease",
};

export default ActivityTable;