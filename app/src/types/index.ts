// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin' | 'superadmin';
  plan: 'free' | 'pro' | 'teams';
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  stats?: UserStats;
}

export interface UserStats {
  adsBlocked: number;
  trackersBlocked: number;
  dataSaved: string;
  timeSaved: string;
  lastUpdated: string;
}

// Subscription Types
export interface Subscription {
  id: string;
  userId: string;
  plan: 'free' | 'pro' | 'teams';
  status: 'active' | 'cancelled' | 'expired' | 'pending';
  startDate: string;
  endDate: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  paymentMethod?: string;
  invoices: Invoice[];
}

export interface Invoice {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  status: 'paid' | 'pending' | 'failed';
  createdAt: string;
  paidAt?: string;
  pdfUrl?: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  yearlyPrice: number;
  currency: string;
  features: string[];
  isPopular?: boolean;
}

// Dashboard Types
export interface DashboardStats {
  totalAdsBlocked: number;
  totalTrackersBlocked: number;
  websitesProtected: number;
  dataSaved: string;
  timeSaved: string;
  dailyStats: DailyStat[];
}

export interface DailyStat {
  date: string;
  adsBlocked: number;
  trackersBlocked: number;
}

// Filter Types
export interface Filter {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  type: 'custom' | 'builtin';
  rulesCount: number;
  lastUpdated: string;
}

export interface WhitelistItem {
  id: string;
  domain: string;
  enabled: boolean;
  addedAt: string;
}

// Admin Types
export interface AdminDashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalSubscriptions: number;
  monthlyRevenue: number;
  totalRevenue: number;
  recentUsers: User[];
  recentSubscriptions: Subscription[];
}

// Content Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  tags: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

// Settings Types
export interface UserSettings {
  notifications: {
    email: boolean;
    browser: boolean;
    weeklyReport: boolean;
  };
  privacy: {
    blockTrackers: boolean;
    hideReferrers: boolean;
    blockWebRTC: boolean;
    fingerprintDefense: boolean;
  };
  appearance: {
    theme: 'dark' | 'light' | 'system';
    language: string;
  };
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
