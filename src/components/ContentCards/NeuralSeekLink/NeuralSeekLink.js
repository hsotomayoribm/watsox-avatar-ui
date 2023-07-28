import React from 'react';
import PropTypes from 'prop-types';
import { ReactTinyLink } from 'react-tiny-link';
import styles from './NeuralSeekLink.module.scss';

const PROXY_SERVER = process.env.REACT_APP_PROXY_SERVER;
const PREVIEW_LINK_BACKUP = process.env.REACT_APP_PREVIEW_LINK_BACKUP

const NeuralSeekLink = ({ data }) => {
  const { link } = data;
  console.log(`LINK IN DATA: ${link}`);
  return (
    <div className={styles.container} data-sm-content='neuralSeekLink'>
      <ReactTinyLink
        cardSize='large'
        showGraphic={true}
        maxLine={2}
        minLine={1}
        loadSecureUrl={true}
        url={link ? link : 'https://www.ibm.com'}
        defaultMedia={PREVIEW_LINK_BACKUP}
        // proxyUrl='https://cors-anywhere.herokuapp.com'
        proxyUrl={PROXY_SERVER}
      />
    </div>
  );
};

NeuralSeekLink.propTypes = {
  data: PropTypes.shape({
    link: PropTypes.string,
  }).isRequired,
};

export default NeuralSeekLink;
