import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
// import { withStyles, Theme } from '@material-ui/core/styles';

type Props = {
  metricName: string;
  selectedState: boolean;
  handleClick: React.ChangeEventHandler;
};

export default ({ metricName, selectedState, handleClick }: Props) => {
  return (
    <>
      <FormControlLabel
        control={<Switch checked={selectedState} onChange={handleClick} value={metricName} />}
        label={metricName}
      />
    </>
  );
};
