"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import styles from "./dashboard.module.css";
import { 
  Users, 
  GraduationCap, 
  IndianRupee, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  Clock,
  Bell,
  Search,
  Filter,
  Download,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  XCircle
} from "lucide-react";

// Types
interface StatCardData {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  color: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  description?: string;
}

interface AdmissionData {
  id: string;
  name: string;
  grade: string;
  status: 'approved' | 'pending' | 'rejected';
  date: string;
}

interface FeeData {
  id: string;
  student: string;
  amount: string;
  dueDate: string;
  status: 'overdue' | 'upcoming' | 'paid';
}

interface ExamData {
  id: string;
  subject: string;
  grade: string;
  date: string;
  time: string;
  duration: string;
}

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [notifications, setNotifications] = useState(3);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'today' | 'week'>('all');

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const stats: StatCardData[] = [
    {
      title: "Total Students",
      value: "1,240",
      icon: <Users />,
      trend: "+12%",
      color: "blue",
      changeType: "increase",
      description: "vs last month"
    },
    {
      title: "Total Teachers",
      value: "85",
      icon: <GraduationCap />,
      trend: "+3",
      color: "purple",
      changeType: "increase",
      description: "new this month"
    },
    {
      title: "Fees Collected",
      value: "₹12.4L",
      icon: <IndianRupee />,
      trend: "+8%",
      color: "green",
      changeType: "increase",
      description: "this month"
    },
    {
      title: "Attendance Today",
      value: "92%",
      icon: <TrendingUp />,
      trend: "+2%",
      color: "orange",
      changeType: "increase",
      description: "vs yesterday"
    }
  ];

  const admissions: AdmissionData[] = [
    { id: '1', name: "Rahul Sharma", grade: "Grade 10", status: "approved", date: "2 hours ago" },
    { id: '2', name: "Priya Patel", grade: "Grade 8", status: "pending", date: "5 hours ago" },
    { id: '3', name: "Amit Kumar", grade: "Grade 9", status: "approved", date: "1 day ago" },
    { id: '4', name: "Sneha Reddy", grade: "Grade 7", status: "approved", date: "2 days ago" }
  ];

  const fees: FeeData[] = [
    { id: '1', student: "Vikram Singh", amount: "₹15,000", dueDate: "15 Feb", status: "overdue" },
    { id: '2', student: "Anjali Verma", amount: "₹12,500", dueDate: "18 Feb", status: "upcoming" },
    { id: '3', student: "Rohan Desai", amount: "₹18,000", dueDate: "20 Feb", status: "upcoming" },
    { id: '4', student: "Kavya Nair", amount: "₹10,000", dueDate: "22 Feb", status: "upcoming" }
  ];

  const exams: ExamData[] = [
    { id: '1', subject: "Mathematics", grade: "Grade 10", date: "25 Feb", time: "10:00 AM", duration: "2 hrs" },
    { id: '2', subject: "Science", grade: "Grade 9", date: "27 Feb", time: "11:00 AM", duration: "2 hrs" },
    { id: '3', subject: "English", grade: "Grade 8", date: "1 Mar", time: "9:00 AM", duration: "1.5 hrs" },
    { id: '4', subject: "Social Studies", grade: "Grade 10", date: "3 Mar", time: "2:00 PM", duration: "2 hrs" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Enhanced Header */}
      <motion.div 
        className={styles.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.headerLeft}>
          <div>
            <h1>Dashboard</h1>
            <p>School Management ERP Overview</p>
          </div>
        </div>
        
        <div className={styles.headerRight}>
          <div className={styles.searchBar}>
            <Search size={18} />
            <input type="text" placeholder="Search..." />
          </div>
          
          <motion.button 
            className={styles.iconButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRefresh}
          >
            <RefreshCw size={18} className={isRefreshing ? styles.spinning : ''} />
          </motion.button>

          <motion.button 
            className={styles.iconButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className={styles.notificationWrapper}>
              <Bell size={18} />
              {notifications > 0 && (
                <span className={styles.badge}>{notifications}</span>
              )}
            </div>
          </motion.button>

          <div className={styles.dateTime}>
            <Clock size={18} />
            <div className={styles.timeInfo}>
              <span className={styles.time}>
                {currentTime.toLocaleTimeString('en-IN', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
              <span className={styles.date}>
                {currentTime.toLocaleDateString('en-IN', { 
                  day: 'numeric',
                  month: 'short'
                })}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        className={styles.statsGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} variants={itemVariants} />
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        className={styles.quickActions}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <QuickActionButton icon={<Users />} label="Add Student" color="blue" />
        <QuickActionButton icon={<IndianRupee />} label="Collect Fee" color="green" />
        <QuickActionButton icon={<Calendar />} label="Schedule Exam" color="purple" />
        <QuickActionButton icon={<Download />} label="Export Data" color="orange" />
      </motion.div>

      {/* Sections Grid */}
      <motion.div 
        className={styles.sectionGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Section 
          title="Recent Admissions" 
          icon={<Users size={20} />}
          variants={itemVariants}
          actionLabel="View All"
          count={admissions.length}
        >
          <AnimatePresence mode="popLayout">
            {admissions.map((admission) => (
              <AdmissionItem key={admission.id} {...admission} />
            ))}
          </AnimatePresence>
        </Section>

        <Section 
          title="Pending Fees" 
          icon={<AlertCircle size={20} />}
          variants={itemVariants}
          actionLabel="View All"
          count={fees.length}
          alert
        >
          <AnimatePresence mode="popLayout">
            {fees.map((fee) => (
              <FeeItem key={fee.id} {...fee} />
            ))}
          </AnimatePresence>
        </Section>

        <Section 
          title="Upcoming Exams" 
          icon={<Calendar size={20} />}
          variants={itemVariants}
          actionLabel="View All"
          count={exams.length}
        >
          <AnimatePresence mode="popLayout">
            {exams.map((exam) => (
              <ExamItem key={exam.id} {...exam} />
            ))}
          </AnimatePresence>
        </Section>
      </motion.div>
    </div>
  );
}

// Enhanced StatCard Component
function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  color,
  changeType,
  description,
  variants 
}: StatCardData & { variants: any }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`${styles.card} ${styles[color]}`}
      variants={variants}
      whileHover={{ 
        scale: 1.02, 
        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
        transition: { type: "spring", stiffness: 300, damping: 20 }
      }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className={styles.cardHeader}>
        <motion.div 
          className={styles.iconWrapper}
          animate={{ rotate: isHovered ? 360 : 0 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
        <span className={`${styles.trend} ${styles[changeType]}`}>
          {changeType === 'increase' ? '↑' : changeType === 'decrease' ? '↓' : '−'} {trend}
        </span>
      </div>
      <p className={styles.cardTitle}>{title}</p>
      <motion.h2 
        className={styles.cardValue}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        {value}
      </motion.h2>
      {description && (
        <motion.p 
          className={styles.cardDescription}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}

// Quick Action Button Component
function QuickActionButton({ 
  icon, 
  label, 
  color 
}: { 
  icon: React.ReactNode; 
  label: string; 
  color: string;
}) {
  return (
    <motion.button
      className={`${styles.quickActionBtn} ${styles[color]}`}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className={styles.quickActionIcon}>{icon}</div>
      <span>{label}</span>
    </motion.button>
  );
}

// Enhanced Section Component
function Section({ 
  title, 
  icon, 
  children,
  variants,
  actionLabel,
  count,
  alert
}: { 
  title: string; 
  icon: React.ReactNode;
  children: React.ReactNode;
  variants: any;
  actionLabel?: string;
  count?: number;
  alert?: boolean;
}) {
  return (
    <motion.div 
      className={styles.section}
      variants={variants}
      whileHover={{ 
        boxShadow: "0 6px 25px rgba(0,0,0,0.1)",
        y: -2
      }}
    >
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitleGroup}>
          <div className={`${styles.sectionIconWrapper} ${alert ? styles.alert : ''}`}>
            {icon}
          </div>
          <div>
            <h3>{title}</h3>
            {count && <span className={styles.count}>{count} items</span>}
          </div>
        </div>
        {actionLabel && (
          <motion.button 
            className={styles.sectionAction}
            whileHover={{ x: 3 }}
          >
            {actionLabel}
            <ChevronRight size={16} />
          </motion.button>
        )}
      </div>
      <div className={styles.sectionContent}>
        {children}
      </div>
    </motion.div>
  );
}

// Enhanced List Item Components
function AdmissionItem({ name, grade, status, date }: AdmissionData) {
  const statusConfig = {
    approved: { icon: <CheckCircle size={14} />, color: 'success' },
    pending: { icon: <Clock size={14} />, color: 'warning' },
    rejected: { icon: <XCircle size={14} />, color: 'danger' }
  };

  return (
    <motion.div 
      className={styles.listItem}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ x: 5, backgroundColor: "rgba(102, 126, 234, 0.03)" }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
    >
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{name}</span>
        <div className={styles.itemMetadata}>
          <span className={styles.itemMuted}>{grade}</span>
          <span className={styles.itemDot}>•</span>
          <span className={styles.itemTime}>{date}</span>
        </div>
      </div>
      <span className={`${styles.statusBadge} ${styles[statusConfig[status].color]}`}>
        {statusConfig[status].icon}
        {status}
      </span>
    </motion.div>
  );
}

function FeeItem({ student, amount, dueDate, status }: FeeData) {
  const isOverdue = status === 'overdue';
  
  return (
    <motion.div 
      className={`${styles.listItem} ${isOverdue ? styles.overdue : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ x: 5, backgroundColor: "rgba(102, 126, 234, 0.03)" }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
    >
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{student}</span>
        <div className={styles.itemMetadata}>
          <span className={`${styles.itemMuted} ${isOverdue ? styles.overdueText : ''}`}>
            {isOverdue ? 'Overdue: ' : 'Due: '}{dueDate}
          </span>
        </div>
      </div>
      <div className={styles.feeAmount}>
        <span className={`${styles.amount} ${isOverdue ? styles.overdueAmount : ''}`}>
          {amount}
        </span>
        {isOverdue && <AlertCircle size={16} className={styles.overdueIcon} />}
      </div>
    </motion.div>
  );
}

function ExamItem({ subject, grade, date, time, duration }: ExamData) {
  return (
    <motion.div 
      className={styles.listItem}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      whileHover={{ x: 5, backgroundColor: "rgba(102, 126, 234, 0.03)" }}
      transition={{ type: "spring", stiffness: 300 }}
      layout
    >
      <div className={styles.itemInfo}>
        <span className={styles.itemName}>{subject}</span>
        <div className={styles.itemMetadata}>
          <span className={styles.itemMuted}>{grade}</span>
          <span className={styles.itemDot}>•</span>
          <span className={styles.itemMuted}>{time}</span>
          <span className={styles.itemDot}>•</span>
          <span className={styles.itemMuted}>{duration}</span>
        </div>
      </div>
      <span className={styles.examDate}>
        <Calendar size={14} />
        {date}
      </span>
    </motion.div>
  );
}