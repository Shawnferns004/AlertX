import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  Tooltip, XAxis, YAxis, CartesianGrid, Legend,
  ResponsiveContainer, Cell
} from "recharts";
import { 
  AlertTriangle, 
  Clock, 
  TrendingUp, 
  Activity,
  BarChart2,
  Shield
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "./Footer";

const AnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reports")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setLoading(false);
      });
  }, []);

  const colors = {
    primary: "#6366f1",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    info: "#3b82f6",
    neutral: "#64748b",
  };

  const chartColors = [
    "#6366f1",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#64748b",
  ];

  const getCounts = (field) => {
    const counts = data.reduce((acc, report) => {
      acc[report[field]] = (acc[report[field]] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([key, value], index) => ({
      name: key,
      value,
      color: chartColors[index % chartColors.length],
    }));
  };

  const StatCard = ({ title, value, icon: Icon, color, trend, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-200 border border-gray-100"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="text-xl sm:text-2xl font-bold mt-2 text-gray-900"
          >
            {value}
          </motion.p>
          {trend && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
              className={`text-xs sm:text-sm mt-2 flex items-center gap-1 ${
                trend >= 0 ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
              <span className="text-gray-500 text-xs hidden sm:inline">vs last period</span>
            </motion.p>
          )}
        </div>
        <motion.div
          className={`p-2 sm:p-3 rounded-lg bg-${color}-100`}
        >
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 text-${color}-600`} />
        </motion.div>
      </div>
    </motion.div>
  );

  const ChartContainer = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 flex items-center gap-2"
      >
        <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
        {title}
      </motion.h3>
      {children}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6 lg:p-8 "
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">Real-time overview of incident reports and trends</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Total Reports"
          value={data.length}
          icon={BarChart2}
          color="indigo"
          trend={12}
          index={0}
        />
        <StatCard
          title="Average Priority"
          value={`P${Math.round(
            data.reduce((acc, curr) => acc + parseInt(curr.priority.slice(1)), 0) /
              data.length
          )}`}
          icon={Clock}
          color="emerald"
          trend={-5}
          index={1}
        />
        <StatCard
          title="Critical Issues"
          value={data.filter((item) => item.severity === "Critical").length}
          icon={AlertTriangle}
          color="red"
          trend={8}
          index={2}
        />
        <StatCard
          title="Resolution Rate"
          value="94%"
          icon={TrendingUp}
          color="blue"
          trend={3}
          index={3}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-white p-4 sm:p-6 rounded-xl shadow-lg border border-gray-100 mb-6 sm:mb-8"
      >
        <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-gray-900 flex items-center gap-2">
          <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          Top Issues by Type
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {getCounts("type")
            .sort((a, b) => b.value - a.value)
            .slice(0, 3)
            .map((issue, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-600 mr-3" />
                <div>
                  <p className="font-semibold text-sm sm:text-base text-gray-900">{issue.name}</p>
                  <p className="text-xs sm:text-sm text-gray-600">{issue.value} incidents</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <ChartContainer title="Severity Distribution">
          <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={getCounts("severity")}
                margin={{ 
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name"
                  tick={{ fill: "#64748b", fontSize: windowWidth < 640 ? 12 : 14 }}
                />
                <YAxis 
                  tick={{ fill: "#64748b", fontSize: windowWidth < 640 ? 12 : 14 }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <Legend wrapperStyle={{ fontSize: windowWidth < 640 ? 12 : 14 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1500}>
                  {getCounts("severity").map((entry, index) => (
                    <Cell key={index} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>

        <ChartContainer title="Priority Distribution">
          <div className="h-[250px] sm:h-[300px] md:h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCounts("priority")}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={windowWidth < 640 ? 80 : 120}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={true}
                  animationDuration={1500}
                >
                  {getCounts("priority").map((entry, index) => (
                    <Cell key={index} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <Legend 
                  wrapperStyle={{ 
                    fontSize: windowWidth < 640 ? 12 : 14,
                    paddingTop: windowWidth < 640 ? 20 : 40
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartContainer>
      </div>

      <ChartContainer title="Incident Types Distribution">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="h-[300px] sm:h-[400px] md:h-[500px] w-full px-2 sm:px-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={getCounts("type")}
                margin={{ 
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ 
                    fill: "#64748b",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <YAxis
                  tick={{ 
                    fill: "#64748b",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <Legend wrapperStyle={{ fontSize: windowWidth < 640 ? 12 : 14 }} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]} animationDuration={1200}>
                  {getCounts("type").map((entry, index) => (
                    <Cell key={index} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
      <Footer/>
    </motion.div>
  );
};

export default AnalyticsDashboard;