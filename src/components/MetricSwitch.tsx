import React from 'react';
import {
  FormControlLabel,
  Switch,
  FormHelperText,
  Grid,
  CardContent,
  Typography,
  CircularProgress,
} from '@material-ui/core';

type Props = {
  metricName: string;
  selectedState: boolean;
  data: {
    at: number;
    unit: string;
    value: number;
  };
  handleClick: React.ChangeEventHandler;
};

export default ({ metricName, selectedState, data, handleClick }: Props) => {
  if (!data) return <CircularProgress />;

  return (
    <CardContent>
      <Grid container justify="center" alignItems="center" direction="row">
        <Typography variant="h4">{data.value}</Typography>
        <FormHelperText>{data.unit}</FormHelperText>
        <FormControlLabel
          control={<Switch checked={selectedState} onChange={handleClick} value={metricName} color="primary" />}
          label={metricName}
          labelPlacement="bottom"
        />
      </Grid>
    </CardContent>
  );
};
