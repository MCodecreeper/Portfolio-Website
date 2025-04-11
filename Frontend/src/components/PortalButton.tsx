import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './PortalButton.module.css';

interface PortalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const PortalButton: React.FC<PortalButtonProps> = ({ onClick, children }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <motion.button
      ref={buttonRef}
      className={styles.portalButton}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

export default PortalButton; 