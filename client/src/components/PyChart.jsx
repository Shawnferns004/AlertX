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
      .get("http://localhost:3000/api/reports")
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
      className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg duration-200 hover:shadow-xl sm:p-6 transition-all"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-600 text-xs font-medium sm:text-sm">{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="text-gray-900 text-xl font-bold mt-2 sm:text-2xl"
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
      className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg sm:p-6"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex text-base text-gray-900 font-semibold gap-2 items-center mb-4 sm:mb-6 sm:text-lg"
      >
        <Shield className="h-4 text-indigo-600 w-4 sm:h-5 sm:w-5" />
        {title}
      </motion.h3>
      {children}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex bg-gray-50 h-screen justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="border-b-2 border-indigo-600 h-8 rounded-full w-8 sm:h-12 sm:w-12"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-3 lg:p-8 md:p-6 min-h-screen sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-gray-900 text-xl font-bold md:text-3xl sm:text-2xl">Analytics Dashboard</h1>
        <p className="text-gray-600 text-sm mt-2 sm:text-base">Real-time overview of incident reports and trends</p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-6 md:gap-6 sm:gap-4 sm:mb-8">
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
        className="bg-white border border-gray-100 p-4 rounded-xl shadow-lg mb-6 sm:mb-8 sm:p-6"
      >
        <h3 className="flex text-base text-gray-900 font-semibold gap-2 items-center mb-4 sm:mb-6 sm:text-lg">
          <Activity className="h-4 text-indigo-600 w-4 sm:h-5 sm:w-5" />
          Top Issues by Type
        </h3>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 sm:gap-4 sm:grid-cols-2">
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
                className="flex bg-gray-50 border border-gray-100 p-3 rounded-lg items-center sm:p-4"
              >
                <Activity className="h-6 text-indigo-600 w-6 mr-3 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-gray-900 text-sm font-semibold sm:text-base">{issue.name}</p>
                  <p className="text-gray-600 text-xs sm:text-sm">{issue.value} incidents</p>
                </div>
              </motion.div>
            ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-6 sm:gap-6 sm:mb-8">
        <ChartContainer title="Severity Distribution">
          <div className="h-[250px] w-full md:h-[400px] sm:h-[300px]">
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
          <div className="h-[250px] w-full md:h-[400px] sm:h-[300px]">
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
        <div className="flex flex-col w-full items-center md:flex-row">
          <div className="h-[300px] w-full md:h-[500px] px-2 sm:h-[400px] sm:px-4">
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