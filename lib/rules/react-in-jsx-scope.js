import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Tabs, Tab } from '@mui/material';

function MyDataGrid({ data }) {
  // Extract environment column names
  const environmentColumns = Object.keys(data[0]).filter(key => key !== 'row_name');

  // Create tabs data
  const tabs = environmentColumns.map(key => ({ label: key, value: key }));

  // State for selected tab
  const [selectedTab, setSelectedTab] = useState(tabs[0].value);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  // Define DataGrid columns
  const columns = [
    { field: 'row_name', headerName: 'Row Name', width: 150 },
    ...environmentColumns.map(key => ({
      field: key,
      headerName: key,
      width: 150,
      // Conditionally render based on selected tab
      hide: key !== selectedTab,
    })),
  ];

  return (
    <>
      <Tabs value={selectedTab} onChange={handleTabChange}>
        {tabs.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      <DataGrid rows={data} columns={columns} />
    </>
  );
}
