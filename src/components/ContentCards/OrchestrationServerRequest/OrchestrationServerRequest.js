/* eslint-disable */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './OrchestrationServerRequest.module.scss';

const ORCHESTRATION_URL = process.env.REACT_APP_ORCHESTRATION_URL;

const videoTypes = {
  mp4: true,
  webm: true,
};

const _getFileType = (str) => {
  if (!str) return false;
  const i = str.lastIndexOf('.');
  const fileType = str.slice(i + 1);
  return fileType;
};

const OrchestrationServerRequest = ({ browserId, data }) => {
  const [loading, setLoading] = useState(true);
  const [doggie, setDoggie] = useState('');
  const [video, setVideo] = useState(false);
  const { cardId } = data;

  useEffect(() => {
    async function getRandomDog() {
      try {
        const result = await axios.get(
          `${ORCHESTRATION_URL}/randomDog/${browserId}`,
        );
        if (result.data.url) {
          console.log(`Result from get random dog: ${result.data.url}`);
          setDoggie(result.data.url);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getRandomDog();
  }, []);

  useEffect(() => {
    if (doggie) {
      const fileType = _getFileType(doggie);
      if (videoTypes[fileType]) setVideo(true);
    }
  }, [doggie]);

  return (
    <div data-sm-content={cardId} className={styles.container}>
      <div className={styles.orchestration}>
        <div className={styles.orchestration__title}>This is a random picture of a cute dog</div>
        <div className={styles.orchestration__content}>
          {!loading && !video && (
            <img
              src={doggie ? doggie : 'https://random.dog/bee1c745-f82f-4025-a3ec-728f0e7961fe.JPG'}
              alt='dog'
            />
          )}
          {!loading && video && (
            <video controls={false} autoPlay>
              <source src={doggie} type='video/mp4' />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

OrchestrationServerRequest.propTypes = {
  browserId: PropTypes.string,
  data: PropTypes.shape({
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = ({ sm }) => ({
  browserId: sm.browserId,
});

export default connect(mapStateToProps)(OrchestrationServerRequest);
