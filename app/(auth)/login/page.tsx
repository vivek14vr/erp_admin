"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import styles from "./login.module.css";
import { GraduationCap, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Redirect to dashboard
    router.push("/dashboard");
  };

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.loginCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo Section */}
        <div className={styles.logoSection}>
          <motion.div 
            className={styles.logoIcon}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <GraduationCap size={48} />
          </motion.div>
          <h1>EduManage</h1>
          <p>School ERP System</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail size={20} />
              <input
                id="email"
                type="email"
                placeholder="admin@school.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <div className={styles.inputWrapper}>
              <Lock size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.togglePassword}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
          </div>

          <motion.button
            type="submit"
            className={styles.loginButton}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </motion.button>
        </form>

        {/* Demo Credentials */}
        <div className={styles.demoInfo}>
          <p>Demo Credentials:</p>
          <p><strong>Email:</strong> admin@school.com</p>
          <p><strong>Password:</strong> admin123</p>
        </div>
      </motion.div>

      {/* Background Decoration */}
      <div className={styles.bgDecoration}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </div>
  );
}