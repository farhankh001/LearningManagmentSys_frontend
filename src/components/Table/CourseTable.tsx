  import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_RowData, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton } from 'material-react-table';
  import { useTheme } from '@mui/material/styles';
  import { MRT_ColumnDef } from 'material-react-table';
  import { Box, Typography } from '@mui/material';


  interface ReusableTableProps<T extends MRT_RowData> {
    columns: MRT_ColumnDef<T>[];
    data: T[];
    title?: string;
    enableSorting?: boolean;
    enablePagination?: boolean;
    // other props
  }


  function ReusableTable<T extends MRT_RowData>({ columns, data = [], title = '', enableSorting = false, enablePagination = false }:ReusableTableProps<T>){
    const theme = useTheme();

    return (
     <MaterialReactTable
  columns={columns}
  data={data}
  enableSorting={enableSorting}
  enablePagination={enablePagination}
  enableColumnResizing
  muiTableBodyCellProps={{
    sx: { backgroundColor: theme.palette.primary.dark },
  }}
  muiTableHeadCellProps={{
    sx: { backgroundColor: theme.palette.background.paper, color: 'white' },
  }}
  displayColumnDefOptions={{
    // Optionally hide column actions too
    'mrt-row-actions': { size: 0 },
  }}
  // renderTopToolbarCustomActions={null} // disables custom top toolbar actions
      // disables bottom toolbar
 renderTopToolbar={({ table }) => (
  <Box sx={{ overflowX: 'auto', p: 1.5,backgroundColor:theme.palette.primary.main }}>
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      gap={2}
      minWidth="fit-content" // ✅ ensures it scrolls when content overflows
    >
      <Typography variant="h6" fontWeight={600}>
        {title}
      </Typography>
      <Box display="flex" gap={1} alignItems="center">
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ToggleFiltersButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />
      </Box>
    </Box>
  </Box>
)}
           // ✅ disable default top toolbar
  enableBottomToolbar={false}  
 enableColumnActions={false}
        // ✅ disable default bottom toolbar
/>

      
    );
  };

  export default ReusableTable;
