import React, { useEffect } from 'react';
import useSound from 'use-sound';
import wakeChime from '../../../sounds/wake_chime.wav';
import { ReactComponent as Microphone } from '../../../img/microphone.svg';
import styles from './WakeSound.module.scss';

const WakeSound = () => {
  const [play, { stop }] = useSound(wakeChime, { volume: 0.95 });
  useEffect(() => {
    console.log(`SOUND PLAYED`);
    play();
  });
  return (
    <div className={styles.mic}>
      <Microphone className={styles.mic__svg} />
    </div>
  );
};

export default WakeSound;
