/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { type Lead } from './types';
import { COURSES, type Course } from './constants';
import { BookOpen } from 'lucide-react';

// Simple Protected Route component
const ProtectedRoute = ({ children, isAuthenticated }: { children: React.ReactNode, isAuthenticated: boolean }) => {
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem('codesphere_courses');
    return saved ? JSON.parse(saved).map((c: any) => ({
      ...c,
      icon: COURSES.find(oc => oc.id === c.id)?.icon || BookOpen
    })) : COURSES;
  });

  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem('codesphere_leads');
    if (saved) return JSON.parse(saved);
    
    // Seed data
    return [
      {
        id: '1',
        name: 'Alex Johnson',
        email: 'alex.j@example.com',
        message: 'I am very interested in the AI Masterclass. When is the next cohort?',
        timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'new'
      },
      {
        id: '2',
        name: 'Sarah Williams',
        email: 'sarah.w@techcorp.io',
        message: 'Looking for group enrollment for my engineering team for the Fullstack course.',
        timestamp: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'contacted'
      },
      {
        id: '3',
        name: 'Michael Chen',
        email: 'chen.m@startup.co',
        message: 'Need to know if the DevOps course includes Kubernetes certification prep.',
        timestamp: new Date(Date.now() - 86400000 * 10).toISOString(),
        status: 'enrolled'
      },
      {
        id: '4',
        name: 'Emily Davis',
        email: 'emily.d@design.com',
        message: 'Does the Data Science course cover Python basics first?',
        timestamp: new Date(Date.now() - 86400000 * 1).toISOString(),
        status: 'new'
      }
    ];
  });
  const [user, setUser] = useState<{ email: string } | null>(() => {
    const saved = localStorage.getItem('codesphere_admin');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('codesphere_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('codesphere_admin', JSON.stringify(user));
    } else {
      localStorage.removeItem('codesphere_admin');
    }
  }, [user]);

  const handleAddLead = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateLeadStatus = (id: string, status: Lead['status']) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  const handleLogin = (email: string) => {
    setUser({ email });
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleAddCourse = (course: Omit<Course, 'icon'>) => {
    const newCourse: Course = {
      ...course,
      id: Math.random().toString(36).substr(2, 9),
      icon: BookOpen
    };
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem('codesphere_courses', JSON.stringify(updatedCourses));
  };

  const handleDeleteCourse = (id: string) => {
    const updatedCourses = courses.filter(c => c.id !== id);
    setCourses(updatedCourses);
    localStorage.setItem('codesphere_courses', JSON.stringify(updatedCourses));
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
            <LandingPage 
              courses={courses}
              onAddLead={handleAddLead} 
              isDarkMode={isDarkMode} 
              setIsDarkMode={setIsDarkMode} 
            />
          } 
        />
        <Route 
          path="/login" 
          element={
            <Login 
              onLogin={handleLogin} 
              isDarkMode={isDarkMode} 
            />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute isAuthenticated={!!user}>
              <Dashboard 
                leads={leads}
                courses={courses}
                onUpdateStatus={handleUpdateLeadStatus}
                onDeleteLead={handleDeleteLead}
                onAddCourse={handleAddCourse}
                onDeleteCourse={handleDeleteCourse}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                onLogout={handleLogout}
              />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}
