"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./layout.module.css";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
  Search,
  LogOut,
  Menu,
  X
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

const menuItems = [
  { id: "dashboard", icon: <LayoutDashboard />, label: "Dashboard", path: "/dashboard" },
  { id: "students", icon: <Users />, label: "Students", path: "/dashboard/student" },
  { id: "teachers", icon: <GraduationCap />, label: "Teachers", path: "/dashboard/teacher" },
  { id: "classes", icon: <BookOpen />, label: "Classes", path: "/dashboard/classes" },
  { id: "exams", icon: <Calendar />, label: "Exams", path: "/dashboard/exams" },
  { id: "fees", icon: <DollarSign />, label: "Fees", path: "/dashboard/fees" },
  { id: "reports", icon: <FileText />, label: "Reports", path: "/dashboard/reports" },
  { id: "settings", icon: <Settings />, label: "Settings", path: "/dashboard/settings" },
];


  const handleMenuClick = (path: string) => {
    router.push(path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  const isActive = (path: string) => pathname === path;

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  };

  const itemVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  };

  return (
    <div className={styles.layoutContainer}>
      {/* Desktop Sidebar */}
      <motion.aside
        className={styles.sidebar}
        initial="expanded"
        animate={collapsed ? "collapsed" : "expanded"}
        variants={sidebarVariants}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className={styles.logoSection}>
          <motion.div 
            className={styles.logo}
            whileHover={{ scale: 1.05 }}
          >
            <GraduationCap size={32} />
          </motion.div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                className={styles.logoText}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2>EduManage</h2>
                <p>School ERP</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className={styles.navigation}>
          {menuItems.map((item, index) => (
            <motion.button
              key={item.id}
              className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ""}`}
              onClick={() => handleMenuClick(item.path)}
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className={styles.menuIcon}>
                {item.icon}
              </div>
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    className={styles.menuLabel}
                    variants={itemVariants}
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {isActive(item.path) && (
                <motion.div
                  className={styles.activeIndicator}
                  layoutId="activeIndicator"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>

        <motion.button
          className={styles.collapseButton}
          onClick={() => setCollapsed(!collapsed)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </motion.button>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className={styles.mobileSidebar}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className={styles.mobileHeader}>
                <div className={styles.logoSection}>
                  <div className={styles.logo}>
                    <GraduationCap size={32} />
                  </div>
                  <div className={styles.logoText}>
                    <h2>EduManage</h2>
                    <p>School ERP</p>
                  </div>
                </div>
                <button 
                  className={styles.closeButton}
                  onClick={() => setMobileOpen(false)}
                >
                  <X size={24} />
                </button>
              </div>
              <nav className={styles.navigation}>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ""}`}
                    onClick={() => handleMenuClick(item.path)}
                  >
                    <div className={styles.menuIcon}>{item.icon}</div>
                    <span className={styles.menuLabel}>{item.label}</span>
                  </button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <header className={styles.topBar}>
          <button 
            className={styles.mobileMenuButton}
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className={styles.searchBar}>
            <Search size={20} />
            <input 
              type="text" 
              placeholder="Search students, teachers, classes..." 
            />
          </div>

          <div className={styles.topBarActions}>
            <motion.button 
              className={styles.notificationButton}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Bell size={20} />
              <span className={styles.notificationBadge}>3</span>
            </motion.button>

            <div className={styles.userProfile}>
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" 
                alt="User" 
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>Admin User</span>
                <span className={styles.userRole}>Administrator</span>
              </div>
            </div>

            <motion.button 
              className={styles.logoutButton}
              onClick={handleLogout}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut size={18} />
            </motion.button>
          </div>
        </header>

        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}