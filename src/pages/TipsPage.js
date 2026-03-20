import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Leaf, Zap, Car, Home, ShoppingBag, TreeDeciduous, Target, BookOpen, Star } from 'lucide-react';

const TipsPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Tips', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'energy', label: 'Energy', icon: <Zap className="w-5 h-5" /> },
    { id: 'transport', label: 'Transport', icon: <Car className="w-5 h-5" /> },
    { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { id: 'lifestyle', label: 'Lifestyle', icon: <Leaf className="w-5 h-5" /> }
  ];

  const tips = [
    {
      id: 1,
      title: "Switch to LED Light Bulbs",
      description: "Replace traditional incandescent bulbs with LED lights. They use up to 90% less energy and last 25 times longer.",
      category: "energy",
      impact: "Save 0.3 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Low",
      icon: "💡",
      tags: ["energy", "home", "cost-effective"]
    },
    {
      id: 2,
      title: "Use Public Transportation",
      description: "Opt for buses, trains, or subways instead of driving. Public transport produces significantly fewer emissions per passenger.",
      category: "transport",
      impact: "Save 2.2 tons CO₂ annually",
      difficulty: "Medium",
      cost: "Low",
      icon: "🚌",
      tags: ["transport", "commute", "public"]
    },
    {
      id: 3,
      title: "Install Solar Panels",
      description: "Generate your own clean energy with solar panels. While the initial cost is high, the long-term savings and environmental benefits are substantial.",
      category: "energy",
      impact: "Save 4.5 tons CO₂ annually",
      difficulty: "Hard",
      cost: "High",
      icon: "☀️",
      tags: ["energy", "renewable", "investment"]
    },
    {
      id: 4,
      title: "Reduce Meat Consumption",
      description: "Try meatless Mondays or switch to a plant-based diet. Livestock production is a major source of greenhouse gas emissions.",
      category: "lifestyle",
      impact: "Save 0.8 tons CO₂ annually",
      difficulty: "Medium",
      cost: "Low",
      icon: "🥗",
      tags: ["diet", "health", "sustainable"]
    },
    {
      id: 5,
      title: "Improve Home Insulation",
      description: "Better insulation reduces heating and cooling needs, significantly lowering energy consumption and costs.",
      category: "home",
      impact: "Save 1.2 tons CO₂ annually",
      difficulty: "Medium",
      cost: "Medium",
      icon: "🏠",
      tags: ["home", "energy", "comfort"]
    },
    {
      id: 6,
      title: "Buy Local and Seasonal",
      description: "Choose locally grown, seasonal produce to reduce transportation emissions and support local farmers.",
      category: "lifestyle",
      impact: "Save 0.4 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Medium",
      icon: "🥕",
      tags: ["food", "local", "seasonal"]
    },
    {
      id: 7,
      title: "Use Energy-Efficient Appliances",
      description: "Look for ENERGY STAR certified appliances that use less energy and water while maintaining performance.",
      category: "home",
      impact: "Save 0.6 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Medium",
      icon: "🔌",
      tags: ["appliances", "energy", "efficiency"]
    },
    {
      id: 8,
      title: "Practice Sustainable Shopping",
      description: "Buy second-hand items, choose products with minimal packaging, and support eco-friendly brands.",
      category: "lifestyle",
      impact: "Save 0.3 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Low",
      icon: "🛍️",
      tags: ["shopping", "reuse", "minimalism"]
    },
    {
      id: 9,
      title: "Switch to Electric Vehicle",
      description: "Consider an electric or hybrid vehicle for your next car purchase. EVs produce zero direct emissions.",
      category: "transport",
      impact: "Save 4.8 tons CO₂ annually",
      difficulty: "Hard",
      cost: "High",
      icon: "⚡",
      tags: ["transport", "electric", "future"]
    },
    {
      id: 10,
      title: "Start Composting",
      description: "Turn food waste into nutrient-rich soil. Composting reduces methane emissions from landfills.",
      category: "home",
      impact: "Save 0.2 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Low",
      icon: "🌱",
      tags: ["waste", "gardening", "organic"]
    },
    {
      id: 11,
      title: "Use Renewable Energy",
      description: "Switch to a green energy provider or invest in renewable energy certificates to support clean energy production.",
      category: "energy",
      impact: "Save 2.1 tons CO₂ annually",
      difficulty: "Easy",
      cost: "Low",
      icon: "🌿",
      tags: ["energy", "renewable", "clean"]
    },
    {
      id: 12,
      title: "Reduce Air Travel",
      description: "Consider video conferencing for business meetings and choose closer destinations for vacations when possible.",
      category: "transport",
      impact: "Save 1.8 tons CO₂ per flight",
      difficulty: "Medium",
      cost: "Low",
      icon: "✈️",
      tags: ["travel", "business", "alternatives"]
    }
  ];

  const filteredTips = activeCategory === 'all' 
    ? tips 
    : tips.filter(tip => tip.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Hard': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getCostColor = (cost) => {
    switch (cost) {
      case 'Low': return 'text-green-600 dark:text-green-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'High': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
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
            <Lightbulb className="w-8 h-8 text-eco-500" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Tips to Go Green
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover AI-powered sustainability tips to reduce your carbon footprint and make a positive impact on the environment.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="card p-6 mb-8"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
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

        {/* Tips Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-start space-x-3 mb-4">
                <span className="text-3xl">{tip.icon}</span>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {tip.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-eco-500" />
                  <span className="text-sm font-medium text-eco-600 dark:text-eco-400">
                    {tip.impact}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 dark:text-gray-400">Difficulty:</span>
                    <span className={`font-medium ${getDifficultyColor(tip.difficulty)}`}>
                      {tip.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500 dark:text-gray-400">Cost:</span>
                    <span className={`font-medium ${getCostColor(tip.cost)}`}>
                      {tip.cost}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {tip.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-eco-100 dark:bg-eco-900/30 text-eco-700 dark:text-eco-300 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card p-8 mt-12 text-center bg-gradient-to-r from-eco-500 to-ocean-500 text-white"
        >
          <TreeDeciduous className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            Start Your Green Journey Today!
          </h2>
          <p className="text-eco-100 mb-6 max-w-2xl mx-auto">
            Every small action counts towards a sustainable future. Choose a few tips that work for you and start making a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-eco-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl">
              Track Your Progress
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-eco-600 transition-all duration-200">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <Star className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Tips Available
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              {tips.length}
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <Target className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Average Impact
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              1.2 tons
            </p>
          </div>

          <div className="card p-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-eco-100 dark:bg-eco-900/30 rounded-lg">
              <BookOpen className="w-6 h-6 text-eco-600 dark:text-eco-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Categories
            </h3>
            <p className="text-3xl font-bold text-eco-600 dark:text-eco-400">
              {categories.length - 1}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TipsPage;
