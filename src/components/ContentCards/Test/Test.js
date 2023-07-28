/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { sendTextMessage } from '../../../store/sm/index';
import styles from './Test.module.scss';
import testData from './data.json';


//Useful as a component to quickly test. Make an intent to test 

const Test = ({ dispatchTextFromData }) => {
  const [expand, setExpand] = useState(false);
  const [expandedItem, setExpandedItem] = useState({});
  const handleExpand = (item) => {
    if (!item) return;
    setExpandedItem(item);
    setExpand(true);
  };
  return (
    <div data-sm-content='test' className={styles.container}>
      {!expand ? (
        <div className={styles.content}>
          {testData.map((item, i) => (
            <div key={i} className={styles.content__container}>
              <div className={styles.content__title}>{item.title}</div>
              <div className={styles.content__content__clamp}>{item.body}</div>
              <div className={styles.content__link__container}>
                <div className={styles.content__link}>
                  <a href={item.url} target='_blank'>
                    Link
                  </a>
                </div>
                <HiOutlineArrowsExpand
                  className={styles.content__link__icon}
                  onClick={() => handleExpand(item)}
                />
              </div>
            </div>
          ))}
          <div className={styles.btn} onClick={() => dispatchTextFromData('What else can you do')}>
            Go Back
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <div
            onClick={() => {
              window.open('https://random.dog/', '_blank', 'noreferrer');
            }}
            className={styles.content__container}
          >
            <div className={styles.content__title}>{expandedItem.title}</div>
            <div className={styles.content__content}>{expandedItem.body}</div>
            <div className={styles.content__link}>
              <a href={expandedItem.url} target='_blank'>
                Link
              </a>
            </div>
          </div>
          <div className={styles.btn} onClick={() => setExpand(false)}>
            Go Back
          </div>
        </div>
      )}
    </div>
  );
};

Test.propTypes = {
  dispatchTextFromData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTextFromData: (message) => dispatch(sendTextMessage({ text: message })),
});

export default connect(null, mapDispatchToProps)(Test);
