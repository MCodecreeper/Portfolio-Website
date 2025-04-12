import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Cursor.module.css';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const target = document.elementFromPoint(position.x, position.y);
      if (target) {
        const isClickable: boolean = Boolean(
          target instanceof HTMLAnchorElement || 
          target instanceof HTMLButtonElement || 
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('clickable')
        );
        
        setIsPointer(isClickable);
      }
    };

    window.addEventListener('mousemove', updateCursorPosition);
    window.addEventListener('mousemove', updateCursorType);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      window.removeEventListener('mousemove', updateCursorType);
    };
  }, [position.x, position.y]);

  return (
    <motion.div
      className={`${styles.cursor} ${isPointer ? styles.pointer : ''}`}
      animate={{
        x: position.x - 16,
        y: position.y - 16,
      }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 200,
        mass: 0.5
      }}
    />
  );
};

export default Cursor; 