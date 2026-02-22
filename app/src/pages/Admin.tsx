import { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  FileText,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Ban,
  CheckCircle,
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockStats = {
  totalUsers: 24589,
  activeUsers: 18234,
  newUsersToday: 156,
  totalSubscriptions: 8421,
  monthlyRevenue: 25347,
  totalRevenue: 456789,
};

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', plan: 'pro', status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', plan: 'free', status: 'active', joined: '2024-02-01' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', plan: 'teams', status: 'suspended', joined: '2023-12-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', plan: 'pro', status: 'active', joined: '2024-01-28' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', plan: 'free', status: 'active', joined: '2024-02-15' },
];

const mockSubscriptions = [
  { id: 1, user: 'John Doe', plan: 'Pro', amount: 3, interval: 'monthly', status: 'active', nextBilling: '2026-03-22' },
  { id: 2, user: 'Alice Williams', plan: 'Pro', amount: 28, interval: 'yearly', status: 'active', nextBilling: '2027-01-28' },
  { id: 3, user: 'Bob Johnson', plan: 'Teams', amount: 8, interval: 'monthly', status: 'cancelled', nextBilling: '-' },
];

// Admin Dashboard Overview
function AdminOverview() {
  const stats = [
    { label: 'Total Users', value: mockStats.totalUsers.toLocaleString(), change: '+12%', up: true, icon: Users },
    { label: 'Active Users', value: mockStats.activeUsers.toLocaleString(), change: '+8%', up: true, icon: Users },
    { label: 'Subscriptions', value: mockStats.totalSubscriptions.toLocaleString(), change: '+15%', up: true, icon: CreditCard },
    { label: 'Monthly Revenue', value: `$${mockStats.monthlyRevenue.toLocaleString()}`, change: '+23%', up: true, icon: TrendingUp },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-navy-100/50 border border-white/5 hover:border-cyan/30 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-cyan" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.up ? 'text-green-400' : 'text-red-400'}`}>
                {stat.up ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-sm text-text-secondary">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
          <div className="h-48 flex items-end justify-around gap-2">
            {[
              { month: 'Jan', value: 35 },
              { month: 'Feb', value: 45 },
              { month: 'Mar', value: 40 },
              { month: 'Apr', value: 55 },
              { month: 'May', value: 48 },
              { month: 'Jun', value: 62 },
              { month: 'Jul', value: 58 },
            ].map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full max-w-[40px] bg-gradient-to-t from-cyan/60 to-cyan rounded-t-lg"
                  style={{ height: `${item.value * 2}px` }}
                />
                <span className="text-xs text-text-secondary">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Revenue</h3>
          <div className="h-48 flex items-end justify-around gap-2">
            {[
              { month: 'Jan', value: 28 },
              { month: 'Feb', value: 35 },
              { month: 'Mar', value: 42 },
              { month: 'Apr', value: 38 },
              { month: 'May', value: 48 },
              { month: 'Jun', value: 55 },
              { month: 'Jul', value: 62 },
            ].map((item) => (
              <div key={item.month} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full max-w-[40px] bg-gradient-to-t from-green-500/60 to-green-400 rounded-t-lg"
                  style={{ height: `${item.value * 2}px` }}
                />
                <span className="text-xs text-text-secondary">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { action: 'New user registered', user: 'john@example.com', time: '2 min ago' },
            { action: 'Pro subscription purchased', user: 'jane@example.com', time: '5 min ago' },
            { action: 'User suspended', user: 'spam@example.com', time: '12 min ago' },
            { action: 'Teams plan upgraded', user: 'company@example.com', time: '18 min ago' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-200/50">
              <div>
                <p className="text-white">{item.action}</p>
                <p className="text-sm text-text-secondary">{item.user}</p>
              </div>
              <span className="text-sm text-text-secondary">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Users Management
function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-white">User Management</h3>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-xl bg-navy-100/50 border border-white/10 text-white placeholder:text-text-secondary focus:border-cyan focus:outline-none"
            />
          </div>
          <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full">
            Add User
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-3 px-4 text-text-secondary font-medium">User</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Plan</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Joined</th>
              <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-4 px-4">
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-sm text-text-secondary">{user.email}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                    user.plan === 'pro' ? 'bg-cyan/20 text-cyan' :
                    user.plan === 'teams' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-white/10 text-white'
                  }`}>
                    {user.plan}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                    user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-text-secondary">{user.joined}</td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-red-400">
                      <Ban className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Subscription Management
function SubscriptionManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Subscription Management</h3>
        <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full">
          Create Plan
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left py-3 px-4 text-text-secondary font-medium">User</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Plan</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Amount</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Status</th>
              <th className="text-left py-3 px-4 text-text-secondary font-medium">Next Billing</th>
              <th className="text-right py-3 px-4 text-text-secondary font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockSubscriptions.map((sub) => (
              <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-4 px-4 text-white">{sub.user}</td>
                <td className="py-4 px-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-cyan/20 text-cyan">
                    {sub.plan}
                  </span>
                </td>
                <td className="py-4 px-4 text-white">
                  ${sub.amount}/{sub.interval}
                </td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm capitalize ${
                    sub.status === 'active' ? 'bg-green-500/20 text-green-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-text-secondary">{sub.nextBilling}</td>
                <td className="py-4 px-4 text-right">
                  <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Plans */}
      <div className="pt-6">
        <h4 className="text-white font-semibold mb-4">Available Plans</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { name: 'Free', price: 0, features: ['Basic ad blocking', 'Standard filters'] },
            { name: 'Pro', price: 3, features: ['Advanced blocking', 'Custom filters', 'Priority support'] },
            { name: 'Teams', price: 8, features: ['Up to 5 users', 'Admin dashboard', 'SSO'] },
          ].map((plan) => (
            <div key={plan.name} className="p-5 rounded-2xl bg-navy-100/50 border border-white/5">
              <h5 className="text-white font-semibold mb-2">{plan.name}</h5>
              <p className="text-2xl font-bold text-cyan mb-4">
                ${plan.price}<span className="text-sm text-text-secondary">/month</span>
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle className="w-4 h-4 text-cyan" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Content Management
function ContentManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Content Management</h3>
        <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full">
          New Post
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h4 className="text-white font-semibold mb-4">Blog Posts</h4>
          <div className="space-y-3">
            {[
              { title: 'How to Block YouTube Ads', status: 'published', date: '2026-02-20' },
              { title: 'Privacy Tips for 2026', status: 'draft', date: '2026-02-18' },
              { title: 'New Features Announcement', status: 'published', date: '2026-02-15' },
            ].map((post, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-200/50">
                <div>
                  <p className="text-white">{post.title}</p>
                  <p className="text-sm text-text-secondary">{post.date}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs capitalize ${
                  post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {post.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h4 className="text-white font-semibold mb-4">FAQ Items</h4>
          <div className="space-y-3">
            {[
              { question: 'Does it block YouTube ads?', category: 'General' },
              { question: 'Will it break websites?', category: 'Technical' },
              { question: 'Do you collect browsing data?', category: 'Privacy' },
              { question: 'How do I cancel Pro?', category: 'Billing' },
            ].map((faq, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-200/50">
                <div>
                  <p className="text-white">{faq.question}</p>
                  <p className="text-sm text-text-secondary">{faq.category}</p>
                </div>
                <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-white">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Settings
function AdminSettings() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Admin Settings</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-white font-medium mb-4">General Settings</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">Site Name</label>
                <input
                  type="text"
                  defaultValue="AdBlock Pro"
                  className="w-full px-4 py-3 rounded-xl bg-navy-200/50 border border-white/10 text-white focus:border-cyan focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-2">Support Email</label>
                <input
                  type="email"
                  defaultValue="support@adblockpro.com"
                  className="w-full px-4 py-3 rounded-xl bg-navy-200/50 border border-white/10 text-white focus:border-cyan focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5">
            <h4 className="text-white font-medium mb-4">Security</h4>
            <div className="space-y-3">
              {[
                'Enable 2FA for admin accounts',
                'Require email verification',
                'Enable rate limiting',
              ].map((item) => (
                <label key={item} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/20 bg-navy-200 text-cyan focus:ring-cyan" />
                  <span className="text-text-secondary">{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full px-6">
              Save Changes
            </Button>
            <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '' },
  { icon: Users, label: 'Users', path: 'users' },
  { icon: CreditCard, label: 'Subscriptions', path: 'subscriptions' },
  { icon: FileText, label: 'Content', path: 'content' },
  { icon: SettingsIcon, label: 'Settings', path: 'settings' },
];

export function Admin() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    toast.success('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-navy-300">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-64 bg-navy-200 border-r border-white/5 z-50 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-cyan" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">Admin</span>
              <span className="block text-xs text-cyan">AdBlock Pro</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === `/admin/${item.path}` ||
                (item.path === '' && location.pathname === '/admin');
              return (
                <Link
                  key={item.label}
                  to={`/admin/${item.path}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-cyan/10 text-cyan border border-cyan/30'
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                  {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-text-secondary hover:text-red-400 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-navy-300/90 backdrop-blur-xl border-b border-white/5">
          <div className="flex items-center justify-between p-4 lg:p-6">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block">
              {sidebarItems.find((item) =>
                location.pathname === `/admin/${item.path}` ||
                (item.path === '' && location.pathname === '/admin')
              )?.label || 'Admin Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-cyan/20 text-cyan text-sm">
                Super Admin
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="subscriptions" element={<SubscriptionManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}