import { useCallback } from 'react';
import { soundManager } from '../utils/sound';

export const useSound = () => {
  const playClick = useCallback(() => {
    soundManager.playRealMouseClick();
  }, []);

  const playHover = useCallback(() => {
    soundManager.playHover();
  }, []);

  const playSuccess = useCallback(() => {
    soundManager.playSuccess();
  }, []);

  const playError = useCallback(() => {
    soundManager.playError();
  }, []);

  const toggleMute = useCallback(() => {
    soundManager.toggleMute();
  }, []);

  const isMuted = soundManager.getMuteState();

  return {
    playClick,
    playHover,
    playSuccess,
    playError,
    toggleMute,
    isMuted
  };
}; 