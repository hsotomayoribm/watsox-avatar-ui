import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './WebhookRequest.module.scss';

const WebhookRequest = ({ data }) => {
  const { image, cardId } = data;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (image) setLoading(false);
  }, [image]);
  return (
    <div data-sm-content={cardId} className={styles.container}>
      <div className={styles.webhook}>
        <div className={styles.webhook__title}>This is a random picture of a cute fox</div>
        <div className={styles.webhook__content}>{!loading && <img src={image} alt="fox" />}</div>
      </div>
    </div>
  );
};

WebhookRequest.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};
export default WebhookRequest;
