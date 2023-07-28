import React from 'react';
import PropTypes from 'prop-types';
import styles from './GenericCard.module.scss';

const GenericCard = ({ data }) => {
  const { title, content, subtitle, cardId } = data;
  return (
    <div data-sm-content={cardId} className={styles.card}>
      <div className={styles.card__container}>
        <div className={styles.card__title}>{title}</div>
        <div className={styles.card__subtitle}>{subtitle}</div>
        <div className={styles.card__content}>{content}</div>
      </div>
    </div>
  );
};
GenericCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
  }).isRequired,
};

export default GenericCard;
