/* eslint-disable import/prefer-default-export */
/* eslint-disable */

import blueDoc from './img/Transcript_Blue.svg';
import whiteDoc from './img/Transcript_White.svg';
import muteOnWhite from './img/Mute_On_White.svg';
import muteOffBlue from './img/Mute_Off_Blue.svg';
import reset_blue from './img/Reset_Blue.svg';
import reset_white from './img/Reset_White.svg';
import terms_blue from './img/Terms_Blue.svg';
import terms_white from './img/Terms_White.svg';
import stop_blue from './img/Stop_Blue.svg';
import stop_white from './img/Stop_White.svg';
import minus_circle from './img/minus_circle.svg';
import plus_circle from './img/plus_circle.svg';
// import ibmLogo from './img/IBM_logo.svg';
import ibm_cog_small from './img/ibm_cog_small.svg';
import sm_logo from './img/SM_Logo_DarkGray.png';
import smWa_updated_logo from './img/SMW-updated-logo.svg';
import new_smw_logo from './img/smw-logo-grey.svg';
import watson_logo from './img/IBM_Watson®_logotype_reg_rev_RGB-04.png';
import ibmLogo from './img/ibm-logo.svg';
import microphone_svg from './img/microphone.svg';

import smWA_logo from './img/smw_logo_v1.svg';

// header will not take up vertical height when transparent, so you need to be mindful of overlap
export const transparentHeader = true;
export const headerHeight = '8rem';
export const logo = ibmLogo;
export const logoAltText = 'IBM Logo';
export const logoLink = '/';

// controls icons
export const transcriptBlue = blueDoc;
export const transcriptWhite = whiteDoc;
export const muteOn = muteOnWhite;
export const muteOff = muteOffBlue;
export const resetBlue = reset_blue;
export const resetWhite = reset_white;
export const termsBlue = terms_blue;
export const termsWhite = terms_white;
export const stopBlue = stop_blue;
export const stopWhite = stop_white;
export const plusCircle = plus_circle;
export const minusCircle = minus_circle;
export const smLogo = sm_logo;
export const watsonLogo = watson_logo;
// export const smWaLogo = smWA_logo;
export const smWaLogo = smWa_updated_logo;
export const newSMWLogo = new_smw_logo;
export const ibmCog = ibm_cog_small;


export const microphone = microphone_svg;
// background image is positioned in a way that is best for pictures of the persona's face.
// adjust spacing as necessary in Landing.js for different images
// if you want just a color, set landingBackgroundImage to null
// if desired, a gradient can also be added to landingBackgroundColor
export const landingBackgroundColor = '#f0f0f0';
export const landingBackgroundImage = null;

// if set to true, on disconnect, the app will redirect to the specified route.
// if false, it will redirect to /
export const disconnectPage = false;
export const disconnectRoute = '/feedback';
