/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { HiChevronRight } from 'react-icons/hi';
import PropTypes from 'prop-types';
import { sendTextMessage, setBrowserId } from '../../../store/sm/index';
import styles from './Options.module.scss';

const Options = ({ data, dispatchTextFromData, dispatchSetBrowserId }) => {
  const { options, id } = data;

  useEffect(() => {
    dispatchSetBrowserId(id);
  }, [id]);

  const optionsDisplay = options.map(({ label, value }) => (
    <button
      type='button'
      className={styles['list-btn']}
      data-trigger-text={value}
      onClick={dispatchTextFromData}
      key={JSON.stringify({ label, value })}
    >
      {label}
      <HiChevronRight />
    </button>
  ));
  return (
    <div data-sm-content='options'>
      {optionsDisplay}
    </div>
  );
};

Options.propTypes = {
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
  dispatchTextFromData: (e) => dispatch(sendTextMessage({ text: e.target.dataset.triggerText })),
  dispatchSetBrowserId: (browserId) => dispatch(setBrowserId({ browserId: browserId })),
});

export default connect(null, mapDispatchToProps)(Options);
