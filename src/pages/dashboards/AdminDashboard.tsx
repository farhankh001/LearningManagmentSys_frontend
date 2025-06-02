import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Rating,LinearProgress, Container, Button,} from "@mui/material";
import { CheckCircle, Cancel, AccountCircle, Create, UpdateSharp, StarRate, Group, MenuBook, AttachMoney, Stars } from '@mui/icons-material';
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import CourseTable from "../../components/Table/CourseTable";

import { MRT_ColumnDef } from "material-react-table";
import { PendingTeacher, useGetAdminApprovalQuery, useGetAdminTeacherStatsQuery, useGetAllPendingTeachersQuery } from "../../app/api/adminApis";
import LoadingScreen from "../../components/other/Loading";

export interface CourseTeacherDashType {
    id:string;
    title: string;
    activationStatus:string ;
    createdAt: string;
    totalEnrollmentsPerCourse:number
}

const courseAdminDashColumns: MRT_ColumnDef<PendingTeacher>[] = [

  {
    header: 'Name',
    accessorKey: 'name',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Qualifications',
    accessorKey: 'qualifications',
  },
  {
    header: 'Applied At',
    accessorKey: 'applied_date',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
   {
  header: 'Manage Requests',
  accessorKey: 'id', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => {
    const teacherId = cell.row.original.teacherId; // Access nested course ID safely
    return (
      <Button
        component={Link}
        to={`/single-pending-teacher/${teacherId}`}
        variant="contained"
        size="small"
      >
        Manage
      </Button>
    );
  },
}
 
];


function AdminDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme=useTheme()
  const {data:pendingTeacherData,isError:isErrorGetPendingTeacher,isLoading:isFetchingPendingTeacher,isSuccess:isSuccessPendingTeacher,error:errorPendingTeacher}=useGetAllPendingTeachersQuery()
  const{data:adminApprovalStatus,isError:approvalIsError,isLoading:approvalLoading,isSuccess:approvalSuccess,error:approvalError}=useGetAdminApprovalQuery()
  const {data:adminStats,isError:adminStatsIsError,isLoading:adminIsLoading,error:adminStatsError}=useGetAdminTeacherStatsQuery()
  if(adminIsLoading||approvalLoading||isFetchingPendingTeacher){
    return <LoadingScreen/>
  }
  const isAnyError =
  isErrorGetPendingTeacher ||
  approvalIsError ||
  adminStatsIsError;

  const errorMessage =
  (errorPendingTeacher && "data" in errorPendingTeacher && (errorPendingTeacher.data as any).error) ||
  (approvalError && "data" in approvalError && (approvalError.data as any).error) ||
  (adminStatsError && "data" in adminStatsError && (adminStatsError.data as any).error);

  if (isAnyError) {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h5" color="error">
        Something went wrong while loading the dashboard.
      </Typography>
      <Typography variant="body1" sx={{ mt: 2 }}>
        {typeof errorMessage === 'string' ? errorMessage : 'Unknown error occurred.'}
      </Typography>
    </Box>
  );
}


  if (!user) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">Please login to view dashboard</Typography>
      </Box>
    );
  }
  
  if(adminApprovalStatus?.status==="PENDING"){
    <Box sx={{width:"100%",height:"70vh",display:"flex",flexDirection:"column",gap:3}}>
      <Typography variant="h2">
        You are not approved admin yet. Your request is pending
      </Typography>
      <Chip typeof="warning" about="Pending"
      />
    </Box>
  }
   if(adminApprovalStatus?.status==="REJECTED"){
    <Box sx={{width:"100%",height:"70vh",display:"flex",flexDirection:"column",gap:3}}>
      <Typography variant="h2">
        Your Request was rejected. Stay around admin may change his mind in futur.
      </Typography>
      <Chip typeof="error" about="Rejected"
      />
    </Box>
  }

  if(user.role!=="Admin"||adminApprovalStatus?.status!=="APPROVED"){
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">You are not authorized to access this page.</Typography>
      </Box>
    );
  }
   
  const { name, email, profile_picture, email_verified,role } = user;
  const settingsOptions=[
    {
        name:"Admin Settings",
        path:"/",
        icon:<Create />
    }, 
    {
        name:"Place Holder",
        path:"/",
        icon:<UpdateSharp />
    },
   

]
  const analytics = [
  {
    title: "Total Teachers",
    icon: <StarRate />,
    desc:"Total teachers both pending and approved.",
    value: adminStats?.data.totalTeachers
  },
  {
    title: "Approved Teachers",
    icon: <Group />,
    desc:"Total approved teachers by admin",
    value: adminStats?.data.approvedTeachers
  },
  {
    title: "Rejected Teachers",
    icon: <MenuBook />,
    desc:"Number of teachers rejected by admin",
    value:  adminStats?.data.rejectedTeachers
  },
  {
    title: "Place holder",
    icon: <AttachMoney />,
    desc:"Will add data here later.",
    value: 0,
  },
  {
    title: "Place holder",
    icon: <Stars />,
    desc:"data will be added later",
    value: 0,
  },
];
  return (
      <Box sx={{padding:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
      <Box sx={{width: "90%", display:"flex", flexDirection:{  xs:"column",sm:"column",md:"column",lg:"row"
    },gap:3,padding:2,justifyContent:"center",alignItems:"start"}}>
      <Box sx={{width:{xs:"100%",sm:"100%",md:"100%",lg:"25%"},display:"flex",flexDirection:{xs:"column",sm:"row",md:"row",lg:"column"},alignItems:"center",justifyContent:"space-between",gap:3}}>
        {/* avatar with username etc */}
        <Box sx={{display:"flex", flexDirection:"column", alignItems:"center",justifyContent:"center",padding:3,gap:1,background:theme.palette.background.paper,width:"100%",boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`,borderRadius:4}}>
          <Avatar src={profile_picture} sx={{
              width:80,
              height: 80,
            }}/>
              <Typography variant="h6">
          {name}
        </Typography>
         <Box sx={{display:"flex" ,flexDirection:"row",gap:1, alignItems:"center"}}>
             <Chip
                icon={email_verified ? <CheckCircle /> : <Cancel />}
                label={email_verified ? "Verified" : "Not Verified"}
                color={email_verified ? "success" : "error"}
                size="small"
                  />
              <Chip
                icon={<AccountCircle/>}
                label={role}
                color="primary"
                size="small"
                 />
          </Box>
        </Box>
      
  
      </Box>



      <Box>
        <Box sx={{display:"grid",gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr', md: '1fr 1fr 1fr 1fr',lg:"1fr 1fr 1fr 1fr 1fr"},
          gap: { xs: 2, md: 2},
          justifyContent: 'center',maxWidth:"100%"}}>

           {analytics.map((analytic,index)=>(
            <Box sx={{background:theme.palette.background.paper,padding:4,display:"flex",flexDirection:"column",gap:1,boxShadow:`-1.5px 4px 2px  rgba(0, 0, 0, 0.39)`,borderRadius:4}} key={index} >
          <Typography variant="body1" fontWeight={600}>
            {analytic.title}
          </Typography>
           
         <Box sx={{display:"flex",gap:0.6}}>
           <Typography variant="h6" sx={{color:theme.palette.primary.light}}>
            {analytic.icon}
          </Typography>
          <Typography variant="h5" fontWeight={600}>
            {analytic.value}
          </Typography>
        
         </Box>
           <Typography variant="caption">
            {analytic.desc}
          </Typography>
        </Box>
           ))}
          
        </Box>
        
      </Box>
          
    </Box>
         
    <Box sx={{width:"90%",mt:3,mb:3,display:"flex",gap:3,flexDirection:{xs:"column",sm:"column",md:"column",lg:"row",alignItems:"start",justifyContent:"center"}}}>
       <Box sx={{background:theme.palette.background.paper,width:{xs:"100%",sm:"100%",md:"100%",lg:"20%"},display:"flex",flexDirection:"column", }}>
          <Typography variant="h6" sx={{backgroundColor:theme.palette.primary.main,padding:1,color:"white"}}>
            Settings
          </Typography>
          <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"row",md:"row",lg:"column"}}}>
           {
            settingsOptions.map((item)=><Box  key={item.name}>
                    <ListItem disablePadding>
                    <ListItemButton  component={Link} to={item.path}>
                        <ListItemIcon >
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText >
                            {item.name}
                        </ListItemText>
                  </ListItemButton>
                  </ListItem>
                  <Divider/>
                  </Box>)
           }
           </Box>
        </Box>
      <CourseTable<PendingTeacher> columns={courseAdminDashColumns} data={pendingTeacherData?.pending_teachers?? []} title={"Pending Teachers"}/>
    </Box>
      </Box>
  );
}

export default AdminDashboard;

