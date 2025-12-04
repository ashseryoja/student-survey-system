import React, { createContext, useContext, useMemo, useState } from 'react';

const STORAGE_KEY = 'sss-auth-user';
const REGISTERED_USERS_KEY = 'sss-registered-users';

const PREDEFINED_USERS = [
  {
    id: 'user-admin-1',
    role: 'admin',
    roleLabel: 'Administrator',
    firstName: 'Janna',
    lastName: 'Petrosyan',
    email: 'admin@sss.edu',
    password: 'Admin@123',
    phone: '+1 (555) 010-2000',
    avatar: 'https://images.unsplash.com/photo-1603988089669-c041ac2fe196?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmVtYWxlJTIwZmFjZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000',
    studentId: 'ADM-001',
    major: 'Information Systems',
    year: 'N/A',
    address: '1 Campus Way, Admin Building',
    department: 'System Operations',
    joinDate: '2018-08-15',
    permissions: ['manageUsers', 'publishSurveys', 'viewResults', 'moderateChat'],
    analytics: {
      totalUsers: 1240,
      activeSurveys: 32,
      pendingApprovals: 4,
      incidents: 1
    }
  },
  {
    id: 'user-lecturer-1',
    role: 'lecturer',
    roleLabel: 'Lecturer',
    firstName: 'Anna ',
    lastName: 'Hakobyan',
    email: 'lecturer@sss.edu',
    password: 'Lecturer@123',
    phone: '+1 (555) 010-4000',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=faces',
    studentId: 'LEC-221',
    major: 'Computer Science',
    year: 'Faculty',
    address: '5 Faculty Lane, Office 214',
    department: 'Computer Science',
    joinDate: '2016-01-10',
    permissions: ['createSurveys', 'gradeAssignments', 'viewCourses'],
    analytics: {
      courses: 4,
      surveysCreated: 12,
      responsesCollected: 864,
      feedbackScore: 4.7
    }
  },
  {
    id: 'user-student-1',
    role: 'student',
    roleLabel: 'Student',
    firstName: 'Sergey',
    lastName: 'Ashughyan',
    email: 'student@sss.edu',
    password: 'Student@123',
    phone: '+1 (555) 010-7000',
    avatar: 'https://plus.unsplash.com/premium_photo-1682096252599-e8536cd97d2b?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHlvdW5nJTIwbWFufGVufDB8fDB8fHww&ixlib=rb-4.1.0&q=60&w=3000',
    studentId: 'STU-2024-017',
    major: 'Software Engineering',
    year: 'Senior',
    address: 'Dormitory B, Room 214',
    department: 'Engineering',
    joinDate: '2021-09-01',
    permissions: ['takeSurveys', 'viewNews', 'joinChat'],
    analytics: {
      surveysCompleted: 18,
      badgesEarned: 6,
      unreadMessages: 2
    }
  }
];

const sanitizeUser = (user) => {
  if (!user) {
    return null;
  }
  const { password, ...rest } = user;
  return rest;
};

const loadPersistedUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Unable to parse stored auth user', error);
    return null;
  }
};

const AuthContext = createContext();

const delay = (ms = 700) => new Promise((resolve) => setTimeout(resolve, ms));

const getRegisteredUsers = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = localStorage.getItem(REGISTERED_USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Unable to parse registered users', error);
    return [];
  }
};

const saveRegisteredUsers = (users) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.warn('Unable to save registered users', error);
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => loadPersistedUser());

  const credentialHints = useMemo(
    () =>
      PREDEFINED_USERS.map(({ role, roleLabel, email, password, firstName, lastName }) => ({
        role,
        roleLabel,
        email,
        password,
        name: `${firstName} ${lastName}`
      })),
    []
  );

  const login = async (email, password) => {
    const normalizedEmail = email.toLowerCase().trim();
    
    // Check predefined users
    let match = PREDEFINED_USERS.find(
      (account) => account.email.toLowerCase() === normalizedEmail
    );

    // Check registered users
    if (!match) {
      const registeredUsers = getRegisteredUsers();
      match = registeredUsers.find(
        (account) => account.email.toLowerCase() === normalizedEmail
      );
    }

    if (!match || match.password !== password) {
      throw new Error('INVALID_CREDENTIALS');
    }

    const safeUser = sanitizeUser(match);
    setUser(safeUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safeUser));
    return safeUser;
  };

  const register = async (name, email, password) => {
    const normalizedEmail = email.toLowerCase().trim();

    // Validation
    if (!normalizedEmail || !password || !name) {
      throw new Error('MISSING_FIELDS');
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
      throw new Error('INVALID_EMAIL');
    }

    // Check if email already exists in predefined users
    const existsInPredefined = PREDEFINED_USERS.find(
      (account) => account.email.toLowerCase() === normalizedEmail
    );

    if (existsInPredefined) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // Check if email already exists in registered users
    const registeredUsers = getRegisteredUsers();
    const existsInRegistered = registeredUsers.find(
      (account) => account.email.toLowerCase() === normalizedEmail
    );

    if (existsInRegistered) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }

    // Create new user
    const newUser = {
      id: `user-student-${Date.now()}`,
      role: 'student',
      roleLabel: 'Student',
      firstName: name.split(' ')[0] || name,
      lastName: name.split(' ').slice(1).join(' ') || '',
      email: normalizedEmail,
      password: password,
      phone: '',
      avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=200&h=200&fit=crop&crop=faces',
      studentId: `STU-${Date.now()}`,
      major: '',
      year: 'Freshman',
      address: '',
      department: 'Engineering',
      joinDate: new Date().toISOString().split('T')[0],
      permissions: ['takeSurveys', 'viewNews', 'joinChat'],
      analytics: {
        surveysCompleted: 0,
        badgesEarned: 0,
        unreadMessages: 0
      }
    };

    // Save to registered users
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    await delay();

    return sanitizeUser(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const requestPasswordReset = async (email) => {
    const normalized = (email || '').trim();

    if (!normalized) {
      throw new Error('EMAIL_REQUIRED');
    }

    const match = PREDEFINED_USERS.find(
      (account) => account.email.toLowerCase() === normalized.toLowerCase()
    );

    await delay();

    if (!match) {
      throw new Error('USER_NOT_FOUND');
    }

    return {
      email: match.email,
      name: `${match.firstName} ${match.lastName}`
    };
  };

  const hasRole = (roles = []) => {
    if (!user) {
      return false;
    }

    if (!roles.length) {
      return true;
    }

    return roles.includes(user.role);
  };

  const value = {
    user,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
    requestPasswordReset,
    hasRole,
    credentialHints,
    roles: {
      ADMIN: 'admin',
      LECTURER: 'lecturer',
      STUDENT: 'student'
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

