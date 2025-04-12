import { motion } from 'framer-motion';
import { useSound } from '../../hooks/useSound';
import { FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import styles from './SoundToggle.module.css';

export const SoundToggle = () => {
  const { toggleMute, isMuted, playClick } = useSound();

  const handleToggle = () => {
    console.log('Sound toggle clicked, current state:', isMuted);
    toggleMute();
    playClick();
  };

  return (
    <motion.button
      className={styles.soundToggle}
      onClick={handleToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
    </motion.button>
  );
}; 