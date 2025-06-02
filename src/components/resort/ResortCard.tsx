import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MapPin, Mountain, Star, Heart } from "lucide-react";
import { Resort } from "../../types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleFavorite } from "../../redux/slices/userSlice";

interface ResortCardProps {
  resort: Resort;
}

const ResortCard: React.FC<ResortCardProps> = ({ resort }) => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, favorites } = useAppSelector((state) => state.user);

  const isFavorite = favorites.includes(resort.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isAuthenticated) {
      dispatch(toggleFavorite(resort.id));
    } else {
      // Redirect to login or show login modal
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="card h-full"
    >
      <Link to={`/resort/${resort.id}`} className="block h-full">
        <div className="relative">
          <img
            src={resort.imageUrl}
            alt={resort.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-4 right-4 p-2 rounded-full ${
              isFavorite
                ? "bg-white text-error-500"
                : "bg-white/70 text-neutral-500 hover:text-error-500"
            }`}
            aria-label={
              isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorite ? "currentColor" : "none"}
            />
          </button>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold">{resort.name}</h3>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-accent-500 fill-current" />
              <span className="ml-1 text-sm font-medium">{resort.rating}</span>
            </div>
          </div>

          <div className="flex items-center text-neutral-600 mb-3">
            <MapPin className="w-4 h-4 mr-1" strokeWidth={1.5} />
            <span className="text-sm">{resort.country}</span>
          </div>

          <div className="mb-4">
            <p className="text-sm text-neutral-600 line-clamp-2">
              {resort.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="flex items-center">
              <Mountain
                className="w-4 h-4 text-primary-600 mr-1"
                strokeWidth={1.5}
              />
              <span className="text-xs">{resort.liftCount} Lifts</span>
            </div>
            <div className="flex items-center">
              <svg
                className="w-4 h-4 text-primary-600 mr-1"
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
              <span className="text-xs">
                {resort.slopeKilometers} km Slopes
              </span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-neutral-500">Packages from</p>
              <p className="text-lg font-bold text-primary-600">
                €{resort.packagePriceFrom}
              </p>
            </div>
            <button className="btn btn-primary py-2 px-4">View Resort</button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ResortCard;
