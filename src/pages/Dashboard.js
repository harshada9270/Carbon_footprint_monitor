import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Zap, Car, Bus, Train, Plane, Trash2, Lightbulb, Target, Award, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCarbonData, getCurrentMonthKey, getMonthName } from '../context/CarbonDataContext';

const Dashboard = () => {
  const { state, dispatch } = useCarbonData();
  const [selectedMonth, setSelectedMonth] = useState(state.currentMonth);
  const [currentMonthData, setCurrentMonthData] = useState(null);

  // Update current month data when selected month changes
  useEffect(() => {
    const monthData = state.monthlyData[selectedMonth];
    if (monthData) {
      setCurrentMonthData(monthData);
    } else {
      // Create empty data structure for months with no data
      setCurrentMonthData({
        electricity: { kwh: 0, emissions: 0 },
        transport: {
          car: { km: 0, emissions: 0, type: 'car' },
          bus: { km: 0, emissions: 0, type: 'bus' },
          train: { km: 0, emissions: 0, type: 'train' },
          flight: { km: 0, emissions: 0, type: 'flight' },
        },
        waste: { kg: 0, emissions: 0 },
        totalEmissions: 0,
      });
    }
  }, [selectedMonth, state.monthlyData]);

  // Month navigation functions
  const navigateMonth = (direction) => {
    const [year, month] = selectedMonth.split('-').map(Number);
    let newYear = year;
    let newMonth = month + direction;
    
    if (newMonth > 12) {
      newMonth = 1;
      newYear++;
    } else if (newMonth < 1) {
      newMonth = 12;
      newYear--;
    }
    
    const newMonthKey = `${newYear}-${String(newMonth).padStart(2, '0')}`;
    setSelectedMonth(newMonthKey);
    dispatch({ type: 'SET_CURRENT_MONTH', payload: newMonthKey });
  };

  // Generate monthly trend data from available months
  const generateMonthlyTrendData = () => {
    const months = Object.keys(state.monthlyData).sort();
    return months.map(month => ({
      month: getMonthName(month).split(' ')[0], // Just the month name
      emissions: state.monthlyData[month].totalEmissions,
      fullMonth: getMonthName(month)
    }));
  };

  // Use current month data if available, otherwise use state data
  const data = currentMonthData || state;
  
  const pieData = [
    { name: 'Electricity', value: data.electricity.emissions, color: '#22c55e' },
    { name: 'Transport', value: Object.values(data.transport).reduce((sum, mode) => sum + mode.emissions, 0), color: '#0ea5e9' },
    { name: 'Waste', value: data.waste.emissions, color: '#f59e0b' }
  ].filter(item => item.value > 0);

  const transportData = [
    { name: 'Car', value: data.transport.car.emissions, color: '#ef4444' },
    { name: 'Bus', value: data.transport.bus.emissions, color: '#8b5cf6' },
    { name: 'Train', value: data.transport.train.emissions, color: '#06b6d4' },
    { name: 'Flight', value: data.transport.flight.emissions, color: '#f97316' }
  ].filter(item => item.value > 0);

  const monthlyTrendData = generateMonthlyTrendData();

  const formatEmissions = (value) => {
    // Handle undefined, null, or non-numeric values
    if (value === undefined || value === null || isNaN(value)) {
      return '0.0 kg';
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)} tons`;
    }
    return `${value.toFixed(1)} kg`;
  };

  const getEmissionsStatus = () => {
    const total = data.totalEmissions;
    if (total < 1000) return { status: 'Excellent', color: 'text-eco-500', icon: <TrendingDown /> };
    if (total < 2000) return { status: 'Good', color: 'text-blue-500', icon: <Target /> };
    return { status: 'Needs Improvement', color: 'text-orange-500', icon: <TrendingUp /> };
  };

  const emissionsStatus = getEmissionsStatus();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Carbon Footprint Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor your emissions and track your progress towards sustainability goals.
          </p>
        </motion.div>

        {/* Month Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-eco-500" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Viewing Month
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <div className="text-center min-w-[200px]">
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {getMonthName(selectedMonth)}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedMonth === getCurrentMonthKey() ? 'Current Month' : 'Historical Data'}
                </div>
              </div>
              <button
                onClick={() => navigateMonth(1)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Total Emissions Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Total Carbon Footprint
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-4xl font-bold text-eco-600 dark:text-eco-400">
                  {formatEmissions(data.totalEmissions)}
                </span>
                <span className="text-lg text-gray-600 dark:text-gray-300">CO₂e</span>
              </div>
            </div>
            <div className="text-right">
              <div className={`flex items-center space-x-2 text-lg font-semibold ${emissionsStatus.color}`}>
                {emissionsStatus.icon}
                <span>{emissionsStatus.status}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                This month
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emissions Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Pie Chart */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Emissions Breakdown
              </h3>
              {pieData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${formatEmissions(value)} CO₂e`} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                  <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No emissions data available</p>
                  <p className="text-sm">Add your data to see the breakdown</p>
                </div>
              )}
            </div>

            {/* Transport Breakdown */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transport Emissions
              </h3>
              {transportData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={transportData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${formatEmissions(value)} CO₂e`} />
                    <Bar dataKey="value" fill="#0ea5e9" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Car className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No transport data available</p>
                </div>
              )}
            </div>

            {/* Monthly Trend */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Trend
              </h3>
              {monthlyTrendData.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${formatEmissions(value)} CO₂e`, 'Emissions']}
                      labelFormatter={(label, payload) => {
                        if (payload && payload[0]) {
                          return payload[0].payload.fullMonth;
                        }
                        return label;
                      }}
                    />
                    <Line type="monotone" dataKey="emissions" stroke="#22c55e" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No trend data available</p>
                  <p className="text-sm">Add data for multiple months to see trends</p>
                </div>
              )}
            </div>

            {/* Transport Breakdown */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Transport Breakdown
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Car className="w-5 h-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Car</span>
                  </div>
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {formatEmissions(data.transport.car.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bus className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-700 dark:text-gray-300">Bus</span>
                  </div>
                  <span className="font-semibold text-purple-600 dark:text-purple-400">
                    {formatEmissions(data.transport.bus.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Train className="w-5 h-5 text-cyan-500" />
                    <span className="text-gray-700 dark:text-gray-300">Train</span>
                  </div>
                  <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                    {formatEmissions(data.transport.train.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Plane className="w-5 h-5 text-orange-500" />
                    <span className="text-gray-700 dark:text-gray-300">Flight</span>
                  </div>
                  <span className="font-semibold text-orange-600 dark:text-orange-400">
                    {formatEmissions(data.transport.flight.emissions)}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total Transport</span>
                  <span className="font-bold text-eco-600 dark:text-eco-400">
                    {formatEmissions(Object.values(data.transport).reduce((sum, mode) => sum + mode.emissions, 0))}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* AI Suggestions Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="card p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Lightbulb className="w-6 h-6 text-eco-500" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Suggestions
                </h3>
              </div>
              <div className="space-y-4">
                {state.aiSuggestions.map((suggestion, index) => (
                  <motion.div
                    key={suggestion.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-gradient-to-r from-eco-50 to-ocean-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-eco-200 dark:border-gray-600"
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{suggestion.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {suggestion.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {suggestion.description}
                        </p>
                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-eco-500" />
                          <span className="text-sm font-medium text-eco-600 dark:text-eco-400">
                            Potential impact: {suggestion.impact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Electricity</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(data.electricity.emissions)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Transport</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(Object.values(data.transport).reduce((sum, mode) => sum + mode.emissions, 0))}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Waste</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {formatEmissions(data.waste.emissions)}
                  </span>
                </div>
                <hr className="border-gray-200 dark:border-gray-600" />
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-eco-600 dark:text-eco-400">
                    {formatEmissions(data.totalEmissions)}
                  </span>
                </div>
              </div>
            </div>

            {/* Debug Info - Remove this in production */}
            <div className="card p-6 mt-6 bg-gray-50 dark:bg-gray-800">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Debug Info ({getMonthName(selectedMonth)})
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                <div>Car: {data.transport.car.km} km → {data.transport.car.emissions} kg CO2</div>
                <div>Bus: {data.transport.bus.km} km → {data.transport.bus.emissions} kg CO2</div>
                <div>Train: {data.transport.train.km} km → {data.transport.train.emissions} kg CO2</div>
                <div>Flight: {data.transport.flight.km} km → {data.transport.flight.emissions} kg CO2</div>
                <div className="font-semibold">Total Transport: {Object.values(data.transport).reduce((sum, mode) => sum + mode.emissions, 0)} kg CO2</div>
                <div className="font-semibold">Total Emissions: {data.totalEmissions} kg CO2</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
