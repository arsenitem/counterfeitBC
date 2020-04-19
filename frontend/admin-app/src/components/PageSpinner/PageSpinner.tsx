
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './PageSpinner.module.scss'

const PageSpinner = () => {
  return (
    <div className={styles['spinner-container']}>
      <CircularProgress size={50}/>
    </div>
  );
};

export default PageSpinner;
