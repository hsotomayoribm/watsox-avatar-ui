/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './CustomImages.module.scss';

const CustomImages = ({ data }) => {
  const { images, cardId } = data;
  return (
    <div data-sm-content={cardId} className={styles.container}>
      <div className={styles.images__container}>
        {images.map((image, i) => {
          return (
            <img
              key={i}
              src={image.url}
              alt={image.alt}
              style={{
                maxHeight: '360px',
                margin: '0.5rem',
                borderRadius: '10%',
                width: 'auto',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

CustomImages.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.object),
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default CustomImages;
