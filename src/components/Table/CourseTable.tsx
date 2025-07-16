import { MaterialReactTable, MRT_GlobalFilterTextField, MRT_RowData, MRT_ShowHideColumnsButton, MRT_ToggleDensePaddingButton, MRT_ToggleFiltersButton } from 'material-react-table';
import { alpha, useTheme } from '@mui/material/styles';
import { MRT_ColumnDef } from 'material-react-table';
import { Box, Typography, Chip } from '@mui/material';
import { Circle } from '@mui/icons-material';

interface ReusableTableProps<T extends MRT_RowData> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  title?: string;
  enableSorting?: boolean;
  enablePagination?: boolean;
  label?: string;
}

function ReusableTable<T extends MRT_RowData>({ 
  columns, 
  data = [], 
  title = '', 
  enableSorting = false, 
  enablePagination = false,
  label = ""
}: ReusableTableProps<T>) {
  const theme = useTheme();

  return (
    <Box sx={{ 
      border: `2px solid ${theme.palette.divider}`,
      borderRadius: 4,
      overflow: 'hidden',
    }}>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableSorting={enableSorting}
        enablePagination={enablePagination}
        enableColumnResizing
        enableRowSelection={false}
        enableSelectAll={false}
        
        // Global filter settings - make sure these are properly set
        enableGlobalFilter={true}
        enableGlobalFilterModes={true}
        globalFilterFn="contains"
        
        // Make sure search functionality is enabled
        enableFilters={true}
        enableColumnFilters={true}
        
        muiTableContainerProps={{
          sx: { 
            maxHeight: 'none'
          }
        }}
        muiTableBodyCellProps={{
          sx: { 
            borderBottom: `1px solid ${theme.palette.text.disabled}`,
            borderRight: `1px solid ${theme.palette.text.disabled}`,
            padding: '12px 16px',
            fontSize: '14px',
            color: theme.palette.text.primary,
            '&:last-child': {
              borderRight: 'none'
            }
          }
        }}
        muiTableHeadCellProps={{
          sx: { 
            borderBottom: `1px solid ${theme.palette.text.disabled}`,
            borderRight: `1px solid ${theme.palette.text.disabled}`,
            padding: '12px 16px',
            fontSize: '12px',
            fontWeight: 600,
            color: theme.palette.text.secondary,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            '&:last-child': {
              borderRight: 'none'
            }
          }
        }}
        muiTableBodyRowProps={() => ({
          sx: {
            '&:hover': {
              backgroundColor: theme.palette.action.hover
            },
            '&:last-child td': {
              borderBottom: 'none'
            }
          }
        })}
        displayColumnDefOptions={{
          'mrt-row-actions': { size: 0 }
        }}
        renderTopToolbar={({ table }) => (
          <Box sx={{ 
            borderBottom: `1px solid ${theme.palette.text.disabled}`,
            p: 2
          }}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              minWidth="fit-content"
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Typography variant="h6" fontWeight={600} color={theme.palette.text.primary}>
                  {title}
                </Typography>
                {label && (
                  <Box    sx={{
                      borderColor: alpha(theme.palette.warning.light, 0.4),
                      color: theme.palette.text.primary,
                      fontSize: '12px',
                      background: alpha(theme.palette.warning.light, 0.5),
                      py:0.5,px:2,borderRadius:4,display:"flex",alignItems:"center",gap:1
   
                    }}> 
                   
                      <Circle
                        sx={{
                          fontSize: 10,
                          color: `${theme.palette.warning.light}`,
                          boxShadow: `0 0 6px 2px ${theme.palette.warning.light}`,
                          borderRadius: '50%',  
                          background: theme.palette.warning.light
                        }} 
                      />
                    
                 <Typography variant='caption' fontWeight={600}> {label} </Typography>
                   
                 
                  </Box>
                )}
              </Box>
              <Box display="flex" gap={1} alignItems="center">
                {/* Global filter search bar */}
                <MRT_GlobalFilterTextField 
                  table={table} 
                  placeholder=""
                  sx={{
                    minWidth: '200px', // Ensure minimum width
                    '& .MuiInputBase-root': {
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 0,
                      fontSize: '14px',
                      height: '36px' // Explicit height
                    },
                    '& .MuiInputBase-input': {
                      padding: '8px 12px'
                    }
                  }}
                />
                <MRT_ToggleFiltersButton 
                  table={table}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                />
                <MRT_ShowHideColumnsButton 
                  table={table}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                />
                <MRT_ToggleDensePaddingButton 
                  table={table}
                  sx={{
                    color: theme.palette.text.secondary,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover
                    }
                  }}
                />
              </Box>
            </Box>
          </Box>
        )}
        enableBottomToolbar={false}  
        enableColumnActions={false}
        initialState={{
          density: 'comfortable',
          showGlobalFilter: true, // Ensure global filter is shown
        }}
        // Custom styling for column filters
        muiFilterTextFieldProps={{
          sx: {
            '& .MuiInputBase-root': {
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              fontSize: '14px'
            }
          }
        }}
      />
    </Box>
  );
}

export default ReusableTable;