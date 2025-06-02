import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  Heart,
  Calendar,
  Snowflake,
  Moon,
  Sun,
  // ChevronDown, Search
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleMenu, toggleTheme } from "../../redux/slices/uiSlice";

const Header: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { isMenuOpen, theme } = useAppSelector((state) => state.ui);
  const { isAuthenticated } = useAppSelector((state) => state.user);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  const navItems = [
    { name: "Find Resorts", path: "/" },
    { name: "Package Builder", path: "/package-builder" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const headerClasses = `fixed top-0 left-0 w-full h-[72px] z-50 transition-all duration-300 ${
    isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
  }`;

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <Snowflake className="w-8 h-8 text-primary-600" strokeWidth={1.5} />
            <span className="ml-2 text-xl font-bold font-heading">
              SkiScanner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  location.pathname === item.path
                    ? "text-primary-600"
                    : isScrolled
                    ? "text-neutral-800"
                    : "text-neutral-900"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => dispatch(toggleTheme())}
              className="p-2 rounded-full hover:bg-gray-100"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/favorites"
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Favorites"
                >
                  <Heart className="w-5 h-5" />
                </Link>
                <Link
                  to="/bookings"
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="My Bookings"
                >
                  <Calendar className="w-5 h-5" />
                </Link>
                <Link
                  to="/account"
                  className="p-2 rounded-full hover:bg-gray-100"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <Link to="/account" className="btn btn-primary">
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => dispatch(toggleMenu())}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            aria-label="Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "tween" }}
            className="fixed inset-0 z-50 bg-white lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <Link
                  to="/"
                  className="flex items-center"
                  onClick={() => dispatch(toggleMenu())}
                >
                  <Snowflake
                    className="w-8 h-8 text-primary-600"
                    strokeWidth={1.5}
                  />
                  <span className="ml-2 text-xl font-bold font-heading">
                    SkiScanner
                  </span>
                </Link>
                <button
                  onClick={() => dispatch(toggleMenu())}
                  className="p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-grow p-4">
                <ul className="space-y-6">
                  {navItems.map((item) => (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className="text-lg font-medium hover:text-primary-600"
                        onClick={() => dispatch(toggleMenu())}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t">
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => dispatch(toggleTheme())}
                    className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                  >
                    {theme === "dark" ? (
                      <>
                        <Sun className="w-5 h-5" />
                        <span>Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-5 h-5" />
                        <span>Dark Mode</span>
                      </>
                    )}
                  </button>

                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/favorites"
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => dispatch(toggleMenu())}
                      >
                        <Heart className="w-5 h-5" />
                        <span>Favorites</span>
                      </Link>
                      <Link
                        to="/bookings"
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => dispatch(toggleMenu())}
                      >
                        <Calendar className="w-5 h-5" />
                        <span>My Bookings</span>
                      </Link>
                      <Link
                        to="/account"
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100"
                        onClick={() => dispatch(toggleMenu())}
                      >
                        <User className="w-5 h-5" />
                        <span>Account</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/account"
                      className="btn btn-primary w-full"
                      onClick={() => dispatch(toggleMenu())}
                    >
                      Sign In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
