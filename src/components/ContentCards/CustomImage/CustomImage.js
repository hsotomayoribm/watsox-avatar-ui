import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomImage.module.scss';

const CustomImage = ({ data }) => {
  const { url, alt, cardId } = data;
  return (
    <div data-sm-content={cardId} className={styles.container}>
      <div className={styles.border}>
        <img src={url} alt={alt} className={styles.image} />
      </div>
    </div>
  );
};

CustomImage.propTypes = {
  data: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    cardId: PropTypes.string,
  }).isRequired,
};

export default CustomImage;
