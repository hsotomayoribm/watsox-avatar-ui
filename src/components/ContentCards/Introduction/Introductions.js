import React from 'react';
import styles from './Introduction.module.scss';

const Introduction = ({ data }) => {
  const { list } = data;
  return (
    <div className={styles.content} data-sm-content='introduction'>
      <div className={styles.content__container}>
        <p className={styles.content__container__text}></p>

        <ul className={styles.content__container__list}>
          {list &&
            list.map((item, i) => {
              return <li key={i} className={styles.content__container__list__item}>{item.label}</li>;
            })}
        </ul>
      </div>
    </div>
  );
};

export default Introduction;
