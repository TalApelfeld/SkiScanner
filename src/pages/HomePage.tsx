import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Plane, MapPin, TrendingUp } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setFilters } from "../redux/slices/resortSlice";
import { AIRPORTS } from "../mockData";
import ResortCard from "../components/resort/ResortCard";
import SnowAnimation from "../components/ui/SnowAnimation";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { filteredResorts, loading, filters } = useAppSelector(
    (state) => state.resorts
  );

  const [departureAirport, setDepartureAirport] = useState(
    filters.departureAirport
  );
  const [budget, setBudget] = useState(filters.budget);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      setFilters({
        budget,
        departureAirport,
        dates: {
          start: startDate || null,
          end: endDate || null,
        },
      })
    );
  };

  // For animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    // <div className="relative">
    <>
      {/* Hero Section with Snow Animation */}
      <section className="relative h-screen flex items-center ">
        <SnowAnimation />
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/290452/pexels-photo-290452.jpeg?auto=compress&cs=tinysrgb&w=1600)",
            backgroundPosition: "center",
            filter: "brightness(0.7)",
          }}
        />

        <div className="container mx-auto px-4 relative z-10 mt-[var(--header-offset)]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl "
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Find Your Perfect Ski Getaway
            </h1>
            <p className="text-xl text-white mb-8">
              Compare and book complete ski packages with flights, transfers,
              and accommodation in one place.
            </p>

            <div className="w-full glassmorphism rounded-xl p-6">
              <form onSubmit={handleSearch}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="departure"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Flying from
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Plane
                          className="h-5 w-5 text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <select
                        id="departure"
                        value={departureAirport}
                        onChange={(e) => setDepartureAirport(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="">Any Airport</option>
                        {AIRPORTS.map((airport) => (
                          <option key={airport.code} value={airport.code}>
                            {airport.name} ({airport.code})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="budget"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Budget per person
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <TrendingUp
                          className="h-5 w-5 text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <select
                        id="budget"
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="1000">Up to €1,000</option>
                        <option value="1500">Up to €1,500</option>
                        <option value="2000">Up to €2,000</option>
                        <option value="3000">Up to €3,000</option>
                        <option value="5000">Up to €5,000</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label
                      htmlFor="startDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Departure date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar
                          className="h-5 w-5 text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="endDate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Return date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar
                          className="h-5 w-5 text-gray-400"
                          strokeWidth={1.5}
                        />
                      </div>
                      <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        min={startDate}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 px-4 rounded-md font-medium flex items-center justify-center transition-colors"
                  onClick={() => {
                    if (!departureAirport) {
                      alert("Please select a departure airport.");
                      return;
                    }
                    if (!budget) {
                      alert("Please select a budget.");
                      return;
                    }
                    navigate("/package-builder");
                  }}
                >
                  <Search className="w-5 h-5 mr-2" strokeWidth={2} />
                  Search Ski Resorts
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Resorts Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-center mb-2">
                Featured Ski Resorts
              </h2>
              <p className="text-neutral-600 text-center max-w-2xl mx-auto mb-12">
                Discover our hand-picked selection of the best ski destinations
                in Europe, offering exceptional slopes, amenities, and
                experiences.
              </p>
            </motion.div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResorts.slice(0, 6).map((resort) => (
                  <motion.div key={resort.id} variants={itemVariants}>
                    <ResortCard resort={resort} />
                  </motion.div>
                ))}
              </div>
            )}

            <motion.div variants={itemVariants} className="mt-12 text-center">
              <button
                onClick={() => navigate("/resorts")}
                className="btn btn-outline"
              >
                View All Resorts
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div
              variants={itemVariants}
              className="text-center max-w-2xl mx-auto mb-12"
            >
              <h2 className="text-3xl font-bold mb-4">
                Why Book With SkiScanner
              </h2>
              <p className="text-neutral-600">
                We make planning your ski trip easy and stress-free, with
                everything you need in one place.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <motion.div variants={itemVariants} className="text-center p-6">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search
                    className="w-8 h-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">All-in-One Search</h3>
                <p className="text-neutral-600">
                  Compare flights, transfers, and accommodations in a single
                  search.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center p-6">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin
                    className="w-8 h-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Proximity to Slopes</h3>
                <p className="text-neutral-600">
                  See exactly how close your accommodation is to the nearest
                  chairlift.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center p-6">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp
                    className="w-8 h-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Budget-Friendly</h3>
                <p className="text-neutral-600">
                  Find resorts and packages that match your budget with
                  transparent pricing.
                </p>
              </motion.div>

              <motion.div variants={itemVariants} className="text-center p-6">
                <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar
                    className="w-8 h-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-xl font-bold mb-2">Seamless Booking</h3>
                <p className="text-neutral-600">
                  Book your entire ski vacation in one transaction, with instant
                  confirmation.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
    // </div>
  );
};

export default HomePage;
