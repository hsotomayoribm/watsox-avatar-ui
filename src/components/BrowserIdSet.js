/* eslint-disable */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setBrowserId } from '../store/sm';

const BrowserIdSet = ({ data, dispatchSetBrowserId }) => {
  const { id } = data;

  useEffect(() => {
    console.log(`browser ID in BrowserIdSet.js: ${id}`);
    dispatchSetBrowserId(id);
  }, [id]);

  return <div style={{ visibility: 'hidden' }}></div>;
};

BrowserIdSet.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    sessionId: PropTypes.string,
  }).isRequired,
  dispatchSetBrowserId: PropTypes.func.isRequired,
  browserId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  dispatchTextFromData: (e) => dispatch(sendTextMessage({ text: e.target.dataset.triggerText })),
  dispatchSetBrowserId: (browserId) => dispatch(setBrowserId({ browserId: browserId })),
});

export default connect(null, mapDispatchToProps)(BrowserIdSet);
