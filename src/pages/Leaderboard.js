import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users, Target, Star, Crown } from 'lucide-react';

const Leaderboard = () => {
  const [activeCategory, setActiveCategory] = useState('organizations');

  const categories = [
    { id: 'organizations', label: 'Organizations', icon: <Users className="w-5 h-5" /> },
    { id: 'universities', label: 'Universities', icon: <Award className="w-5 h-5" /> },
    { id: 'cities', label: 'Cities', icon: <Target className="w-5 h-5" /> }
  ];

  const leaderboardData = {
    organizations: [
      {
        id: 1,
        name: "TechCorp Solutions",
        emissions: 0.8,
        reduction: 45,
        rank: 1,
        badge: "🏆",
        category: "Technology",
        employees: 250
      },
      {
        id: 2,
        name: "Green Manufacturing Co.",
        emissions: 1.2,
        reduction: 38,
        rank: 2,
        badge: "🥈",
        category: "Manufacturing",
        employees: 180
      },
      {
        id: 3,
        name: "EcoRetail Chain",
        emissions: 1.5,
        reduction: 32,
        rank: 3,
        badge: "🥉",
        category: "Retail",
        employees: 320
      },
      {
        id: 4,
        name: "Sustainable Foods Ltd.",
        emissions: 1.8,
        reduction: 28,
        rank: 4,
        badge: "⭐",
        category: "Food & Beverage",
        employees: 150
      },
      {
        id: 5,
        name: "Clean Energy Corp",
        emissions: 2.1,
        reduction: 25,
        rank: 5,
        badge: "⭐",
        category: "Energy",
        employees: 200
      }
    ],
    universities: [
      {
        id: 1,
        name: "Green University",
        emissions: 0.5,
        reduction: 52,
        rank: 1,
        badge: "🏆",
        category: "Education",
        students: 15000
      },
      {
        id: 2,
        name: "EcoTech Institute",
        emissions: 0.7,
        reduction: 48,
        rank: 2,
        badge: "🥈",
        category: "Education",
        students: 12000
      },
      {
        id: 3,
        name: "Sustainable College",
        emissions: 0.9,
        reduction: 41,
        rank: 3,
        badge: "🥉",
        category: "Education",
        students: 8000
      },
      {
        id: 4,
        name: "Climate University",
        emissions: 1.1,
        reduction: 35,
        rank: 4,
        badge: "⭐",
        category: "Education",
        students: 10000
      },
      {
        id: 5,
        name: "Future Academy",
        emissions: 1.3,
        reduction: 30,
        rank: 5,
        badge: "⭐",
        category: "Education",
        students: 6000
      }
    ],
    cities: [
      {
        id: 1,
        name: "EcoCity",
        emissions: 2.1,
        reduction: 58,
        rank: 1,
        badge: "🏆",
        category: "Metropolitan",
        population: 500000
      },
      {
        id: 2,
        name: "GreenTown",
        emissions: 2.8,
        reduction: 45,
        rank: 2,
        badge: "🥈",
        category: "Urban",
        population: 300000
      },
      {
        id: 3,
        name: "Sustainable City",
        emissions: 3.2,
        reduction: 38,
        rank: 3,
        badge: "🥉",
        category: "Metropolitan",
        population: 400000
      },
      {
        id: 4,
        name: "Climate Haven",
        emissions: 3.8,
        reduction: 32,
        rank: 4,
        badge: "⭐",
        category: "Urban",
        population: 250000
      },
      {
        id: 5,
        name: "Future City",
        emissions: 4.1,
        reduction: 28,
        rank: 5,
        badge: "⭐",
        category: "Metropolitan",
        population: 350000
      }
    ]
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500';
      case 3: return 'bg-gradient-to-r from-orange-400 to-orange-600';
      default: return 'bg-gray-100 dark:bg-gray-700';
    }
  };

  const formatEmissions = (value) => {
    return `${value.toFixed(1)} tons CO₂e`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Trophy className="w-8 h-8 text-yellow-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Sustainability Leaderboard
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the top performers in carbon footprint reduction across organizations, universities, and cities.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex justify-center space-x-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-eco-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.icon}
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          {leaderboardData[activeCategory].map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className={`card p-6 ${getRankColor(entry.rank)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg">
                    <span className="text-2xl">{entry.badge}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {entry.name}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <span>{entry.category}</span>
                      <span>•</span>
                      <span>
                        {activeCategory === 'organizations' && `${entry.employees} employees`}
                        {activeCategory === 'universities' && `${entry.students.toLocaleString()} students`}
                        {activeCategory === 'cities' && `${entry.population.toLocaleString()} population`}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {formatEmissions(entry.emissions)}
                  </div>
                  <div className="flex items-center space-x-1 text-eco-600 dark:text-eco-400">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {entry.reduction}% reduction
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <Trophy className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Total Participants
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              1,247
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <Target className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Average Reduction
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              34%
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <Star className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              CO₂ Saved
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              12.5K tons
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="card p-8 mt-12 text-center bg-gradient-to-r from-eco-500 to-ocean-500 text-white"
        >
          <Crown className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Join the Competition!
          </h2>
          <p className="text-eco-100 mb-6 max-w-2xl mx-auto">
            Start tracking your carbon footprint and compete with others to become a sustainability leader. 
            Every reduction counts towards a greener future.
          </p>
          <button className="bg-white text-eco-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
            Start Tracking Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;
