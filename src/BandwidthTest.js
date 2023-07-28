/* eslint-disable */
import React, { useState } from 'react';
import { ReactInternetSpeedMeter } from 'react-internet-meter';
import styles from './BandwidthTest.module.css';

const BandwidthTest = () => {
  const [wifispeed, setwifiSpeed] = useState(0);

  return (
    <div className='bandwidth-test' style={{ position: 'absolute', right: '6.5%', bottom: '1%' }}>
      <div>
        <p>
          Internet Download:{' '}
          <span
            className={wifispeed < 1 ? styles.lowspeed : styles.highspeed}
          >{`${wifispeed}mbs`}</span>
        </p>
      </div>
      <ReactInternetSpeedMeter
        txtSubHeading=''
        outputType='empty'
        customClassName={null}
        txtMainHeading=''
        pingInterval={4000} // checks every 4 Seconds
        thresholdUnit='megabyte' // "byte" , "kilobyte", "megabyte"
        threshold={1}
        imageUrl='https://upload.wikimedia.org/wikipedia/commons/f/f0/500_kb.jpg'
        downloadSize='500000'
        callbackFunctionOnNetworkDown={(speed) => console.log(`Internet speed is down ${speed}`)}
        callbackFunctionOnNetworkTest={(speed) => setwifiSpeed(speed)}
      />
    </div>
  );
};

export default BandwidthTest;
