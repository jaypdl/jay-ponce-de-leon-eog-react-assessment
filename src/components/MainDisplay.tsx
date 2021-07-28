import React from 'react';
import SelectMetrics from '../Features/SelectMetrics/SelectMetrics';
import RealTimeData from '../Features/ManageData/RealTimeData';
import ManageData from '../Features/ManageData/ManageData';

export default () => {
  return (
    <>
      <RealTimeData />
      <SelectMetrics />
      <ManageData />
    </>
  );
};
