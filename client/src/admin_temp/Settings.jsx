import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  User,
  Globe,
  Moon,
  Sun,
  Palette,
  Shield,
  Mail,
  Smartphone,
  Eye,
  BellRing,
  Save,
  X,
  Check,
  AlertCircle,
  Camera,
  Upload,
  Edit,
  Trash2,
  Key,
  CreditCard,
  Building2,
  UserPlus,
  Users,
  Search,
  Menu,
  Home,
  BarChart2,
  MessageSquare,
  LogOut,
  Plus,
  DollarSign,
  Calendar,
  Download,
  FileText,
  Clock,
  BellOff
} from 'lucide-react';

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Globe className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Acme Inc</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <Home className="h-4 w-4 mr-2" />
                Dashboard
              </a>
              <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <SettingsIcon className="h-4 w-4 mr-2" />
                Settings
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <BarChart2 className="h-4 w-4 mr-2" />
                Analytics
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <MessageSquare className="h-4 w-4 mr-2" />
                Messages
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
              <Bell className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="flex items-center space-x-3 focus:outline-none">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
              </button>
            </div>
            <button className="p-2 text-gray-500 hover:text-gray-600 focus:outline-none">
              <LogOut className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden"
          >
            <div className="pt-2 pb-3 space-y-1">
              <a href="#" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 text-base font-medium">
                <Home className="h-5 w-5 inline-block mr-2" />
                Dashboard
              </a>
              <a href="#" className="bg-indigo-50 text-indigo-700 block px-3 py-2 text-base font-medium">
                <SettingsIcon className="h-5 w-5 inline-block mr-2" />
                Settings
              </a>
              <a href="#" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 text-base font-medium">
                <BarChart2 className="h-5 w-5 inline-block mr-2" />
                Analytics
              </a>
              <a href="#" className="text-gray-500 hover:bg-gray-50 block px-3 py-2 text-base font-medium">
                <MessageSquare className="h-5 w-5 inline-block mr-2" />
                Messages
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">John Doe</div>
                  <div className="text-sm font-medium text-gray-500">john.doe@example.com</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc',
    role: 'Developer',
    bio: 'Full-stack developer with a passion for building great user experiences.',
    phone: '+1 (555) 123-4567'
  });

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'team', label: 'Team', icon: Users }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Bell className="h-5 w-5 text-indigo-600" />
                  Notification Preferences
                </h2>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive updates and alerts via email</p>
                  </div>
                  <button
                    onClick={() => setEmailNotifications(!emailNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        emailNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Push Notifications</h3>
                    <p className="text-sm text-gray-500">Get real-time notifications on your device</p>
                  </div>
                  <button
                    onClick={() => setPushNotifications(!pushNotifications)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pushNotifications ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Notification Categories</h3>
                  <div className="space-y-4">
                    {[
                      { icon: MessageSquare, label: 'Messages', description: 'When you receive a new message' },
                      { icon: UserPlus, label: 'Team Updates', description: 'When team members are added or removed' },
                      { icon: Calendar, label: 'Calendar', description: 'For upcoming meetings and events' },
                      { icon: FileText, label: 'Documents', description: 'When documents are shared with you' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <item.icon className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            index % 2 === 0
                              ? 'bg-indigo-100 text-indigo-700'
                              : 'bg-gray-200 text-gray-700'
                          }`}
                        >
                          {index % 2 === 0 ? 'Enabled' : 'Disabled'}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'billing':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-indigo-600" />
                  Billing & Subscription
                </h2>
              </div>
              <div className="p-6">
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Current Plan</h3>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                      Pro Plan
                    </span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">$49<span className="text-sm text-gray-500">/month</span></p>
                        <p className="text-sm text-gray-500">Next billing date: March 1, 2024</p>
                      </div>
                      <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                        Upgrade Plan
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { icon: Users, label: '10 Team Members' },
                        { icon: Download, label: 'Unlimited Downloads' },
                        { icon: Clock, label: '24/7 Support' }
                      ].map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <feature.icon className="h-4 w-4 text-indigo-600" />
                          <span className="text-sm text-gray-700">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-white rounded-lg">
                        <CreditCard className="h-5 w-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/24</p>
                      </div>
                    </div>
                    <button className="text-indigo-600 hover:text-indigo-700">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                  <button className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Payment Method
                  </button>
                </div>
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Billing History</h3>
                  <div className="space-y-4">
                    {[
                      { date: 'Feb 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'Jan 1, 2024', amount: '$49.00', status: 'Paid' },
                      { date: 'Dec 1, 2023', amount: '$49.00', status: 'Paid' }
                    ].map((invoice, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{invoice.date}</p>
                          <p className="text-sm text-gray-500">{invoice.amount}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            {invoice.status}
                          </span>
                          <button className="text-gray-500 hover:text-gray-700">
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'team':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-600" />
                    Team Members
                  </h2>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Invite Member
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      name: 'Sarah Wilson',
                      role: 'Product Designer',
                      email: 'sarah@example.com',
                      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    },
                    {
                      name: 'Michael Chen',
                      role: 'Frontend Developer',
                      email: 'michael@example.com',
                      image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    },
                    {
                      name: 'Emma Rodriguez',
                      role: 'UX Researcher',
                      email: 'emma@example.com',
                      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-500">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                          {member.role}
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Invitations</h3>
                  <div className="space-y-4">
                    {[
                      { email: 'alex@example.com', role: 'Backend Developer', sent: '2 days ago' },
                      { email: 'lisa@example.com', role: 'Project Manager', sent: '5 days ago' }
                    ].map((invitation, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{invitation.email}</p>
                          <p className="text-sm text-gray-500">
                            {invitation.role} • Sent {invitation.sent}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300 transition-colors">
                            Resend
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">{formData.firstName} {formData.lastName}</h3>
                  <p className="text-sm text-gray-500">{formData.role}</p>
                </div>
                <div className="mt-6 space-y-1">
                  {tabs.map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <tab.icon className="h-5 w-5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'general' && (
              /* Profile Section */
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <User className="h-5 w-5 text-indigo-600" />
                    Profile Information
                  </h2>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
              
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-indigo-600" />
                    Security Settings
                  </h2>
                </div>
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
                      <Key className="h-4 w-4" />
                      Enable
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-500">Last changed 3 months ago</p>
                    </div>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Change
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {renderTabContent()}

            {/* Save Button */}
            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                <Save className="h-4 w-4" />
                Save Changes
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Save Notification */}
      <AnimatePresence>
        {showSaveNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-20 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center"
          >
            <Check className="h-5 w-5 mr-2" />
            Settings saved successfully!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;