import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles, Theme } from '@material-ui/core/styles';

const MetricSwitch = ({ metricName, selectedState, handleChange }) => {
  return (
    <>
      <FormControlLabel
        control={<Switch checked={selectedState} onChange={handleChange(metricName)} value={metricName} />}
        label={metricName}
      />
    </>
  );
};
