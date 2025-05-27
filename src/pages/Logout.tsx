import { Box, Typography,Button} from '@mui/material'
import { useLogOutUserMutation } from '../app/api/userApi'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { clearUser } from '../app/slices/authSlice'



function Logout() {
  const dispatch=useDispatch()
  const [logOutUser,{isSuccess,error}]=useLogOutUserMutation()

  const handleLogOut=async()=>{
    try {
      const res = await logOutUser().unwrap();
      toast.success(res.message || "Logged out successfully");
    } catch (err: any) {
      console.log(error)
      toast.error(err?.data?.error || "Logout failed");
    } finally {
      dispatch(clearUser());
    }

  }
  return (
    <Box sx={{p:{xs:2,lg:20},alignItems:"center",justifyContent:"center",display:"flex",flexDirection:"column",gap:3,maxWidth:"100%"}}>
     {isSuccess&&<Typography sx={{background:"background.paper",color:"success.light"}}>Logged Out Successfully.</Typography>}
      <Typography variant='h5' fontWeight={600}>
        Thank You For Visiting 
      </Typography>
      <Button variant='contained' onClick={handleLogOut}>
        Log Out
      </Button>
    </Box>
  )
}

export default Logout
