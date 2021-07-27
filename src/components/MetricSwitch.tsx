import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

type Props = {
  metricName: string;
  selectedState: boolean;
  handleClick: React.ChangeEventHandler;
};

export default ({ metricName, selectedState, handleClick }: Props) => {
  return (
    <>
      <FormControlLabel
        control={<Switch checked={selectedState} onChange={handleClick} value={metricName} color="primary" />}
        label={metricName}
      />
    </>
  );
};
