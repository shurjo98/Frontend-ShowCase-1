import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
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
  Menu,
  X,
  Activity,
  ClipboardList,
  Gauge,
  ShieldAlert,
} from "lucide-react";

function Layout() {
  const [serviceOpen, setServiceOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  function closeMobileMenu() {
    setIsMobileMenuOpen(false);
  }

  return (
    <div style={wrapperStyle}>
      {isMobile && (
        <header style={mobileHeaderStyle}>
          <div style={mobileHeaderLeftStyle}>
            <div style={mobileLogoBoxStyle}>F</div>
            <div style={mobileBrandTextWrapStyle}>
              <div style={mobileTitleStyle}>FM SUPPORT</div>
              <div style={mobileSubtitleStyle}>Operations Dashboard</div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            style={menuButtonStyle}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>
      )}

      {isMobile && (
        <div
          style={{
            ...overlayStyle,
            opacity: isMobileMenuOpen ? 1 : 0,
            pointerEvents: isMobileMenuOpen ? "auto" : "none",
          }}
          onClick={closeMobileMenu}
        />
      )}

      <aside
        style={{
          ...sidebarStyle,
          ...(isMobile ? mobileSidebarStyle : desktopSidebarStyle),
          transform:
            isMobile && !isMobileMenuOpen ? "translateX(-108%)" : "translateX(0)",
        }}
      >
        <div style={sidebarInnerStyle}>
          <div>
            <div style={isMobile ? mobileBrandCardStyle : brandStyle}>
              <div style={logoBoxStyle}>F</div>
              <div>
                <h2 style={brandTitleStyle}>FM SUPPORT</h2>
                <p style={brandSubStyle}>Dashboard</p>
              </div>
            </div>

            <div style={sectionStyle}>
              <p style={sectionTitleStyle}>Quick Access</p>

              <SidebarLink to="/" icon={<Home size={18} />} end onNavigate={closeMobileMenu}>
                Dashboard
              </SidebarLink>

              <SidebarLink
                to="/tickets"
                icon={<Ticket size={18} />}
                badge="3"
                onNavigate={closeMobileMenu}
              >
                Tickets
              </SidebarLink>

              <SidebarLink
                to="/machines"
                icon={<Monitor size={18} />}
                onNavigate={closeMobileMenu}
              >
                Machines
              </SidebarLink>
            </div>

            <div style={sectionStyle}>
              <p style={sectionTitleStyle}>Machine Operations</p>

              <button
                type="button"
                onClick={() => setServiceOpen((prev) => !prev)}
                style={parentMenuButtonStyle}
              >
                <span style={parentLeftStyle}>
                  <span style={iconStyle}>
                    <Wrench size={18} />
                  </span>
                  <span>Machine Tools</span>
                </span>

                <span style={parentRightStyle}>
                  <span style={badgeStyle}>4</span>
                  {serviceOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </span>
              </button>

              {serviceOpen && (
                <div style={submenuWrapperStyle}>
                  <SubmenuLink to="/machines/status" onNavigate={closeMobileMenu} icon={<Activity size={16} />}>
                    Machine Status
                  </SubmenuLink>
                  <SubmenuLink to="/machines/maintenance" onNavigate={closeMobileMenu} icon={<ClipboardList size={16} />}>
                    Maintenance Logs
                  </SubmenuLink>
                  <SubmenuLink to="/machines/performance" onNavigate={closeMobileMenu} icon={<Gauge size={16} />}>
                    Performance
                  </SubmenuLink>
                  <SubmenuLink to="/machines/alerts" onNavigate={closeMobileMenu} icon={<ShieldAlert size={16} />}>
                    Alerts
                  </SubmenuLink>
                </div>
              )}
            </div>

            <div style={sectionStyle}>
              <p style={sectionTitleStyle}>Account</p>

              <SidebarLink
                to="/notifications"
                icon={<Bell size={18} />}
                onNavigate={closeMobileMenu}
              >
                Notifications
              </SidebarLink>

              <SidebarLink
                to="/settings"
                icon={<Settings size={18} />}
                onNavigate={closeMobileMenu}
              >
                Settings
              </SidebarLink>
            </div>
          </div>

          <div style={bottomSectionStyle}>
            <SidebarLink to="/logout" icon={<LogOut size={18} />} onNavigate={closeMobileMenu}>
              Log Out
            </SidebarLink>
          </div>
        </div>
      </aside>

      <main
        style={{
          ...mainStyle,
          paddingTop: isMobile ? "88px" : "32px",
          paddingLeft: isMobile ? "14px" : "16px",
          paddingRight: isMobile ? "14px" : "24px",
          paddingBottom: isMobile ? "18px" : "32px",
        }}
      >
        
      <Outlet />
    </main>
    </div >
  );
}

type SidebarLinkProps = {
  to: string;
  children: ReactNode;
  icon: ReactNode;
  badge?: string;
  end?: boolean;
  onNavigate?: () => void;
};

function SidebarLink({
  to,
  children,
  icon,
  badge,
  end = false,
  onNavigate,
}: SidebarLinkProps) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      style={({ isActive }) => getNavLinkStyle(isActive)}
    >
      <span style={parentLeftStyle}>
        <span style={iconStyle}>{icon}</span>
        <span style={linkTextStyle}>{children}</span>
      </span>

      {badge ? <span style={badgeStyle}>{badge}</span> : null}
    </NavLink>
  );
}

type SubmenuLinkProps = {
  to: string;
  children: ReactNode;
  icon?: ReactNode;
  onNavigate?: () => void;
};

function SubmenuLink({ to, children, icon, onNavigate }: SubmenuLinkProps) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      style={({ isActive }) => getSubmenuLinkStyle(isActive)}
    >
      <span style={submenuContentStyle}>
        {icon ? <span style={submenuIconStyle}>{icon}</span> : null}
        <span style={linkTextStyle}>{children}</span>
      </span>
    </NavLink>
  );
}

const wrapperStyle: CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  width: "100%",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f5f7fb",
  overflowX: "hidden",
};

const desktopSidebarStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  height: "100vh",
  width: "270px",
  minWidth: "270px",
  maxWidth: "270px",
  flexShrink: 0,
  zIndex: 40,
};

const mobileSidebarStyle: CSSProperties = {
  position: "fixed",
  top: "10px",
  left: "10px",
  bottom: "10px",
  width: "min(82vw, 320px)",
  zIndex: 1200,
  borderRadius: "24px",
  transition: "transform 0.32s ease",
  boxShadow: "0 28px 60px rgba(15, 23, 42, 0.3)",
  overflow: "hidden",
};

const sidebarStyle: CSSProperties = {
  background: "linear-gradient(180deg, #18213f 0%, #16203b 100%)",
  color: "#ffffff",
  padding: "18px 14px",
  boxSizing: "border-box",
};

const sidebarInnerStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflowY: "auto",
  gap: "12px",
};

const mobileHeaderStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "68px",
  background: "rgba(245, 247, 251, 0.88)",
  backdropFilter: "blur(12px)",
  WebkitBackdropFilter: "blur(12px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 14px",
  boxSizing: "border-box",
  zIndex: 1300,
  borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
};

const mobileHeaderLeftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
};

const mobileBrandTextWrapStyle: CSSProperties = {
  minWidth: 0,
};

const mobileLogoBoxStyle: CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 700,
  fontSize: "16px",
  color: "#ffffff",
  boxShadow: "0 10px 24px rgba(59, 130, 246, 0.3)",
};

const mobileTitleStyle: CSSProperties = {
  fontSize: "13px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  color: "#0f172a",
};

const mobileSubtitleStyle: CSSProperties = {
  fontSize: "11px",
  color: "#64748b",
  marginTop: "2px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const menuButtonStyle: CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  border: "1px solid rgba(148, 163, 184, 0.22)",
  background: "#ffffff",
  color: "#0f172a",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  padding: 0,
  boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
};

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(15, 23, 42, 0.4)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
  zIndex: 1100,
  transition: "opacity 0.25s ease",
};

const mobileBrandCardStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "14px",
  borderRadius: "18px",
  background: "rgba(255,255,255,0.08)",
  border: "1px solid rgba(255,255,255,0.08)",
  marginBottom: "18px",
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
  flexShrink: 0,
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
  marginBottom: "22px",
};

const sectionTitleStyle: CSSProperties = {
  fontSize: "11px",
  fontWeight: 700,
  color: "#94a3b8",
  margin: "0 0 10px 4px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const mainStyle: CSSProperties = {
  flex: 1,
  minWidth: 0,
  backgroundColor: "#f5f7fb",
  boxSizing: "border-box",
};

const bottomSectionStyle: CSSProperties = {
  paddingTop: "16px",
  borderTop: "1px solid rgba(255,255,255,0.08)",
  marginTop: "8px",
};

const iconStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
};

const parentLeftStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
};

const parentRightStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  flexShrink: 0,
};

const linkTextStyle: CSSProperties = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
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
  flexShrink: 0,
};

const parentMenuButtonStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.07)",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "13px 14px",
  borderRadius: "14px",
  cursor: "pointer",
  marginBottom: "8px",
  fontSize: "14px",
};

const submenuWrapperStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  paddingLeft: "12px",
  marginTop: "6px",
};

const submenuContentStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  minWidth: 0,
};

const submenuIconStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  flexShrink: 0,
};

function getNavLinkStyle(isActive: boolean): CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#cbd5e1",
    padding: "13px 14px",
    borderRadius: "14px",
    backgroundColor: isActive ? "rgba(255,255,255,0.12)" : "transparent",
    fontWeight: isActive ? 600 : 500,
    marginBottom: "6px",
    transition: "all 0.2s ease",
    border: isActive ? "1px solid rgba(255,255,255,0.08)" : "1px solid transparent",
  };
}

function getSubmenuLinkStyle(isActive: boolean): CSSProperties {
  return {
    textDecoration: "none",
    color: isActive ? "#ffffff" : "#aeb8d0",
    padding: "11px 14px",
    borderRadius: "12px",
    backgroundColor: isActive ? "rgba(255,255,255,0.09)" : "transparent",
    fontSize: "14px",
    fontWeight: isActive ? 600 : 400,
    transition: "all 0.2s ease",
    display: "block",
  };
}

export default Layout;