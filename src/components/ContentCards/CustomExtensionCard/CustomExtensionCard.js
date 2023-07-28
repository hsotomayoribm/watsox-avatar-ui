import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mute } from '../../../store/sm/index';
import styles from './CustomExtensionCard.module.scss';

const CustomExtensionCard = ({ dispatchMute, data }) => {
  // On mount, mute
  useEffect(() => {
    dispatchMute(true);
  }, []);

  // On unmount, unmute
  useEffect(() => () => dispatchMute(false), []);

  return (
    <div className={styles.container}>
      <div className={styles.typewriter}>
        <h1>{`Using ${data.name}...`}</h1>
      </div>
    </div>
  );
};

CustomExtensionCard.propTypes = {
  dispatchMute: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchMute: (muteValue) => dispatch(mute(muteValue)),
});

export default connect(null, mapDispatchToProps)(CustomExtensionCard);
