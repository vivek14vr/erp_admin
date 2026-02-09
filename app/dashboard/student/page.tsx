"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./student.module.css";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  Filter,
  Download,
  Upload
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  rollNo: string;
  email: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  guardianName: string;
  status: "active" | "inactive";
  avatar: string;
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Rahul Sharma",
      grade: "Grade 10",
      section: "A",
      rollNo: "101",
      email: "rahul.sharma@school.com",
      phone: "+91 98765 43210",
      address: "123 MG Road, Delhi",
      dateOfBirth: "2010-05-15",
      guardianName: "Mr. Vijay Sharma",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    },
    {
      id: "2",
      name: "Priya Patel",
      grade: "Grade 10",
      section: "B",
      rollNo: "102",
      email: "priya.patel@school.com",
      phone: "+91 98765 43211",
      address: "456 Park Street, Mumbai",
      dateOfBirth: "2010-08-22",
      guardianName: "Mrs. Anjali Patel",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
      id: "3",
      name: "Amit Kumar",
      grade: "Grade 9",
      section: "A",
      rollNo: "201",
      email: "amit.kumar@school.com",
      phone: "+91 98765 43212",
      address: "789 Lake Road, Bangalore",
      dateOfBirth: "2011-03-10",
      guardianName: "Mr. Rajesh Kumar",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit"
    },
    {
      id: "4",
      name: "Sneha Reddy",
      grade: "Grade 9",
      section: "B",
      rollNo: "202",
      email: "sneha.reddy@school.com",
      phone: "+91 98765 43213",
      address: "321 Beach Road, Chennai",
      dateOfBirth: "2011-11-30",
      guardianName: "Mrs. Lakshmi Reddy",
      status: "active",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
    },
    {
      id: "5",
      name: "Vikram Singh",
      grade: "Grade 8",
      section: "A",
      rollNo: "301",
      email: "vikram.singh@school.com",
      phone: "+91 98765 43214",
      address: "555 Hill Street, Pune",
      dateOfBirth: "2012-07-18",
      guardianName: "Mr. Suresh Singh",
      status: "inactive",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterGrade, setFilterGrade] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState<Partial<Student>>({});

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade;
    return matchesSearch && matchesGrade;
  });

  const handleAddStudent = () => {
    setModalMode("add");
    setFormData({
      name: "",
      grade: "Grade 10",
      section: "A",
      rollNo: "",
      email: "",
      phone: "",
      address: "",
      dateOfBirth: "",
      guardianName: "",
      status: "active"
    });
    setShowModal(true);
  };

  const handleEditStudent = (student: Student) => {
    setModalMode("edit");
    setSelectedStudent(student);
    setFormData(student);
    setShowModal(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSubmit = () => {
    if (modalMode === "add") {
      const newStudent: Student = {
        ...formData as Student,
        id: Date.now().toString(),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
      };
      setStudents([...students, newStudent]);
    } else {
      setStudents(students.map(s => 
        s.id === selectedStudent?.id ? { ...s, ...formData } : s
      ));
    }
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Students Management</h1>
          <p>Manage all student records and information</p>
        </div>
        <div className={styles.headerRight}>
          <motion.button
            className={styles.importButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Upload size={18} />
            Import
          </motion.button>
          <motion.button
            className={styles.exportButton}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={18} />
            Export
          </motion.button>
          <motion.button
            className={styles.addButton}
            onClick={handleAddStudent}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={18} />
            Add Student
          </motion.button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <Search size={20} />
          <input
            type="text"
            placeholder="Search by name, roll number, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <Filter size={18} />
            <select 
              value={filterGrade} 
              onChange={(e) => setFilterGrade(e.target.value)}
            >
              <option value="all">All Grades</option>
              <option value="Grade 10">Grade 10</option>
              <option value="Grade 9">Grade 9</option>
              <option value="Grade 8">Grade 8</option>
              <option value="Grade 7">Grade 7</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{students.length}</div>
          <div className={styles.statLabel}>Total Students</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {students.filter(s => s.status === "active").length}
          </div>
          <div className={styles.statLabel}>Active</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>
            {students.filter(s => s.status === "inactive").length}
          </div>
          <div className={styles.statLabel}>Inactive</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{filteredStudents.length}</div>
          <div className={styles.statLabel}>Filtered Results</div>
        </div>
      </div>

      <motion.div 
        className={styles.studentsGrid}
        layout
      >
        <AnimatePresence>
          {filteredStudents.map((student, index) => (
            <motion.div
              key={student.id}
              className={styles.studentCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              layout
              whileHover={{ y: -5, boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <div className={styles.cardHeader}>
                <img src={student.avatar} alt={student.name} />
                <span className={`${styles.statusBadge} ${styles[student.status]}`}>
                  {student.status}
                </span>
              </div>

              <div className={styles.cardBody}>
                <h3>{student.name}</h3>
                <div className={styles.studentInfo}>
                  <div className={styles.infoItem}>
                    <BookOpen size={16} />
                    <span>{student.grade} - {student.section}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <User size={16} />
                    <span>Roll No: {student.rollNo}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Mail size={16} />
                    <span>{student.email}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <Phone size={16} />
                    <span>{student.phone}</span>
                  </div>
                </div>
              </div>

              <div className={styles.cardActions}>
                <motion.button
                  className={styles.editButton}
                  onClick={() => handleEditStudent(student)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Edit2 size={16} />
                </motion.button>
                <motion.button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteStudent(student.id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <h2>{modalMode === "add" ? "Add New Student" : "Edit Student"}</h2>
                <button onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>

              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Enter student name"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Grade</label>
                    <select
                      value={formData.grade || ""}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    >
                      <option value="Grade 10">Grade 10</option>
                      <option value="Grade 9">Grade 9</option>
                      <option value="Grade 8">Grade 8</option>
                      <option value="Grade 7">Grade 7</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Section</label>
                    <select
                      value={formData.section || ""}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label>Roll Number</label>
                    <input
                      type="text"
                      value={formData.rollNo || ""}
                      onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                      placeholder="Enter roll number"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="student@school.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      value={formData.dateOfBirth || ""}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Guardian Name</label>
                    <input
                      type="text"
                      value={formData.guardianName || ""}
                      onChange={(e) => setFormData({...formData, guardianName: e.target.value})}
                      placeholder="Enter guardian name"
                    />
                  </div>

                  <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
                    <label>Address</label>
                    <textarea
                      value={formData.address || ""}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      placeholder="Enter full address"
                      rows={3}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label>Status</label>
                    <select
                      value={formData.status || ""}
                      onChange={(e) => setFormData({...formData, status: e.target.value as "active" | "inactive"})}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button 
                  className={styles.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <motion.button
                  className={styles.submitButton}
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {modalMode === "add" ? "Add Student" : "Save Changes"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}