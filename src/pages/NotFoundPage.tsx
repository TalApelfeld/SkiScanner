import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Mountain, ArrowLeft } from "lucide-react";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-lg"
      >
        <div className="mb-6">
          <Mountain
            className="w-20 h-20 text-primary-600 mx-auto"
            strokeWidth={1}
          />
        </div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-lg text-neutral-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The trail might
          have disappeared under fresh powder.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
