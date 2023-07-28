/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import styles from './StyledList.module.scss';

const StyledList = ({ data }) => {
  const { title, content, cardId } = data;
  return (
    <div data-sm-content={cardId} className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__title}>{title}</div>
        <ul className={styles.card__content}>
          {content.map((item, i) => (
            <li key={i}>{item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
StyledList.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default StyledList;
