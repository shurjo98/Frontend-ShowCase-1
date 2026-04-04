import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import {
  Home,
  Ticket,
  Monitor,
  Bell,
  Settings,
  LogOut,
  Wrench,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

function Layout() {
  const [serviceOpen, setServiceOpen] = useState(true);

  return (
    <div style={wrapperStyle}>
      <aside style={sidebarStyle}>
        <div>
          <div style={brandStyle}>
            <div style={logoBoxStyle}>F</div>
            <div>
              <h2 style={brandTitleStyle}>FM SUPPORT</h2>
              <p style={brandSubStyle}>Dashboard</p>
            </div>
          </div>

          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Quick Access</p>

            <SidebarLink to="/" icon={<Home size={18} />} end>
              Dashboard
            </SidebarLink>

            <SidebarLink to="/tickets" icon={<Ticket size={18} />} badge="3">
              Tickets
            </SidebarLink>

            <SidebarLink to="/machines" icon={<Monitor size={18} />}>
              Machines
            </SidebarLink>
          </div>

          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Service</p>

            <button
              type="button"
              onClick={() => setServiceOpen(!serviceOpen)}
              style={parentMenuButtonStyle}
            >
              <span style={parentLeftStyle}>
                <span style={iconStyle}>
                  <Wrench size={18} />
                </span>
                <span>Transactions</span>
              </span>

              <span style={parentRightStyle}>
                <span style={badgeStyle}>3</span>
                {serviceOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </span>
            </button>

            {serviceOpen && (
              <div style={submenuWrapperStyle}>
                <SubmenuLink to="/service/buy-sell">Buy & Sell Coin</SubmenuLink>
                <SubmenuLink to="/service/deposit-yen">Deposit Yen</SubmenuLink>
                <SubmenuLink to="/service/withdraw-yen">Withdraw Yen</SubmenuLink>
                <SubmenuLink to="/service/send-coin">Send Coin</SubmenuLink>
                <SubmenuLink to="/service/receive-coin">Receive Coin</SubmenuLink>
                <SubmenuLink to="/service/deposit-coin">Deposit Coin</SubmenuLink>
              </div>
            )}
          </div>

          <div style={sectionStyle}>
            <p style={sectionTitleStyle}>Account</p>

            <SidebarLink to="/notifications" icon={<Bell size={18} />}>
              Notifications
            </SidebarLink>

            <SidebarLink to="/settings" icon={<Settings size={18} />}>
              Settings
            </SidebarLink>
          </div>
        </div>

        <div style={bottomSectionStyle}>
          <SidebarLink to="/logout" icon={<LogOut size={18} />}>
            Log Out
          </SidebarLink>
        </div>
      </aside>

      <main style={mainStyle}>
        <Outlet />
      </main>
    </div>
  );
}

type SidebarLinkProps = {
  to: string;
  children: ReactNode;
  icon: ReactNode;
  badge?: string;
  end?: boolean;
};

function SidebarLink({ to, children, icon, badge, end = false }: SidebarLinkProps) {
  return (
    <NavLink to={to} end={end} style={({ isActive }) => getNavLinkStyle(isActive)}>
      <span style={parentLeftStyle}>
        <span style={iconStyle}>{icon}</span>
        <span>{children}</span>
      </span>

      {badge ? <span style={badgeStyle}>{badge}</span> : null}
    </NavLink>
  );
}

type SubmenuLinkProps = {
  to: string;
  children: ReactNode;
};

function SubmenuLink({ to, children }: SubmenuLinkProps) {
  return (
    <NavLink to={to} style={({ isActive }) => getSubmenuLinkStyle(isActive)}>
      {children}
    </NavLink>
  );
}

const wrapperStyle: CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
};

const sidebarStyle: CSSProperties = {
  width: "270px",
  background: "linear-gradient(180deg, #18213f 0%, #16203b 100%)",
  color: "#ffffff",
  padding: "20px 16px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  color: "#94a3b8",
  margin: "0 0 10px -4px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const brandStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 10px 20px 10px",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "20px",
};

const logoBoxStyle: CSSProperties = {
  width: "38px",
  height: "38px",
  borderRadius: "10px",
  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "18px",
};

const brandTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: "15px",
  letterSpacing: "1px",
};

const brandSubStyle: CSSProperties = {
  margin: "2px 0 0 0",
  fontSize: "12px",
  color: "#94a3b8",
};

const sectionStyle: CSSProperties = {
  marginBottom: "24px",
};



const mainStyle: CSSProperties = {
  flex: 1,
  padding: "32px",
  backgroundColor: "#f5f7fb",
  boxSizing: "border-box",
};

const bottomSectionStyle: CSSProperties = {
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.08)",
};

const iconStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
};

const parentLeftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const parentRightStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const badgeStyle: CSSProperties = {
  minWidth: "20px",
  height: "20px",
  borderRadius: "999px",
  backgroundColor: "#f43f5e",
  color: "#ffffff",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "11px",
  fontWeight: 700,
  padding: "0 6px",
};

const parentMenuButtonStyle: CSSProperties = {
  width: "100%",
  border: "none",
  background: "rgba(255,255,255,0.08)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 14px",
  borderRadius: "12px",
  cursor: "pointer",
  marginBottom: "8px",
  fontSize: "14px",
};

const submenuWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  paddingLeft: "18px",
  marginTop: "4px",
};

function getNavLinkStyle(isActive: boolean): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#cbd5e1",
    padding: "12px 14px",
    borderRadius: "12px",
    backgroundColor: isActive ? "rgba(255,255,255,0.10)" : "transparent",
    fontWeight: isActive ? 600 : 500,
    marginBottom: "6px",
    transition: "all 0.2s ease",
  };
}

function getSubmenuLinkStyle(isActive: boolean): CSSProperties {
  return {
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#aeb8d0",
    padding: "10px 14px",
    borderRadius: "10px",
    backgroundColor: isActive ? "rgba(255,255,255,0.08)" : "transparent",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 400,
    transition: "all 0.2s ease",
  };
}

export default Layout;