import { Box } from '@mui/material'
import FeaturesBoxes from './FeaturesBoxes'


function ProductSection() {
  return (
    <Box sx={{width:"100%",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:3,overflow:"hidden"}}>
      
        <Box sx={{display:'flex'}}>
            <FeaturesBoxes/>
        </Box>

        
         
    </Box>
  )
}

export default ProductSection
