import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  FileText,
  Heart,
  Mail,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Search,
  Bell,
  BookOpen,
  MessageSquare,
  ArrowRight,
  ChevronDown,
  Zap,
  BarChart,
  HelpCircle,
  Download,
  Calendar,
  Video,
  Bookmark,
  Star,
  Coffee,
  Award,
  Lightbulb,
  Target,
  Plus,
  Minus,
  ArrowUpRight,
  Layers,
  Settings,
  LifeBuoy
} from 'lucide-react';
import Footer from './Footer';

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const sections = [
    {
      title: 'Incident Classification',
      icon: AlertCircle,
      description: 'Learn about different incident levels and their characteristics',
      content: [
        {
          subtitle: 'Priority Levels',
          items: [
            { label: 'P1 - Critical', desc: 'Service outage affecting all users', color: 'red' },
            { label: 'P2 - High', desc: 'Major functionality impacted', color: 'orange' },
            { label: 'P3 - Medium', desc: 'Minor feature unavailable', color: 'yellow' },
            { label: 'P4 - Low', desc: 'Cosmetic issues', color: 'green' },
          ],
        },
        {
          subtitle: 'Severity Levels',
          items: [
            { label: 'Critical', desc: 'Business-critical system down', color: 'red' },
            { label: 'Major', desc: 'Significant impact to business operations', color: 'orange' },
            { label: 'Minor', desc: 'Limited impact on operations', color: 'yellow' },
            { label: 'Low', desc: 'Minimal or no impact', color: 'green' },
          ],
        },
      ],
    },
    {
      title: 'Response Times',
      icon: Clock,
      description: 'Standard response and resolution timeframes',
      content: [
        {
          subtitle: 'Initial Response',
          items: [
            { label: 'P1', desc: '15 minutes', color: 'red' },
            { label: 'P2', desc: '30 minutes', color: 'orange' },
            { label: 'P3', desc: '2 hours', color: 'yellow' },
            { label: 'P4', desc: '1 business day', color: 'green' },
          ],
        },
        {
          subtitle: 'Resolution Target',
          items: [
            { label: 'P1', desc: '2 hours', color: 'red' },
            { label: 'P2', desc: '4 hours', color: 'orange' },
            { label: 'P3', desc: '24 hours', color: 'yellow' },
            { label: 'P4', desc: '5 business days', color: 'green' },
          ],
        },
      ],
    },
    {
      title: 'Escalation Procedures',
      icon: Users,
      description: 'Step-by-step guide for escalating incidents',
      content: [
        {
          subtitle: 'Level 1',
          desc: 'Initial support team handles the incident',
          steps: [
            'Incident logged and categorized',
            'Basic troubleshooting performed',
            'Resolution attempted within SLA',
          ]
        },
        {
          subtitle: 'Level 2',
          desc: 'Technical specialists investigate complex issues',
          steps: [
            'Detailed technical analysis',
            'Advanced troubleshooting',
            'Solution implementation',
          ]
        },
        {
          subtitle: 'Level 3',
          desc: 'Senior engineers and architects handle critical problems',
          steps: [
            'Root cause analysis',
            'System-wide impact assessment',
            'Strategic solution design',
          ]
        },
        {
          subtitle: 'Management',
          desc: 'Executive team involved for business-impacting incidents',
          steps: [
            'Stakeholder communication',
            'Resource allocation',
            'Business continuity planning',
          ]
        },
      ],
    },
  ];

  const featuredArticles = [
    {
      title: "Getting Started Guide",
      description: "Essential steps to begin your journey",
      icon: Lightbulb,
      color: "indigo",
      readTime: "5 min read"
    },
    {
      title: "Best Practices",
      description: "Recommended approaches and patterns",
      icon: Star,
      color: "purple",
      readTime: "10 min read"
    },
    {
      title: "Advanced Concepts",
      description: "Deep dive into complex topics",
      icon: Target,
      color: "blue",
      readTime: "15 min read"
    }
  ];

  const stats = [
    { label: "Documentation Pages", value: "200+", icon: FileText },
    { label: "Video Tutorials", value: "50+", icon: Video },
    { label: "Active Users", value: "10k+", icon: Users },
    { label: "Updates This Month", value: "25", icon: Clock }
  ];

  const faqs = [
    {
      question: "How do I get started with the platform?",
      answer: "Begin by reviewing our Getting Started Guide which covers the basic concepts and setup process. You can also schedule an onboarding call with our team for personalized guidance."
    },
    {
      question: "What are the system requirements?",
      answer: "Our platform is cloud-based and works with any modern web browser. We recommend using the latest versions of Chrome, Firefox, Safari, or Edge for the best experience."
    },
    {
      question: "How do I report an incident?",
      answer: "Use our incident reporting system accessible from the dashboard. Select the appropriate severity level, provide detailed information about the issue, and our team will respond according to the SLA."
    },
    {
      question: "What support options are available?",
      answer: "We offer multiple support channels including 24/7 live chat, email support, phone support for critical issues, and an extensive knowledge base. Enterprise customers also get dedicated support managers."
    },
    {
      question: "How do I access the API documentation?",
      answer: "API documentation is available in our Developer Portal. You'll need to sign in with your developer account to access the complete API reference, code samples, and testing tools."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2" />
            Documentation updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 flex items-center gap-3 mb-3">
              <BookOpen className="h-10 w-10 text-indigo-600" />
              Documentation Hub
            </h1>
            <p className="text-xl text-gray-600">
              Your comprehensive guide to mastering our platform
            </p>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:flex-none">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 pl-10 pr-4 py-2 rounded-lg border-2 border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <button
              onClick={() => {
                setShowNotification(true);
                setTimeout(() => setShowNotification(false), 3000);
              }}
              className="p-2 rounded-lg bg-white border-2 border-gray-200 hover:border-indigo-500 transition-colors"
            >
              <Bell className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="gradient-border p-6"
            >
              <stat.icon className="h-8 w-8 text-indigo-600 mb-3" />
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Main Documentation Grid */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Layers className="h-6 w-6 text-indigo-600" />
            Documentation Sections
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <motion.div
                key={section.title}
                whileHover={{ scale: 1.01 }}
                className="doc-card group"
              >
                <div className="doc-card-header">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-white shadow-sm">
                      <section.icon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 flex items-center gap-2">
                        {section.title}
                        <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h3>
                      <p className="text-gray-600">{section.description}</p>
                    </div>
                  </div>
                </div>
                <div className="doc-card-content">
                  <div className="space-y-4">
                    {section.content.map((subsection, idx) => (
                      <div key={idx}>
                        <h4 className="font-medium text-gray-900 mb-3">{subsection.subtitle}</h4>
                        {subsection.items ? (
                          <div className="grid gap-2">
                            {subsection.items.slice(0, 2).map((item, itemIdx) => (
                              <div
                                key={itemIdx}
                                className="doc-item"
                              >
                                <div className={`p-2 rounded-lg bg-${item.color}-100`}>
                                  <CheckCircle className={`h-4 w-4 text-${item.color}-600`} />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{item.label}</div>
                                  <div className="text-sm text-gray-600">{item.desc}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="doc-item">
                            <div className="p-2 rounded-lg bg-indigo-100">
                              <Settings className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">{subsection.desc}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    <button className="w-full mt-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center justify-center gap-2">
                      View Full Section
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Star className="h-6 w-6 text-indigo-600" />
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredArticles.map((article, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-white border border-gray-200 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all"
              >
                <article.icon className={`h-8 w-8 text-${article.color}-600 mb-4`} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="h-4 w-4 mr-2" />
                  {article.readTime}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <HelpCircle className="h-6 w-6 text-indigo-600" />
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-xl bg-white border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {activeFaq === index ? (
                    <Minus className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <Plus className="h-5 w-5 text-indigo-600" />
                  )}
                </button>
                <AnimatePresence>
                  {activeFaq === index && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 text-gray-600">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Access */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#"
            className="p-6 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 text-white group"
          >
            <Download className="h-6 w-6 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Complete Guide</h3>
            <p className="text-indigo-200 text-sm">Download PDF version</p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#"
            className="p-6 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white group"
          >
            <MessageSquare className="h-6 w-6 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Live Support</h3>
            <p className="text-purple-200 text-sm">Chat with experts</p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#"
            className="p-6 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white group"
          >
            <Video className="h-6 w-6 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Video Tutorials</h3>
            <p className="text-blue-200 text-sm">Learn by watching</p>
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.02 }}
            href="#"
            className="p-6 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white group"
          >
            <LifeBuoy className="h-6 w-6 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-lg font-semibold mb-1">Help Center</h3>
            <p className="text-emerald-200 text-sm">Browse articles</p>
          </motion.a>
        </div>
      </div>


      <footer className="bg-gray-900 text-white py-12 mt-8 w-full rounded-t-3xl">
        <div className="w-full px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Emergency Response</h3>
              <p className="text-gray-400">Protecting communities, saving lives.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Heart className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Emergency Response. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Documentation;