import  { useState } from "react";
import { useSelector } from "react-redux";
import {Box, Typography,Avatar,Chip, useTheme,ListItem,ListItemButton,Divider,ListItemIcon,ListItemText,Rating,LinearProgress, Container, Button,} from "@mui/material";
import { CheckCircle, Cancel, AccountCircle, Create, UpdateSharp, EighteenUpRating, BookSharp, Money, Celebration, StarRate, Group, MenuBook, AttachMoney, Stars } from '@mui/icons-material';
import { RootState } from "../../app/store";
import { Link } from "react-router-dom";
import CourseTable from "../../components/Table/CourseTable";
import { useCheckTeacherApprovalStatusQuery, useFetchAllCreatedCoursesByTeacherQuery } from "../../app/api/teacherDashApis";
import { FaUserGraduate } from "react-icons/fa";
import { MRT_ColumnDef } from "material-react-table";
import LoadingScreen from "../../components/other/Loading";

export interface CourseTeacherDashType {
    id:string;
    title: string;
    activationStatus:string ;
    createdAt: string;
    totalEnrollmentsPerCourse:number
}

const courseTeacherDashColumns: MRT_ColumnDef<CourseTeacherDashType>[] = [

  {
    header: 'Title',
    accessorKey: 'title',
  },
  {
    header: 'Activation Status',
    accessorKey: 'activationStatus',
   Cell: ({ cell }) => (
    <Chip
      label={cell.getValue<string>()}
      color={
        cell.getValue<string>() === 'ACTIVE'
          ? 'success'
          : cell.getValue<string>() === 'INACTIVE'
          ? 'warning'
          : 'default'
      }
      variant="outlined"
      size="small"
    />
  ),
  },
  {
    header: 'Total Enrollemnts',
    accessorKey: 'totalEnrollmentsPerCourse',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    Cell: ({ cell }) => new Date(cell.getValue<string>()).toLocaleDateString(),
  },
   {
  header: 'Manage Course',
  accessorKey: 'id', // This will *not* work if course is nested like course: { id: string }
  Cell: ({ cell }) => {
    const courseId = cell.row.original.id; // Access nested course ID safely
    return (
      <Button
        component={Link}
        to={`/course-settings/${courseId}`}
        variant="contained"
      >
        Settings
      </Button>
    );
  },
}
 
];

const settingsOptions=[
    {
        name:"Create New Course",
        path:"/create-new-course",
        icon:<Create />
    }, 
   
   

]
function TeacherDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const theme=useTheme()
  const {data:teacherDashData,isError:isErrorAllCoursesFetch,isLoading:isFetchingAllCoursesFetch,isSuccess:isSuccessAllCoursesFetch,error:errorAllCoursesFetch}=useFetchAllCreatedCoursesByTeacherQuery(null)
  const{data:teacherApprovalStatus,isError:approvalIsError,isLoading:approvalLoading,isSuccess:approvalSuccess,error:approvalError}=useCheckTeacherApprovalStatusQuery()
   if(isFetchingAllCoursesFetch||approvalLoading){
      return <LoadingScreen/>
    }
  const isAnyError =
  isErrorAllCoursesFetch ||
  approvalIsError

  const errorMessage =
  (errorAllCoursesFetch && "data" in errorAllCoursesFetch && (errorAllCoursesFetch.data as any).error) ||
  (approvalError && "data" in approvalError && (approvalError.data as any).error)
  if(teacherApprovalStatus?.status==="PENDING"){
    return <Box sx={{width:"100%",height:"70vh",display:"flex",flexDirection:"column",gap:3,justifyContent:"center",alignItems:"center"}}>
    <Box sx={{width:"50%",display:"flex",flexDirection:"column",textAlign:"center",gap:3}}>
        <Typography variant="h5">
        You are not approved teacher yet. Your request is pending
      </Typography>
      <Chip color="warning" label="Pending" variant="outlined" size="medium"
      />
    </Box>
    </Box>
  }
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
  if(teacherApprovalStatus?.status==="PENDING"){
    return <Box sx={{width:"100%",height:"70vh",display:"flex",flexDirection:"column",gap:3,justifyContent:"center",alignItems:"center"}}>
    <Box sx={{width:"50%",display:"flex",flexDirection:"column",textAlign:"center",gap:3}}>
        <Typography variant="h5">
        You are not approved teacher yet. Your request is pending
      </Typography>
      <Chip color="warning" label="Pending" variant="outlined" size="medium"
      />
    </Box>
    </Box>
  }
   if(teacherApprovalStatus?.status==="REJECTED"){
      return  <Box sx={{width:"100%",height:"70vh",display:"flex",flexDirection:"column",gap:3}}>
      <Typography variant="h2">
        Your Request was rejected. Stay around admin may change his mind in futur.
      </Typography>
      <Chip color="error" label="Rejected" variant="outlined" size="medium"
      />
    </Box>
  }

  if(user.role!=="Teacher"||teacherApprovalStatus?.status!=="APPROVED"){
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error">You are not authorized to access this page.</Typography>
      </Box>
    );
  }
   
  const { name,profile_picture, email_verified,role } = user;
  const analytics = [
  {
    title: "Average Rating",
    icon: <StarRate />,
    desc:"Total average rating across all courses.",
    value: teacherDashData?.averageRating,
  },
  {
    title: "Approved Student",
    icon: <Group />,
    desc:"Enrollment across all courses.",
    value: teacherDashData?.totalApprovedEnrollments,
  },
  {
    title: "Total Courses",
    icon: <MenuBook />,
    desc:"Number of courses created.",
    value: teacherDashData?.totalCourses,
  },
  {
    title: "Rejected Student",
    icon: <AttachMoney />,
    desc:"Total rejected enrollments across all courses.",
    value: teacherDashData?.totalRejectedEnrollments,
  },
  {
    title: "5 Star Ratings",
    icon: <Stars />,
    desc:"Total 5 start ratings.",
    value: teacherDashData?.fiveStarRatings,
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
      <CourseTable<CourseTeacherDashType> columns={courseTeacherDashColumns} data={teacherDashData?.courses ?? []} title={"Your Courses"}/>
    </Box>
      </Box>
  );
}

export default TeacherDashboard;

