/* eslint-disable */
import React from 'react';
import {
  smWaLogo,
  newSMWLogo
} from '../../config';
import styles from './Header.module.scss';

const Footer = () => (
  <div className={styles.footer}>
    <img src={newSMWLogo} className={styles.footer__logo} alt={`SM Watson Logo`} />
  </div>
);

export default Footer;
