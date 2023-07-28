/* eslint-disable */
import React from 'react';
import {
  logo,
  logoAltText,
  transparentHeader,
  headerHeight,
  smLogo,
  watsonLogo,
  smWaLogo
} from '../../config';
import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles['header__logo-box']}>
      <img src={logo} className={styles.header__logo} alt={logoAltText} />
    </div>
    <div className={styles['header__text-box']}>
      <div className={styles['heading-primary--main']}>
        <img src={smLogo} className={styles['heading-primary--main-logo']} alt='sm logo' />
        <span className={styles['heading-primary--highlight']}>Powered by</span>
      </div>
      <div className={styles['heading-primary--sub']}>
        
        <img src={watsonLogo} className={styles['heading-primary--main-logo-watson']} alt='watson logo' />
      </div>
    </div>
  </header>
);

export default Header;
