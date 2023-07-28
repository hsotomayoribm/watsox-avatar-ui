/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-bootstrap';
import {Microphone} from '@carbon/icons-react';
import dummyTOS from '../../termsConditions.js';
// import { createFormattedText } from '../../lang/utils'
import {
  mute,
  stopSpeaking,
  setShowTranscript,
  setShowTermsAndConditions,
  resetTranscript,
} from '../../store/sm/index';
import {
  transcriptBlue,
  transcriptWhite,
  muteOn,
  muteOff,
  resetBlue,
  resetWhite,
  termsBlue,
  termsWhite,
  stopBlue,
  stopWhite,
} from '../../config';
import breakpoints from '../../utils/breakpoints';
import { mediaStreamProxy } from '../../proxyVideo';
import styles from './ControlGroup.module.scss';

const ORCHESTRATION_URL = process.env.REACT_APP_ORCHESTRATION_URL;

const volumeMeterHeight = 24;
const volumeMeterMultiplier = 1.2;
const smallHeight = volumeMeterHeight;
const largeHeight = volumeMeterHeight * volumeMeterMultiplier;

const Controls = ({
  translatedToolTips,
  hideControls,
  intermediateUserUtterance,
  userSpeaking,
  dispatchResetTranscript,
  dispatchMute,
  isMuted,
  speechState,
  dispatchStopSpeaking,
  dispatchToggleShowTranscript,
  showTranscript,
  transcript,
  videoWidth,
  connected,
  typingOnly,
  showTermsAndConditions,
  dispatchToggleShowTermsAndConditions,
  browserId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const [volume, setVolume] = useState(0);
  const isLarger = videoWidth >= breakpoints.md ? largeHeight : smallHeight;
  const [responsiveVolumeHeight, setResponsiveVolumeHeight] = useState(isLarger);
  const [mouseOver, setMouseOver] = useState({
    transcript: false,
    mute: false,
    reset: false,
    terms: false,
    interrupt: false,
  });
  const [active, setActive] = useState({ transcript: false, mute: false, terms: false });

  useEffect(() => {
    //transcript icon
    if (showTranscript || mouseOver['transcript']) {
      setActive((prevState) => {
        return { ...prevState, transcript: true };
      });
    } else {
      setActive((prevState) => {
        return { ...prevState, transcript: false };
      });
    }

    //mute icon
    if (isMuted || mouseOver['mute']) {
      setActive((prevState) => {
        return { ...prevState, mute: true };
      });
    } else {
      setActive((prevState) => {
        return { ...prevState, mute: false };
      });
    }

    //terms icon
    if (showTermsAndConditions || mouseOver['terms']) {
      setActive((prevState) => {
        return { ...prevState, terms: true };
      });
    } else {
      setActive((prevState) => {
        return { ...prevState, terms: false };
      });
    }
  }, [showTranscript, isMuted, showTermsAndConditions, mouseOver]);

  const handleMouseOver = (icon, state) => {
    const result = { [icon]: state };
    setMouseOver((prevState) => {
      return { ...prevState, ...result };
    });
  };

  if (userSpeaking === true && inputValue !== '' && inputFocused === false) setInputValue('');

  // code for handling IDLE session timeout below

  useEffect(async () => {
    if (connected && typingOnly === false) {
      // credit: https://stackoverflow.com/a/64650826
      let volumeCallback = null;
      let audioStream;
      let audioContext;
      let audioSource;
      let unmounted = false;
      // Initialize
      try {
        audioStream = mediaStreamProxy.getUserMediaStream();
        audioContext = new AudioContext();
        audioSource = audioContext.createMediaStreamSource(audioStream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 512;
        analyser.minDecibels = -127;
        analyser.maxDecibels = 0;
        analyser.smoothingTimeConstant = 0.4;
        audioSource.connect(analyser);
        const volumes = new Uint8Array(analyser.frequencyBinCount);
        volumeCallback = () => {
          analyser.getByteFrequencyData(volumes);
          let volumeSum = 0;
          volumes.forEach((v) => {
            volumeSum += v;
          });
          // multiply value by 2 so the volume meter appears more responsive
          // (otherwise the fill doesn't always show)
          const averageVolume = (volumeSum / volumes.length) * 2;
          // Value range: 127 = analyser.maxDecibels - analyser.minDecibels;
          setVolume(averageVolume > 127 ? 127 : averageVolume);
        };
        // runs every time the window paints
        const volumeDisplay = () => {
          window.requestAnimationFrame(() => {
            if (!unmounted) {
              volumeCallback();
              volumeDisplay();
            }
          });
        };
        volumeDisplay();
      } catch (e) {
        console.log('volume: ', volume);
        console.log('responsiveVolumeHeight: ', responsiveVolumeHeight);
        console.error('Failed to initialize volume visualizer!', e);
      }

      return () => {
        console.log('closing down the audio stuff');
        // FIXME: tracking #79
        unmounted = true;
        audioContext.close();
        audioSource.close();
      };
    }
    return false;
  }, [connected]);

  useEffect(() => {
    // check window width, if larger display then increase mic indicator size
    if (videoWidth >= breakpoints.md) setResponsiveVolumeHeight(largeHeight);
    else setResponsiveVolumeHeight(smallHeight);
  });

  useEffect(() => {
    ReactTooltip.rebuild();
  });

  const resetConvo = () => {
    //functionality for clear out the transcript after reset buttom.
    dispatchResetTranscript();

    //axio calls for reset conversation WA session.
    async function resetWatson() {
      console.log('reset watson function called');
      if (!browserId) return;
      try {
        await axios.post(`${ORCHESTRATION_URL}/reset`, {
          fn: 'ResetConvo',
          id: browserId,
        });
      } catch (err) {
        console.log(`error from WATSON Reset api`, err);
      }
    }
    resetWatson();
  };

  // clear placeholder text on reconnect, sometimes the state updates won't propagate
  const placeholder = intermediateUserUtterance === '' ? '' : intermediateUserUtterance;

  //const translatedTranscriptToolTip = intl.formatMessage({ id: 'icon.transcript' });
  const transcriptButton = (
    <button
      type='button'
      className={`${styles.transcript__btn} ${
        showTranscript ? styles['transcript__btn-active'] : ''
      } ${hideControls ? styles['transcript__btn-hide'] : ''}`}
      aria-label='Toggle Transcript'
      // data-tip={translatedToolTips.transcript}
      data-tip='Toggle Transcript'
      data-place='top'
      onClick={dispatchToggleShowTranscript}
      onMouseOver={() => handleMouseOver('transcript', true)}
      onMouseOut={() => handleMouseOver('transcript', false)}
      disabled={transcript.length === 0}
    >
      {active['transcript'] ? (
        <img src={transcriptWhite} alt='transcript button' />
      ) : (
        <img src={transcriptBlue} alt='transcript button' />
      )}
    </button>
  );

  //const translatedMuteToolTip = intl.formatMessage({ id: 'icon.mute' });

  const muteButton = (
    <button
      type='button'
      className={`${styles.mute__btn} ${isMuted ? styles['mute__btn-active'] : ''} ${
        hideControls ? styles['mute__btn-hide'] : ''
      }`}
      aria-label='Mute button'
      data-tip={'Mute'}
      data-place='top'
      onMouseOver={() => handleMouseOver('mute', true)}
      onMouseOut={() => handleMouseOver('mute', false)}
      onClick={dispatchMute}
    >
      {active['mute'] ? <img src={muteOn} alt='mute on' /> : <img src={muteOff} alt='mute off' />}
    </button>
  );

  const resetConvoButton = (
    <button
      type='button'
      className={`${styles.reset__btn} ${hideControls ? styles['reset__btn-hide'] : ''}`}
      aria-label='Reset Conversation'
      data-tip='Reset Conversation'
      // data-tip={translatedToolTips.reset}
      data-place='top'
      onMouseOver={() => handleMouseOver('reset', true)}
      onMouseOut={() => handleMouseOver('reset', false)}
      onClick={resetConvo}
    >
      {!mouseOver['reset'] ? (
        <img src={resetBlue} alt='reset button' />
      ) : (
        <img src={resetWhite} alt='reset button' />
      )}
    </button>
  );

  const termsAndConditionsButton = (
    <button
      type='button'
      className={`${styles.terms__btn} ${
        showTermsAndConditions ? styles['terms__btn-active'] : ''
      } ${hideControls ? styles['terms__btn-hide'] : ''}`}
      aria-label='View Terms and Conditions'
      data-tip='View Terms and Conditions'
      // data-tip={translatedToolTips.terms}
      data-place='top'
      onMouseOver={() => handleMouseOver('terms', true)}
      onMouseOut={() => handleMouseOver('terms', false)}
      onClick={dispatchToggleShowTermsAndConditions}
    >
      {!active['terms'] ? (
        <img src={termsBlue} alt='display terms' />
      ) : (
        <img src={termsWhite} alt='display terms' />
      )}
    </button>
  );

  const interruptButton = (
    <button
      type='button'
      className={`${styles.interrupt__btn} ${hideControls ? styles['interrupt__btn-hide'] : ''} ${
        speechState !== 'speaking' ? styles['interrupt__btn-disabled'] : ''
      }`}
      //disabled={speechState !== 'speaking'}
      onClick={dispatchStopSpeaking}
      data-tip='Stop Speaking'
      // data-tip={translatedToolTips.stop}
      data-place='top'
      onMouseOver={() => handleMouseOver('interrupt', true)}
      onMouseOut={() => handleMouseOver('interrupt', false)}
    >
      {!mouseOver['interrupt'] ? (
        <img src={stopBlue} alt='reset button' />
      ) : (
        <img src={stopWhite} alt='reset button' />
      )}
    </button>
  );

  return (
    <div className={styles.controls_container}>
      <Modal show={showTermsAndConditions} onHide={dispatchToggleShowTermsAndConditions} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Legal: Privacy/Terms & Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>{dummyTOS}</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={dispatchToggleShowTermsAndConditions}>
            test
          </Button>
        </Modal.Footer>
      </Modal>
      <div className='row mb-3 display-flex justify-content-center'>
        <div className={`col-auto d-md-block d-block`}>{transcriptButton}</div>
        <div className={`col-auto d-md-block d-block`}>{muteButton}</div>
        <div className={`col-auto d-md-block d-block`}>{resetConvoButton}</div>
        <div className={`col-auto d-md-block d-block`}>{termsAndConditionsButton}</div>
        <div className={`col-auto d-md-block d-block`}>{interruptButton}</div>
        {/* <span> */}
        {/*   <FormattedMessage id="icon.mute" /> */}
        {/* </span> */}
      </div>
    </div>
  );
};

Controls.propTypes = {
  intermediateUserUtterance: PropTypes.string.isRequired,
  lastUserUtterance: PropTypes.string.isRequired,
  userSpeaking: PropTypes.bool.isRequired,
  dispatchMute: PropTypes.func.isRequired,
  isMuted: PropTypes.bool.isRequired,
  speechState: PropTypes.string.isRequired,
  dispatchStopSpeaking: PropTypes.func.isRequired,
  showTranscript: PropTypes.bool.isRequired,
  showTermsAndConditions: PropTypes.bool.isRequired,
  dispatchToggleShowTermsAndConditions: PropTypes.func.isRequired,
  dispatchToggleShowTranscript: PropTypes.func.isRequired,
  transcript: PropTypes.arrayOf(PropTypes.object).isRequired,
  videoWidth: PropTypes.number.isRequired,
  connected: PropTypes.bool.isRequired,
  typingOnly: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  intermediateUserUtterance: state.sm.intermediateUserUtterance,
  lastUserUtterance: state.sm.lastUserUtterance,
  userSpeaking: state.sm.userSpeaking,
  connected: state.sm.connected,
  isMuted: state.sm.isMuted,
  speechState: state.sm.speechState,
  showTranscript: state.sm.showTranscript,
  showTermsAndConditions: state.sm.showTermsAndConditions,
  transcript: state.sm.transcript,
  videoWidth: state.sm.videoWidth,
  typingOnly: state.sm.typingOnly,
  browserId: state.sm.browserId,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchResetTranscript: () => dispatch(resetTranscript()),
  dispatchMute: (muteState) => dispatch(mute(muteState)),
  dispatchStopSpeaking: () => dispatch(stopSpeaking()),
  dispatchToggleShowTranscript: () => dispatch(setShowTranscript()),
  dispatchToggleShowTermsAndConditions: () => dispatch(setShowTermsAndConditions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
