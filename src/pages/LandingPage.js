import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, TrendingDown, Users, Award, Zap, Leaf, BarChart3, Heart, BookOpen, Building2, Home, GraduationCap, Factory, Car, Plane, Lightbulb } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { currentUser } = useAuth();
  const features = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Monitor your carbon emissions in real-time with detailed analytics and insights."
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: "Smart Reductions",
      description: "Get AI-powered suggestions to reduce your carbon footprint effectively."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Leaderboard",
      description: "Compare your progress with others and stay motivated to achieve sustainability goals."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Achievement System",
      description: "Earn badges and recognition for your sustainability efforts and milestones."
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Health & Environment Alerts",
      description: "Monitor correlation between emissions and health risks like asthma or heat stress."
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Agriculture & Water Management",
      description: "Track emissions from irrigation pumps, fertilizer use, and water treatment plants."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Education & Awareness",
      description: "Simplified dashboard with gamified challenges for schools and universities."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "50,000+", label: "Tons CO₂ Saved" },
    { number: "500+", label: "Organizations" },
    { number: "95%", label: "Satisfaction Rate" }
  ];

  const emissionBenchmarks = [
    {
      category: "Households",
      icon: <Home className="w-8 h-8" />,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      average: "10-20 tons CO₂/year",
      range: "5-50 tons CO₂/year",
      details: [
        { item: "Electricity (2-4 people)", emission: "2-4 tons/year", icon: <Lightbulb className="w-4 h-4" /> },
        { item: "Transportation", emission: "3-8 tons/year", icon: <Car className="w-4 h-4" /> },
        { item: "Heating/Cooling", emission: "2-6 tons/year", icon: <Zap className="w-4 h-4" /> },
        { item: "Food & Waste", emission: "2-4 tons/year", icon: <Leaf className="w-4 h-4" /> }
      ],
      description: "Typical household emissions vary based on size, location, and lifestyle choices."
    },
    {
      category: "Universities",
      icon: <GraduationCap className="w-8 h-8" />,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      average: "15,000-50,000 tons CO₂/year",
      range: "5,000-200,000 tons CO₂/year",
      details: [
        { item: "Energy (Buildings)", emission: "8,000-25,000 tons/year", icon: <Building2 className="w-4 h-4" /> },
        { item: "Transportation", emission: "2,000-8,000 tons/year", icon: <Car className="w-4 h-4" /> },
        { item: "Research Labs", emission: "3,000-12,000 tons/year", icon: <Zap className="w-4 h-4" /> },
        { item: "Waste & Water", emission: "1,000-3,000 tons/year", icon: <Leaf className="w-4 h-4" /> }
      ],
      description: "University emissions depend on campus size, research activities, and student population."
    },
    {
      category: "Industries",
      icon: <Factory className="w-8 h-8" />,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      borderColor: "border-orange-200 dark:border-orange-700",
      average: "Varies by sector",
      range: "1,000-1,000,000+ tons CO₂/year",
      details: [
        { item: "Manufacturing", emission: "10,000-500,000 tons/year", icon: <Factory className="w-4 h-4" /> },
        { item: "Energy Production", emission: "50,000-2,000,000 tons/year", icon: <Zap className="w-4 h-4" /> },
        { item: "Transportation", emission: "5,000-100,000 tons/year", icon: <Plane className="w-4 h-4" /> },
        { item: "Agriculture", emission: "1,000-50,000 tons/year", icon: <Leaf className="w-4 h-4" /> }
      ],
      description: "Industrial emissions vary significantly by sector, size, and production methods."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-eco-50 via-white to-ocean-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-eco-500/10 to-ocean-500/10"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-eco-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-ocean-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-eco-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Track. <span className="text-eco-600 dark:text-eco-400">Reduce.</span> Sustain.
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Monitor and reduce your carbon footprint with our comprehensive platform. 
                Join thousands of organizations, households, and cities in the fight against climate change.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={currentUser ? "/dashboard" : "/login"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <span>{currentUser ? 'Go to Dashboard' : 'Get Started'}</span>
                    <ArrowRight size={20} />
                  </motion.button>
                </Link>
                <Link to="/tips">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <span>Learn More</span>
                    <Globe size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-eco-600 dark:text-eco-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Carbon Monitor?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our platform provides everything you need to understand, track, and reduce your carbon footprint.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="card p-6 text-center"
              >
                <div className="text-eco-500 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Carbon Emission Benchmarks Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Carbon Emission Benchmarks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Understanding typical carbon emissions across different sectors helps you benchmark your own footprint and set realistic reduction goals.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {emissionBenchmarks.map((benchmark, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`card p-6 border-2 ${benchmark.borderColor} ${benchmark.bgColor}`}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${benchmark.color}`}>
                    {benchmark.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {benchmark.category}
                  </h3>
                </div>
                
                <div className="mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Annual Emissions</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {benchmark.average}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Range: {benchmark.range}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {benchmark.description}
                </p>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Breakdown by Category:
                  </div>
                  {benchmark.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <div className={`${benchmark.color} opacity-70`}>
                          {detail.icon}
                        </div>
                        <span className="text-gray-600 dark:text-gray-400">
                          {detail.item}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {detail.emission}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Insights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-r from-eco-50 to-ocean-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Key Insights & Context
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <TrendingDown className="w-5 h-5 text-eco-500 mr-2" />
                  Global Averages
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Global average per person: ~4.8 tons CO₂/year</li>
                  <li>• US average per person: ~15.5 tons CO₂/year</li>
                  <li>• EU average per person: ~6.4 tons CO₂/year</li>
                  <li>• Target for 1.5°C goal: ~2.3 tons CO₂/year per person</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Award className="w-5 h-5 text-eco-500 mr-2" />
                  Reduction Opportunities
                </h4>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Energy efficiency: 20-40% reduction possible</li>
                  <li>• Renewable energy: 50-80% reduction in electricity</li>
                  <li>• Transportation: 30-60% reduction with EVs/public transit</li>
                  <li>• Waste reduction: 10-30% reduction with recycling</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-eco-600 dark:bg-eco-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-eco-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already tracking and reducing their carbon footprint. 
              Start your sustainability journey today.
            </p>
            <Link to="/data-input">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-eco-600 font-semibold py-4 px-8 rounded-lg text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
