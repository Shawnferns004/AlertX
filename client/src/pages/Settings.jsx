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
  BellOff,
  Briefcase,
  MapPin,
  Link,
  Twitter,
  Github,
  Linkedin,
} from 'lucide-react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    company: 'Acme Inc',
    role: 'Senior Software Engineer',
    bio: 'Full-stack developer with a passion for building great user experiences and scalable systems. Experienced in React, Node.js, and cloud technologies.',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    twitter: '@johndoe',
    github: 'johndoe',
    linkedin: 'john-doe',
  });

  const handleSave = () => {
    setShowSaveNotification(true);
    setTimeout(() => setShowSaveNotification(false), 3000);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const tabs = [
    { id: 'general', label: 'General', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'appearance', label: 'Appearance', icon: Palette },
  ];

  const renderAppearanceTab = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Palette className="h-5 w-5 text-indigo-600" />
            Appearance Settings
          </h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Dark Mode</h3>
              <p className="text-sm text-gray-500">Toggle dark mode for better viewing at night</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">Theme Preview</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg ${
                  darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
                } border border-gray-200`}
              >
                <h4 className="font-medium mb-2">Light/Dark Preview</h4>
                <p className="text-sm opacity-75">See how your content looks in different modes</p>
              </div>
              <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <h4 className="font-medium mb-2">Accent Colors</h4>
                <p className="text-sm opacity-75">Your current theme colors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

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
                      { icon: FileText, label: 'Documents', description: 'When documents are shared with you' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg shadow-sm">
                            <item.icon className="h-5 w-5 text-indigo-600" />
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                            <p className="text-sm text-gray-500">{item.description}</p>
                          </div>
                        </div>
                        <button
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            index % 2 === 0
                              ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
      case 'appearance':
        return renderAppearanceTab();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div
            className={`fixed lg:relative lg:block z-40 w-64 flex-shrink-0 transition-transform duration-300 transform ${
              sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
          >
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-24">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-2 border-indigo-600 group-hover:border-indigo-700 transition-colors"
                    />
                    <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h3 className="mt-4 font-semibold text-gray-900">
                    {formData.firstName} {formData.lastName}
                  </h3>
                  <p className="text-sm text-gray-500">{formData.role}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <a
                      href={`https://twitter.com/${formData.twitter}`}
                      className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://github.com/${formData.github}`}
                      className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://linkedin.com/in/${formData.linkedin}`}
                      className="p-1.5 text-gray-500 hover:text-indigo-600 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
                <div className="mt-6 space-y-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? 'bg-indigo-600 text-white shadow-md'
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
          <div className="flex-1 lg:pl-8">
            {activeTab === 'general' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                {/* Profile Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <User className="h-5 w-5 text-indigo-600" />
                        Profile Information
                      </h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.firstName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.lastName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.phone}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.company}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => handleInputChange('role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.role}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.location}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleInputChange('website', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.website}</p>
                      )}
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      {isEditing ? (
                        <textarea
                          value={formData.bio}
                          onChange={(e) => handleInputChange('bio', e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                      ) : (
                        <p className="w-full px-3 py-2 text-gray-900">{formData.bio}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                      <Link className="h-5 w-5 text-indigo-600" />
                      Social Links
                    </h2>
                  </div>
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Twitter</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <Twitter className="h-4 w-4" />
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.twitter}
                            onChange={(e) => handleInputChange('twitter', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        ) : (
                          <p className="w-full pl-10 pr-3 py-2 text-gray-900">{formData.twitter}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <Github className="h-4 w-4" />
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.github}
                            onChange={(e) => handleInputChange('github', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        ) : (
                          <p className="w-full pl-10 pr-3 py-2 text-gray-900">{formData.github}</p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                          <Linkedin className="h-4 w-4" />
                        </span>
                        {isEditing ? (
                          <input
                            type="text"
                            value={formData.linkedin}
                            onChange={(e) => handleInputChange('linkedin', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        ) : (
                          <p className="w-full pl-10 pr-3 py-2 text-gray-900">{formData.linkedin}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        {[
                          { icon: Lock, label: 'Password changed', date: '2 days ago', location: 'San Francisco, CA' },
                          { icon: User, label: 'Profile updated', date: '1 week ago', location: 'New York, NY' },
                          { icon: Globe, label: 'New login', date: '2 weeks ago', location: 'London, UK' },
                        ].map((item, index) => (
                          <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                              <item.icon className="h-5 w-5 text-indigo-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">{item.label}</h4>
                              <p className="text-sm text-gray-500">
                                {item.date} • {item.location}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-indigo-700 transition-colors shadow-sm"
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