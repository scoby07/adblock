import { useState } from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Shield,
  Filter,
  BarChart3,
  Settings as SettingsIcon,
  CreditCard,
  LogOut,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Dashboard sub-pages
function Overview() {
  const { user } = useAuth();
  const stats = [
    { label: 'Ads Blocked', value: user?.stats?.adsBlocked.toLocaleString() || '0', icon: Shield },
    { label: 'Trackers Blocked', value: user?.stats?.trackersBlocked.toLocaleString() || '0', icon: Filter },
    { label: 'Data Saved', value: user?.stats?.dataSaved || '0 GB', icon: BarChart3 },
    { label: 'Time Saved', value: user?.stats?.timeSaved || '0 hours', icon: LayoutDashboard },
  ];

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="p-5 rounded-2xl bg-navy-100/50 border border-white/5 hover:border-cyan/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan/20 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-cyan" />
              </div>
              <span className="text-sm text-text-secondary">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { site: 'youtube.com', blocked: 12, time: '2 min ago' },
              { site: 'reddit.com', blocked: 8, time: '5 min ago' },
              { site: 'news.example.com', blocked: 15, time: '12 min ago' },
              { site: 'blog.tech.com', blocked: 6, time: '18 min ago' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 rounded-xl bg-navy-200/50"
              >
                <div>
                  <p className="text-white font-medium">{item.site}</p>
                  <p className="text-sm text-text-secondary">{item.blocked} items blocked</p>
                </div>
                <span className="text-sm text-text-secondary">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
          <h3 className="text-lg font-semibold text-white mb-4">Protection Status</h3>
          <div className="space-y-4">
            {[
              { label: 'Ad Blocking', status: true },
              { label: 'Tracker Blocking', status: true },
              { label: 'Fingerprint Defense', status: true },
              { label: 'WebRTC Shield', status: false },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-text-secondary">{item.label}</span>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.status
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}
                >
                  {item.status ? 'Active' : 'Inactive'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Privacy() {
  const [toggles, setToggles] = useState({
    blockTrackers: true,
    hideReferrers: true,
    blockWebRTC: false,
    fingerprintDefense: true,
    blockCookies: false,
    httpsOnly: true,
  });

  const handleToggle = (key: keyof typeof toggles) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }));
    toast.success('Setting updated');
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-2">Privacy Settings</h3>
        <p className="text-text-secondary mb-6">Control how sites track and identify you</p>

        <div className="space-y-4">
          {[
            { key: 'blockTrackers', label: 'Block trackers', description: 'Stop analytics and ad beacons' },
            { key: 'hideReferrers', label: 'Hide referrers', description: 'Prevent sites from seeing where you came from' },
            { key: 'blockWebRTC', label: 'Block WebRTC', description: 'Prevent IP leaks during video calls' },
            { key: 'fingerprintDefense', label: 'Fingerprint defense', description: 'Reduce identifiable browser signals' },
            { key: 'blockCookies', label: 'Block third-party cookies', description: 'Prevent cross-site tracking' },
            { key: 'httpsOnly', label: 'HTTPS only', description: 'Force secure connections' },
          ].map((item) => (
            <div
              key={item.key}
              className="flex items-center justify-between p-4 rounded-xl bg-navy-200/50 hover:bg-navy-200 transition-colors"
            >
              <div>
                <p className="text-white font-medium">{item.label}</p>
                <p className="text-sm text-text-secondary">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key as keyof typeof toggles)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${
                  toggles[item.key as keyof typeof toggles] ? 'bg-cyan' : 'bg-white/20'
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                    toggles[item.key as keyof typeof toggles] ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Filters() {
  const [filters] = useState([
    { name: 'EasyList', enabled: true, rules: 85000, type: 'built-in' },
    { name: 'EasyPrivacy', enabled: true, rules: 25000, type: 'built-in' },
    { name: 'Fanboy Annoyances', enabled: false, rules: 15000, type: 'built-in' },
    { name: 'Custom Filters', enabled: true, rules: 120, type: 'custom' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filter Lists</h3>
        <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full">
          Add Filter List
        </Button>
      </div>

      <div className="space-y-3">
        {filters.map((filter) => (
          <div
            key={filter.name}
            className="flex items-center justify-between p-4 rounded-xl bg-navy-100/50 border border-white/5"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="text-white font-medium">{filter.name}</p>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    filter.type === 'built-in'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}
                >
                  {filter.type}
                </span>
              </div>
              <p className="text-sm text-text-secondary">{filter.rules.toLocaleString()} rules</p>
            </div>
            <div
              className={`w-12 h-6 rounded-full flex items-center px-1 transition-all duration-300 ${
                filter.enabled ? 'bg-cyan' : 'bg-white/20'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  filter.enabled ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stats() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Blocking Statistics</h3>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Ads Blocked', value: '154,320' },
            { label: 'Total Trackers Blocked', value: '89,340' },
            { label: 'Websites Protected', value: '2,847' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 rounded-xl bg-navy-200/50">
              <p className="text-2xl font-bold text-cyan mb-1">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="h-64 flex items-end justify-around gap-2">
          {[
            { day: 'Mon', value: 45 },
            { day: 'Tue', value: 62 },
            { day: 'Wed', value: 38 },
            { day: 'Thu', value: 75 },
            { day: 'Fri', value: 55 },
            { day: 'Sat', value: 82 },
            { day: 'Sun', value: 68 },
          ].map((item) => (
            <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
              <div
                className="w-full max-w-[40px] bg-gradient-to-t from-cyan/60 to-cyan rounded-t-lg transition-all duration-500"
                style={{ height: `${item.value * 2}px` }}
              />
              <span className="text-xs text-text-secondary">{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Settings() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-6">Account Settings</h3>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-text-secondary mb-2">Display Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-4 py-3 rounded-xl bg-navy-200/50 border border-white/10 text-white focus:border-cyan focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">Email</label>
            <input
              type="email"
              defaultValue="john@example.com"
              className="w-full px-4 py-3 rounded-xl bg-navy-200/50 border border-white/10 text-white focus:border-cyan focus:outline-none"
            />
          </div>

          <div className="pt-4 border-t border-white/5">
            <h4 className="text-white font-medium mb-4">Notifications</h4>
            <div className="space-y-3">
              {[
                'Weekly summary email',
                'Security alerts',
                'Product updates',
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

function Subscription() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Current Plan</h3>
            <p className="text-text-secondary">Manage your subscription</p>
          </div>
          <div className="px-4 py-2 rounded-full bg-cyan/20 text-cyan font-semibold">
            Pro Plan
          </div>
        </div>

        <div className="p-4 rounded-xl bg-navy-200/50 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary">Billing Cycle</span>
            <span className="text-white">Monthly</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-text-secondary">Next Billing Date</span>
            <span className="text-white">March 22, 2026</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Amount</span>
            <span className="text-white">$3.00/month</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button className="bg-cyan hover:bg-cyan-600 text-navy rounded-full px-6">
            Upgrade Plan
          </Button>
          <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full">
            Cancel Subscription
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-navy-100/50 border border-white/5">
        <h3 className="text-lg font-semibold text-white mb-4">Billing History</h3>
        <div className="space-y-3">
          {[
            { date: 'Feb 22, 2026', amount: '$3.00', status: 'Paid' },
            { date: 'Jan 22, 2026', amount: '$3.00', status: 'Paid' },
            { date: 'Dec 22, 2025', amount: '$3.00', status: 'Paid' },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-navy-200/50">
              <div>
                <p className="text-white">{invoice.date}</p>
                <p className="text-sm text-text-secondary">Pro Plan - Monthly</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-white">{invoice.amount}</span>
                <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                  {invoice.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '' },
  { icon: Shield, label: 'Privacy', path: 'privacy' },
  { icon: Filter, label: 'Filters', path: 'filters' },
  { icon: BarChart3, label: 'Stats', path: 'stats' },
  { icon: CreditCard, label: 'Subscription', path: 'subscription' },
  { icon: SettingsIcon, label: 'Settings', path: 'settings' },
];

export function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
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
              <Shield className="w-5 h-5 text-cyan" />
            </div>
            <span className="text-xl font-bold text-white">AdBlock Pro</span>
          </Link>

          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === `/dashboard/${item.path}` ||
                (item.path === '' && location.pathname === '/dashboard');
              return (
                <Link
                  key={item.label}
                  to={`/dashboard/${item.path}`}
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
          <div className="flex items-center gap-3 mb-4">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-10 h-10 rounded-full bg-navy-100"
            />
            <div>
              <p className="text-white font-medium">{user?.name}</p>
              <p className="text-sm text-text-secondary">{user?.plan} Plan</p>
            </div>
          </div>
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
                location.pathname === `/dashboard/${item.path}` ||
                (item.path === '' && location.pathname === '/dashboard')
              )?.label || 'Dashboard'}
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-text-secondary hidden sm:block">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="p-4 lg:p-6">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="filters" element={<Filters />} />
            <Route path="stats" element={<Stats />} />
            <Route path="settings" element={<Settings />} />
            <Route path="subscription" element={<Subscription />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
