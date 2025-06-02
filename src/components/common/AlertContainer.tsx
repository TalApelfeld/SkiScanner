import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { removeAlert } from "../../redux/slices/uiSlice";

const AlertContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { alerts } = useAppSelector((state) => state.ui);

  // Auto-remove alerts after 5 seconds
  useEffect(() => {
    if (alerts.length > 0) {
      const timers = alerts.map((alert) => {
        return setTimeout(() => {
          dispatch(removeAlert(alert.id));
        }, 5000);
      });

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
      };
    }
  }, [alerts, dispatch]);

  if (alerts.length === 0) return null;

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-success-600" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-error-600" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-warning-600" />;
      case "info":
        return <Info className="w-5 h-5 text-primary-600" />;
      default:
        return <Info className="w-5 h-5 text-primary-600" />;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case "success":
        return "border-l-4 border-success-500 bg-success-50";
      case "error":
        return "border-l-4 border-error-500 bg-error-50";
      case "warning":
        return "border-l-4 border-warning-500 bg-warning-50";
      case "info":
        return "border-l-4 border-primary-500 bg-primary-50";
      default:
        return "border-l-4 border-primary-500 bg-primary-50";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {alerts.map((alert) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`flex items-center p-4 shadow-lg rounded-lg ${getAlertClass(
              alert.type
            )}`}
          >
            <div className="flex-shrink-0 mr-3">{getAlertIcon(alert.type)}</div>
            <div className="flex-grow text-sm mr-2">{alert.message}</div>
            <button
              onClick={() => dispatch(removeAlert(alert.id))}
              className="flex-shrink-0 p-1 rounded-full hover:bg-black/5 transition-colors"
              aria-label="Close alert"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AlertContainer;
