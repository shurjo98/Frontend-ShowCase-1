import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

import Topbar from "../components/dashboard/Topbar";
import WelcomeBar from "../components/dashboard/WelcomeBar";
import SummaryCard from "../components/dashboard/SummaryCard";
import MainChartCard from "../components/dashboard/MainChartCard";
import SideInfoCard from "../components/dashboard/SideInfoCard";
import ActivityTable from "../components/dashboard/ActivityTable";
import NewsFeedCard from "../components/dashboard/NewsFeedCard";

import { summaryCards } from "../data/dashboardData";

function DashboardPage() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth < 768;
  const isTablet = screenWidth >= 768 && screenWidth < 1100;

  const summaryGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(2, minmax(0, 1fr))"
      : "repeat(4, minmax(0, 1fr))",
    gap: "16px",
  };

  const middleGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr",
    gap: "16px",
  };

  const bottomGridStyle: CSSProperties = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "16px",
  };

  return (
    <div style={pageStyle}>
      <Topbar screenWidth={screenWidth} />
      <WelcomeBar screenWidth={screenWidth} />

      <section style={summaryGridStyle}>
        {summaryCards.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            value={card.value}
            change={card.change}
            trend={card.trend === "up" ? "up" : "down"}
          />
        ))}
      </section>

      <section style={middleGridStyle}>
        <MainChartCard />
        <SideInfoCard />
      </section>

      <section style={bottomGridStyle}>
        <ActivityTable />
        <NewsFeedCard />
      </section>
    </div>
  );
}

const pageStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export default DashboardPage;