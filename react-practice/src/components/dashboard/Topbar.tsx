import type { CSSProperties } from "react";
import { Menu, LayoutGrid, Settings, Bell, Search, User } from "lucide-react";
import IconButton from "../ui/IconButton";
import Card from "../ui/Card";

type TopbarProps = {
    screenWidth: number;
};

function Topbar({ screenWidth }: TopbarProps) {

    const isMobile = screenWidth < 768;


    return (

        <Card
            style={{
                ...topbarStyle,
                flexDirection: isMobile ? "column" : "row",
                alignItems: isMobile ? "stretch" : "center",
                minHeight: isMobile ? "auto" : "68px",
                gap: isMobile ? "14px" : "0",
                padding: isMobile ? "16px" : "14px 20px",
            }}
        >
            <div
                style={{
                    ...leftGroupStyle,
                    flexWrap: "wrap",
                    width: isMobile ? "100%" : "auto",
                }}
            >
                <IconButton>
                    <Menu size={18} />
                </IconButton>

                <IconButton>
                    <LayoutGrid size={18} />
                </IconButton>

                <div
                    style={{
                        ...searchWrapperStyle,
                        width: isMobile ? "100%" : "300px",
                    }}
                >
                    <Search size={16} color="#94a3b8" />
                    <input
                        type="text"
                        placeholder="Search dashboard..."
                        style={searchInputStyle}
                    />
                </div>
            </div>

            <div
                style={{
                    ...rightGroupStyle,
                    justifyContent: isMobile ? "flex-end" : "flex-start",
                    width: isMobile ? "100%" : "auto",
                }}
            >
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                    style={{
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
                    }}
                >
                    FM
                </div>

                <div>
                    <div style={{ fontWeight: 700, fontSize: "14px" }}>
                        FM Support AI
                    </div>
                    <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                        Factory Intelligence
                    </div>
                </div>
            </div>
        </Card>
    );
}

const topbarStyle: CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
};

const leftGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
};

const rightGroupStyle: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
};

const searchWrapperStyle: CSSProperties = {
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