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

  // Apple's color palette
  const colors = {
    primary: "#0A84FF", // Apple Blue
    success: "#30D158", // Apple Green
    warning: "#FF9F0A", // Apple Orange
    danger: "#FF3B30",  // Apple Red
    info: "#5E5CE6",    // Apple Purple
    neutral: "#98989D"  // Apple Gray
  };

  const chartColors = [
    "#0A84FF", // Blue
    "#30D158", // Green
    "#5E5CE6", // Purple
    "#FF9F0A", // Orange
    "#FF3B30", // Red
    "#98989D"  // Gray
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

  const StatCard = ({ title, value, icon: Icon, color, trend, index, onClick }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="relative backdrop-blur-xl bg-white/70 p-4 rounded-2xl shadow-lg border border-white/20 duration-200 hover:shadow-xl sm:p-6 transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[#98989D] text-xs font-medium sm:text-sm">{title}</p>
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="text-gray-900 text-xl font-bold mt-2 sm:text-2xl bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent"
          >
            {value}
          </motion.p>
          {trend !== undefined && (
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
              className={`text-xs sm:text-sm mt-2 flex items-center gap-1 ${
                trend >= 0 ? "text-[#30D158]" : "text-[#FF3B30]"
              }`}
            >
              {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
              <span className="text-[#98989D] text-xs hidden sm:inline"> vs last period</span>
            </motion.p>
          )}
        </div>
        <motion.div
          className={`p-2 sm:p-3 rounded-2xl bg-[${colors[color]}]/10 relative group`}
        >
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 text-[${colors[color]}]`} />
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-white/70 text-gray-700 text-xs px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200">
            Click for details
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-2 right-2 text-[8px] sm:text-xs text-[#98989D]">
        {format(new Date(), "PPpp")}
      </div>
    </motion.div>
  );

  const ChartContainer = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="backdrop-blur-xl bg-white/70 border border-white/20 p-4 rounded-2xl shadow-lg sm:p-6"
    >
      <motion.h3
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex text-base font-semibold gap-2 items-center mb-4 sm:mb-6 sm:text-lg bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent"
      >
        <Shield className="h-4 text-[#0A84FF] w-4 sm:h-5 sm:w-5" />
        {title}
      </motion.h3>
      {children}
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex bg-[#f5f5f7] h-screen justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="border-b-2 border-[#0A84FF] h-8 rounded-full w-8 sm:h-12 sm:w-12"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#f5f5f7] p-3 lg:p-8 md:p-6 min-h-screen sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <h1 className="text-xl font-bold md:text-3xl sm:text-2xl bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <p className="text-[#98989D] text-sm mt-2 sm:text-base">
          Real-time overview of incident reports and trends
        </p>
      </motion.div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 mb-6 md:gap-6 sm:gap-4 sm:mb-8">
        <StatCard
          title="Total Reports"
          value={data.length}
          icon={BarChart2}
          color="primary"
          trend={12}
          index={0}
        />
        <StatCard
          title="Average Priority"
          value={`${(() => {
            let totalPriority = 0;
            for (let i = 0; i < data.length; i++) {
              totalPriority += parseInt(data[i].priority.slice(1));
            }
            return Math.round(totalPriority / data.length);
          })()}`}
          icon={Clock}
          color="success"
          trend={-5}
          index={1}
        />
        <StatCard
          title="Critical Issues"
          value={data.filter((item) => item.severity === "Critical").length}
          icon={AlertTriangle}
          color="danger"
          trend={8}
          index={2}
        />
        <StatCard
  title="Resolution Rate"
  value={`${(() => {
    let resolvedCount = data.filter(item => item.status.toLowerCase() === "resolved").length;
    let totalCount = data.length;
    return totalCount > 0 ? `${Math.round((resolvedCount / totalCount) * 100)}%` : "0%";
  })()}`}
  icon={TrendingUp}
  color="info"
  trend={3}
  index={3}
/>

      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="backdrop-blur-xl bg-white/70 border border-white/20 p-4 rounded-2xl shadow-lg mb-6 sm:mb-8 sm:p-6"
      >
        <h3 className="flex text-base font-semibold gap-2 items-center mb-4 sm:mb-6 sm:text-lg bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent">
          <Activity className="h-4 text-[#0A84FF] w-4 sm:h-5 sm:w-5" />
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
                whileHover={{ scale: 1.02 }}
                className="flex backdrop-blur-xl bg-white/50 border border-white/20 p-3 rounded-xl items-center sm:p-4"
              >
                <Activity className="h-6 text-[#0A84FF] w-6 mr-3 sm:h-8 sm:w-8" />
                <div>
                  <p className="text-sm font-semibold sm:text-base bg-gradient-to-r from-[#000000] to-[#666666] bg-clip-text text-transparent">
                    {issue.name}
                  </p>
                  <p className="text-[#98989D] text-xs sm:text-sm">{issue.value} incidents</p>
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
                  tick={{ fill: "#98989D", fontSize: windowWidth < 640 ? 12 : 14 }}
                />
                <YAxis 
                  tick={{ fill: "#98989D", fontSize: windowWidth < 640 ? 12 : 14 }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <Legend wrapperStyle={{ fontSize: windowWidth < 640 ? 12 : 14 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1500}>
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
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
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
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ 
                    fill: "#98989D",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <YAxis
                  tick={{ 
                    fill: "#98989D",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                  width={40}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    fontSize: windowWidth < 640 ? 12 : 14
                  }}
                />
                <Legend wrapperStyle={{ fontSize: windowWidth < 640 ? 12 : 14 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1200}>
                  {getCounts("type").map((entry, index) => (
                    <Cell key={index} fill={chartColors[index % chartColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </ChartContainer>
    </motion.div>
  );
};

export default AnalyticsDashboard;