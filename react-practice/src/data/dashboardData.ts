export type SummaryTrend = "up" | "down";

export type SummaryCardItem = {
  title: string;
  subtitle: string;
  value: string;
  change: string;
  trend: SummaryTrend;
};

export type SideListItem = {
  name: string;
  value: number;
  change: string;
  trend: SummaryTrend;
};

export type NewsItem = {
  time: string;
  title: string;
  tag: string;
  accent: string;
};

export type ActivityCategory = "machines" | "visits" | "tickets";
export type ActivityStatusType = "positive" | "negative" | "neutral";

export type ActivityItem = {
  time: string;
  category: ActivityCategory;
  machine: string;
  detail: string;
  source: string;
  status: string;
  statusType: ActivityStatusType;
};

export type ChartPoint = {
  label: string;
  value: number;
};

export type RangeKey = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";

export const summaryCards: SummaryCardItem[] = [
  {
    title: "Machines Running",
    subtitle: "Production Floor",
    value: "128",
    change: "+2.4%",
    trend: "up",
  },
  {
    title: "Machines Down",
    subtitle: "Needs Attention",
    value: "14",
    change: "-1.2%",
    trend: "down",
  },
  {
    title: "Open Tickets",
    subtitle: "Service Requests",
    value: "32",
    change: "+6.8%",
    trend: "up",
  },
  {
    title: "AI Diagnosed Issues",
    subtitle: "Today",
    value: "21",
    change: "+12.1%",
    trend: "up",
  },
];

export const sideListItems: SideListItem[] = [
  {
    name: "Line A-12 Motor Overheat",
    value: 82,
    change: "+12%",
    trend: "up",
  },
  {
    name: "Thread Break Spike - Unit 5",
    value: 58,
    change: "+4%",
    trend: "up",
  },
  {
    name: "Needle Wear Detected",
    value: 24,
    change: "-2%",
    trend: "down",
  },
  {
    name: "Oil Level Drop - Zone B",
    value: 95,
    change: "+18%",
    trend: "up",
  },
];

export const newsItems: NewsItem[] = [
  {
    time: "Today",
    title: "AI predicts 18% failure risk in Line A within next 6 hours",
    tag: "AI",
    accent: "linear-gradient(135deg, #6366f1, #4f46e5)",
  },
  {
    time: "Yesterday",
    title: "Thread break incidents reduced by 23% after optimization",
    tag: "Insight",
    accent: "linear-gradient(135deg, #06b6d4, #2563eb)",
  },
];

export const activityItems: ActivityItem[] = [
  {
    time: "11:02",
    category: "machines",
    machine: "Line A-12",
    detail: "AI flagged abnormal vibration in the drive system",
    source: "AI Engine",
    status: "Alert",
    statusType: "negative",
  },
  {
    time: "10:55",
    category: "visits",
    machine: "Overlock Unit 3",
    detail: "Technician assigned for on-floor inspection",
    source: "Md Hares",
    status: "Assigned",
    statusType: "positive",
  },
  {
    time: "10:42",
    category: "tickets",
    machine: "Machine X",
    detail: "Auto-diagnosis completed and report generated",
    source: "FM Support AI",
    status: "Resolved",
    statusType: "positive",
  },
  {
    time: "10:10",
    category: "tickets",
    machine: "Line B-07",
    detail: "Spare parts request created from support ticket",
    source: "System",
    status: "Pending",
    statusType: "neutral",
  },
  {
    time: "09:48",
    category: "machines",
    machine: "Flatlock Unit 5",
    detail: "Temperature spike detected during production",
    source: "Sensor Feed",
    status: "Warning",
    statusType: "negative",
  },
  {
    time: "09:20",
    category: "visits",
    machine: "Button Attach 2",
    detail: "Routine maintenance completed successfully",
    source: "Field Team",
    status: "Done",
    statusType: "positive",
  },
];

export const performanceChartData: ChartPoint[] = [
  { label: "Mon", value: 712000 },
  { label: "Tue", value: 718500 },
  { label: "Wed", value: 721200 },
  { label: "Thu", value: 719400 },
  { label: "Fri", value: 725974 },
  { label: "Sat", value: 722300 },
  { label: "Sun", value: 721882 },
];

export const performanceChartByRange: Record<RangeKey, ChartPoint[]> = {
  "1m": [
    { label: "10:00", value: 721200 },
    { label: "10:05", value: 721450 },
    { label: "10:10", value: 721120 },
    { label: "10:15", value: 721600 },
    { label: "10:20", value: 721300 },
    { label: "10:25", value: 721882 },
  ],
  "5m": [
    { label: "10:00", value: 720800 },
    { label: "10:05", value: 721000 },
    { label: "10:10", value: 721600 },
    { label: "10:15", value: 721300 },
    { label: "10:20", value: 721950 },
    { label: "10:25", value: 721882 },
  ],
  "15m": [
    { label: "09:00", value: 719500 },
    { label: "09:15", value: 720400 },
    { label: "09:30", value: 721100 },
    { label: "09:45", value: 720700 },
    { label: "10:00", value: 721500 },
    { label: "10:15", value: 721882 },
  ],
  "1h": [
    { label: "Mon", value: 712000 },
    { label: "Tue", value: 718500 },
    { label: "Wed", value: 721200 },
    { label: "Thu", value: 719400 },
    { label: "Fri", value: 725974 },
    { label: "Sat", value: 722300 },
    { label: "Sun", value: 721882 },
  ],
  "4h": [
    { label: "W1", value: 690000 },
    { label: "W2", value: 704000 },
    { label: "W3", value: 716500 },
    { label: "W4", value: 709800 },
    { label: "W5", value: 725974 },
    { label: "W6", value: 721882 },
  ],
  "1d": [
    { label: "Jan", value: 640000 },
    { label: "Feb", value: 668000 },
    { label: "Mar", value: 691000 },
    { label: "Apr", value: 705000 },
    { label: "May", value: 718000 },
    { label: "Jun", value: 721882 },
  ],
};