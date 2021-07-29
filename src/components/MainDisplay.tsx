import React from 'react';
import SelectMetrics from '../Features/SelectMetrics/SelectMetrics';
import RealTimeData from '../Features/ManageData/RealTimeData';
import ManageData from '../Features/ManageData/ManageData';
import Chart from '../Features/Charting/Chart';

export default () => {
  return (
    <>
      <RealTimeData />
      <SelectMetrics />
      <ManageData />
      <Chart />
    </>
  );
};
