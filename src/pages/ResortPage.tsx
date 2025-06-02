import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  MapPin,
  Mountain,
  Snowflake,
  Calendar,
  ArrowRight,
  ChevronDown,
  Heart,
  Plane,
  Star,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchResortById } from "../redux/slices/resortSlice";
import { MOCK_HOTELS } from "../mockData";
import { Hotel } from "../types";

const ResortPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { selectedResort, loading, error } = useAppSelector(
    (state) => state.resorts
  );
  const { favorites, isAuthenticated } = useAppSelector((state) => state.user);

  const [selectedTab, setSelectedTab] = useState("overview");
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const isFavorite = favorites.includes(id || "");

  useEffect(() => {
    if (id) {
      dispatch(fetchResortById(id));

      // Get mock hotels for this resort
      const resortHotels = MOCK_HOTELS[id] || [];
      setHotels(resortHotels);
    }
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    // Implement toggle favorite functionality
  };

  const handleStartPackage = () => {
    navigate("/package-builder", { state: { resortId: id } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !selectedResort) {
    return (
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Resort Not Found</h1>
          <p className="mb-6">
            Sorry, we couldn't find the resort you're looking for.
          </p>
          <button onClick={() => navigate("/")} className="btn btn-primary">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section
        className="relative h-[50vh] md:h-[60vh] flex items-end"
        style={{
          backgroundImage: `url(${selectedResort.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

        <div className="container mx-auto px-4 relative z-10 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center text-white mb-2">
              <MapPin className="w-5 h-5 mr-1" strokeWidth={1.5} />
              <span>{selectedResort.country}</span>
            </div>

            <div className="flex flex-wrap items-center justify-between">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-0">
                {selectedResort.name}
              </h1>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors ${
                    isFavorite ? "text-red-500" : "text-white"
                  }`}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className="w-6 h-6"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>

                <button
                  onClick={handleStartPackage}
                  className="btn btn-accent py-2.5 px-5"
                >
                  Build Package
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="sticky top-16 z-20 bg-white shadow">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto py-2 scrollbar-hide">
            <button
              onClick={() => setSelectedTab("overview")}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors ${
                selectedTab === "overview"
                  ? "bg-primary-100 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab("accommodation")}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors ${
                selectedTab === "accommodation"
                  ? "bg-primary-100 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Accommodation
            </button>
            <button
              onClick={() => setSelectedTab("map")}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors ${
                selectedTab === "map"
                  ? "bg-primary-100 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Resort Map
            </button>
            <button
              onClick={() => setSelectedTab("activities")}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors ${
                selectedTab === "activities"
                  ? "bg-primary-100 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Activities
            </button>
            <button
              onClick={() => setSelectedTab("reviews")}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium rounded-md transition-colors ${
                selectedTab === "reviews"
                  ? "bg-primary-100 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-8">
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Resort Details */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">
                  About {selectedResort.name}
                </h2>
                <p className="text-neutral-700 mb-6">
                  {selectedResort.description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Mountain
                      className="w-6 h-6 text-primary-600 mx-auto mb-2"
                      strokeWidth={1.5}
                    />
                    <p className="text-xs text-neutral-600 mb-1">Elevation</p>
                    <p className="font-bold">
                      {selectedResort.lowestElevation}m -{" "}
                      {selectedResort.highestElevation}m
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <svg
                      className="w-6 h-6 text-primary-600 mx-auto mb-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 17L9 11L13 15L21 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-xs text-neutral-600 mb-1">
                      Slope Length
                    </p>
                    <p className="font-bold">
                      {selectedResort.slopeKilometers} km
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Snowflake
                      className="w-6 h-6 text-primary-600 mx-auto mb-2"
                      strokeWidth={1.5}
                    />
                    <p className="text-xs text-neutral-600 mb-1">Lifts</p>
                    <p className="font-bold">{selectedResort.liftCount}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <MapPin
                      className="w-6 h-6 text-primary-600 mx-auto mb-2"
                      strokeWidth={1.5}
                    />
                    <p className="text-xs text-neutral-600 mb-1">
                      Nearest Airports
                    </p>
                    <p className="font-bold">
                      {selectedResort.nearestAirports.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-3">Resort Features</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedResort.features
                      .slice(0, showAllFeatures ? undefined : 6)
                      .map((feature, index) => (
                        <div key={index} className="flex items-center">
                          <svg
                            className="w-5 h-5 text-secondary-600 mr-2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 13L9 17L19 7"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span>{feature}</span>
                        </div>
                      ))}
                  </div>
                  {selectedResort.features.length > 6 && (
                    <button
                      onClick={() => setShowAllFeatures(!showAllFeatures)}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center mt-3"
                    >
                      {showAllFeatures ? "Show less" : "Show all features"}
                      <ChevronDown
                        className={`w-4 h-4 ml-1 transition-transform ${
                          showAllFeatures ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">
                    Start Planning Your Trip
                  </h3>

                  <div className="mb-6">
                    <p className="text-neutral-600 text-sm mb-1">
                      Package from
                    </p>
                    <p className="text-3xl font-bold text-primary-600">
                      €{selectedResort.packagePriceFrom}
                    </p>
                    <p className="text-neutral-500 text-xs">per person</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-start">
                      <Calendar
                        className="w-5 h-5 text-primary-600 mt-1 mr-3"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="font-medium">When to Visit</p>
                        <p className="text-sm text-neutral-600">
                          Best snowfall: December to April
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Plane
                        className="w-5 h-5 text-primary-600 mt-1 mr-3"
                        strokeWidth={1.5}
                      />
                      <div>
                        <p className="font-medium">Getting There</p>
                        <p className="text-sm text-neutral-600">
                          Fly to {selectedResort.nearestAirports[0]}, then
                          {selectedResort.nearestAirports[0] === "GVA"
                            ? " 1 hour"
                            : " 2 hours"}{" "}
                          transfer
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={handleStartPackage}
                    className="btn btn-accent w-full mb-4"
                  >
                    Build Your Package
                    <ArrowRight className="w-4 h-4 ml-2" strokeWidth={2} />
                  </button>

                  <p className="text-xs text-center text-neutral-500">
                    No booking fees • Free cancellation on most rooms
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {selectedTab === "accommodation" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">
              Accommodation in {selectedResort.name}
            </h2>

            {hotels.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {hotels.map((hotel) => (
                  <div key={hotel.id} className="card h-full">
                    <img
                      src={hotel.imageUrl}
                      alt={hotel.name}
                      className="w-full h-48 object-cover rounded-t-xl"
                    />
                    <div className="p-5">
                      <h3 className="text-lg font-bold mb-2">{hotel.name}</h3>
                      <div className="flex items-center mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < hotel.starRating
                                ? "text-accent-500 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-neutral-600 mb-4">
                        <MapPin className="w-4 h-4 mr-1" strokeWidth={1.5} />
                        <span>{hotel.liftDistanceMeters}m from lifts</span>
                      </div>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, index) => (
                            <span
                              key={index}
                              className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                            >
                              {amenity}
                            </span>
                          ))}
                          {hotel.amenities.length > 4 && (
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-end mt-4">
                        <div>
                          <p className="text-xs text-neutral-500">From</p>
                          <p className="text-lg font-bold text-primary-600">
                            €{hotel.pricePerNight}
                          </p>
                          <p className="text-xs text-neutral-500">per night</p>
                        </div>
                        <button className="btn btn-primary py-2">
                          View Rooms
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-neutral-600">
                  No accommodations found for this resort.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {selectedTab === "map" && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">Resort map coming soon.</p>
          </div>
        )}

        {selectedTab === "activities" && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">
              Activities information coming soon.
            </p>
          </div>
        )}

        {selectedTab === "reviews" && (
          <div className="text-center py-12">
            <p className="text-lg text-neutral-600">Reviews coming soon.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResortPage;
