/* eslint-disable */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { HiOutlineArrowsExpand } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { sendTextMessage, setBrowserId } from '../../../store/sm/index';
import styles from './Search.module.scss';

const Search = ({ dispatchTextFromData, data }) => {
  const [expand, setExpand] = useState(false);
  const [expandedItem, setExpandedItem] = useState({});
  const handleExpand = (item) => {
    if (!item) return;
    setExpandedItem(item);
    setExpand(true);
  };

  let searchData = data.data;
  return (
    <div data-sm-content='search' className={styles.container}>
      {!expand ? (
        <div className={styles.content}>
          {searchData.map((item, i) => (
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

Search.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    sessionId: PropTypes.string,
    parameters: PropTypes.shape({
      options: PropTypes.arrayOf(PropTypes.object),
      title: PropTypes.string,
    }),
  }).isRequired,
  dispatchTextFromData: PropTypes.func.isRequired,
  dispatchSetBrowserId: PropTypes.func.isRequired,
  browserId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTextFromData: (message) => dispatch(sendTextMessage({ text: message })),
  dispatchSetBrowserId: (browserId) => dispatch(setBrowserId({ browserId: browserId })),
});

export default connect(null, mapDispatchToProps)(Search);
