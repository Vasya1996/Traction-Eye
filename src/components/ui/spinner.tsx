import React from 'react';
import { motion } from 'framer-motion';

interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({size = 6, color = "border-yellow-900"}) => {
  return (
    <motion.div
      className="flex items-center justify-center h-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`w-${size} h-${size} border-${size / 2} border-dashed rounded-full animate-spin ${color} border-t-transparent`}></div>
    </motion.div>
  );
};
