// import React from 'react'

// function ViewStudentProfile() {
//     return (
//         <div>
//             {/* <Box>

//           <Box sx={{
//             width: { xs: "100%", lg: "75%" },
//             display: "flex",
//             flexDirection: "column",
//             gap: 2,
//             background: "linear-gradient(135deg,rgb(107, 91, 255) 0%,rgb(95, 68, 128) 100%)",
//             border: "1px solid",
//             borderColor: theme.palette.divider,
//             p: { xs: 2, sm: 3 },
//             borderRadius: 4
//           }}>
//             <Box sx={{
//               display: "flex",
//               flexDirection: { xs: "column", sm: "row" },
//               gap: 2,
//               alignItems: { xs: "flex-start", sm: "center" },
//               justifyContent: { xs: "flex-start", sm: "space-between" }
//             }}>
//               <Typography
//                 variant="h5"
//                 fontWeight={600}
//                 sx={{
//                   fontSize: { xs: '1.2rem', sm: '1.5rem' },
//                   textAlign: { xs: "center", sm: "left" },
//                   width: { xs: "100%", sm: "auto" }
//                 }}
//               >
//                 Teacher Course Management Portal
//               </Typography>
//               <Button
//                 startIcon={<AddCircleOutlineTwoTone sx={{
//                   fontSize: 10,
//                   color: theme.palette.text.primary,
//                   borderRadius: '50%',
//                 }} />}
//                 sx={{
//                   px: 2,
//                   py: 1,
//                   fontWeight: 500,
//                   boxShadow: `0 0 3px 0px ${theme.palette.success.light}`,
//                   textTransform: 'none',
//                   background: alpha(theme.palette.success.light, 0.6),
//                   border: '1px solid',
//                   borderRadius: 6,
//                   borderColor: theme.palette.divider,
//                   color: theme.palette.text.primary,
//                   width: { xs: "100%", sm: "auto" }
//                 }}
//                 component={Link}
//                 to={"/create-new-course"}
//                 size="small"
//               >
//                 Create new course
//               </Button>
//             </Box>

//             {/* Personal Details Grid */}
//             <Box
//                 sx={{
//                     display: 'grid',
//                     gridTemplateColumns: {
//                         xs: '1fr',
//                         sm: '1fr 1fr',
//                         md: 'repeat(3, 1fr)',
//                         lg: 'repeat(4, 1fr)',
//                         xl: 'repeat(5, 1fr)',
//                     },
//                     gap: { xs: 2, sm: 3 },
//                     p: { xs: 1, sm: 2 },
//                     borderRadius: 4,
//                 }}
//             >
//                 <PersonalDetails
//                     label="Email"
//                     value={studentProfile?.profile.user.email ?? "No email"}
//                     icon={<EmailOutlined sx={{ fontSize: 17 }} />}
//                 />

//                 {studentProfile?.profile.education?.level === "School/Collage" && (
//                     <PersonalDetails
//                         label="School/College"
//                         value={studentProfile.profile.education.schoolName || "Not provided"}
//                         icon={<BadgeOutlined sx={{ fontSize: 17 }} />}
//                     />
//                 )}

//                 {["Bachelor", "Master", "Phd"].includes(studentProfile?.profile.education?.level ?? "") && (
//                     <>
//                         <PersonalDetails
//                             label="Degree"
//                             value={studentProfile?.profile?.education?.degree || "Not provided"}
//                             icon={<BadgeOutlined sx={{ fontSize: 17 }} />}
//                         />
//                         <PersonalDetails
//                             label="University"
//                             value={studentProfile?.profile?.education?.university || "Not provided"}
//                             icon={<BadgeOutlined sx={{ fontSize: 17 }} />}
//                         />
//                     </>
//                 )}

//                 {studentProfile?.profile.certifications && studentProfile?.profile.certifications?.length > 0 && (
//                     <PersonalDetails
//                         label="Certifications"
//                         value={studentProfile.profile.certifications.join(", ")}
//                         icon={<Celebration sx={{ fontSize: 17 }} />}
//                     />
//                 )}
//             </Box>

//         </Box>
//         </Box > */
// }
//     </div >
//   )
// }

// export default ViewStudentProfile
