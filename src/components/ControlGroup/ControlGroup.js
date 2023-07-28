/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { useIdleTimer } from 'react-idle-timer';
import PropTypes from 'prop-types';
import Controls from './Controls';

import styles from './ControlGroup.module.scss';
import { setHideTranscript, resetTranscript } from '../../store/sm/index';
import { ibmCog } from '../../config';

const ORCHESTRATION_URL = process.env.REACT_APP_ORCHESTRATION_URL;
const DEMONSTRATION_MODE = process.env.REACT_APP_DEMONSTRATION_MODE === 'true';

const ControlGroup = ({
  activeCards,
  dispatchHideTranscript,
  transcript,
  lastUserUtterance,
  userSpeaking,
  speechState,
  browserId,
  loading,
}) => {
  //state used for idle reset
  const [userActiveTimeStamp, setUserActiveTimeStamp] = useState(0);
  //state used for controls
  const [showControls, setShowControls] = useState(false);
  const [hideControls, setHideControls] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!DEMONSTRATION_MODE) {
      return;
    }
    let idleTimer = setTimeout(handleNewTopic, 140000);
    return () => clearTimeout(idleTimer);
  }, [transcript, lastUserUtterance, userSpeaking, speechState, userActiveTimeStamp]);

  const handleNewTopic = () => {
    console.log('handle new topic fired');
    async function startNewTopic() {
      console.log('axios ran');
      try {
        await axios.post(`${ORCHESTRATION_URL}/newTopic`, {
          fn: 'newTopic',
          id: browserId,
        });
      } catch (err) {
        console.log(`error from WATSON Reset api`, err);
      }
    }
    startNewTopic();
  };

  const handleClick = () => {
    if (loading) return;
    setClicked(!clicked);
    setHideControls(showControls);
    if (showControls) {
      setTimeout(() => {
        setShowControls(!showControls);
      }, 300);
    } else {
      setShowControls(!showControls);
    }
  };

  //Hide transcript when card shows up
  useEffect(() => {
    if (activeCards.length > 0) {
      dispatchHideTranscript(false);
    }
  }, [activeCards]);

  const handleOnAction = () => {
    setUserActiveTimeStamp(getLastActiveTime());
  };

  const { getLastActiveTime } = useIdleTimer({
    onAction: handleOnAction,
    events: [
      'mousemove',
      'keydown',
      'wheel',
      'DOMMouseScroll',
      'mousewheel',
      'mousedown',
      'touchstart',
      'touchmove',
    ],
  });

  return (
    <div className={styles.container}>
      {!clicked ? (
        <img
          className={`${styles.btn} ${styles.btn__clicked}`}
          src={ibmCog}
          alt='expand controls'
          onClick={handleClick}
        />
      ) : (
        <img
          className={styles.btn}
          src={ibmCog}
          alt='shrink controls'
          onClick={handleClick}
        />
      )}
      {showControls && (
        <div className={styles.controls__container}>
          <Controls hideControls={hideControls} />
        </div>
      )}
    </div>
  );
};

ControlGroup.propTypes = {
  connected: PropTypes.bool.isRequired,
  activeCards: PropTypes.array.isRequired,
  dispatchHideTranscript: PropTypes.func.isRequired,
  dispatchResetTranscript: PropTypes.func.isRequired,
  transcript: PropTypes.arrayOf(PropTypes.object).isRequired,
  lastUserUtterance: PropTypes.string.isRequired,
  userSpeaking: PropTypes.bool.isRequired,
  speechState: PropTypes.string.isRequired,
  browserId: PropTypes.string,
};

const mapStateToProps = (state) => ({
  connected: state.sm.connected,
  activeCards: state.sm.activeCards,
  lastUserUtterance: state.sm.lastUserUtterance,
  userSpeaking: state.sm.userSpeaking,
  connected: state.sm.connected,
  speechState: state.sm.speechState,
  transcript: state.sm.transcript,
  browserId: state.sm.browserId,
  loading: state.sm.loading,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResetTranscript: () => dispatch(resetTranscript()),
  dispatchHideTranscript: (showTranscript) =>
    dispatch(setHideTranscript({ showTranscript: showTranscript })),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlGroup);
