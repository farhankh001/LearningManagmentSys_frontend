import { ExpandMore, Insights, LibraryBooks, OndemandVideo, Download } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, alpha, Box, Button, Card, Chip, LinearProgress, Typography, useTheme } from '@mui/material'
import BiotechIcon from '@mui/icons-material/Biotech';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';

import DocViewer, { DocViewerRenderers, IDocument } from "@cyntler/react-doc-viewer";
import { JSX, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import ReactPlayer from 'react-player';
import ScienceIcon from '@mui/icons-material/Science';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuizIcon from '@mui/icons-material/Quiz';
import { FILEURLPRE } from '../../components/other/Defaulturl';

import { EnhancedLesson } from '../../app/api/studentDashApis';


interface DisplayLessonAndAssignmentprops {
  lessons: EnhancedLesson[] | undefined
}
type FilePreviewerProps = {
  fileUrl: string | null | undefined;
};
const CustomErrorRenderer = () => (
  <div>
    <p>Unable to display the document. Please check the URL or try again later.</p>
  </div>
);
function FilePreviewer({ fileUrl }: FilePreviewerProps): JSX.Element | null {
  if (!fileUrl) return null;

  const fileName = decodeURIComponent(fileUrl.split('/').pop() || 'file');
  const fileType = fileName.split('.').pop()?.toLowerCase() || '';

  const documents: IDocument[] = [
    {
      uri: fileUrl,
      fileType,
      fileName,
    },
  ];

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: "100%",
        mt: 2
      }}
    >

      {/* Ensure the viewer container doesn't clip or get overlapped */}
      <Box
        sx={{
          maxHeight: { xs: "50vh", sm: "50vh", md: "80vh", lg: "50vh" },
          border: '1px solid #ddd',
          borderRadius: 2,
          overflowY: 'auto',

        }}
      >
        <DocViewer
          documents={documents}
          pluginRenderers={DocViewerRenderers}
          style={{ width: '100%', height: '100%' }}
          config={{
            header: {
              disableFileName: false,
              disableHeader: false,


            },
            pdfVerticalScrollByDefault: true,

            noRenderer: {
              overrideComponent: CustomErrorRenderer,
            },

          }}
        />
      </Box>
    </Card>
  );
}

function DisplayLessonAndAssignment({ lessons }: DisplayLessonAndAssignmentprops) {
  const authUser = useSelector((state: RootState) => state.auth.user)
  const [expanded, setExpanded] = useState<number | null>(null)
  console.log(lessons)
  const theme = useTheme()

  return (
    lessons && lessons.map((lesson, index) => {
      return <Accordion
        key={lesson.id}
        expanded={expanded === index}
        sx={{
          backgroundColor: alpha(theme.palette.primary.dark, 0.5),
          borderRadius: '16px !important', // Use !important to override default
          border: "1px solid",
          borderColor: theme.palette.divider,

          '&:before': {
            display: 'none', // Remove default MUI border
          },
          '&.Mui-expanded': {
            margin: '0 0 16px 0', // Override expanded margin
          },
          // Target the root element when expanded
          '&.MuiAccordion-root': {
            borderRadius: '16px !important',
          },
          // Override summary styling
          '& .MuiAccordionSummary-root': {
            borderRadius: '16px',
            borderBottomLeftRadius: expanded === index ? 0 : '16px',
            borderBottomRightRadius: expanded === index ? 0 : '16px',
            minHeight: 48,
            '&.Mui-expanded': {
              minHeight: 48,
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
          },
          // Override details styling
          '& .MuiAccordionDetails-root': {
            borderTop: `1px solid ${theme.palette.divider}`,
            borderBottomLeftRadius: '16px',
            borderBottomRightRadius: '16px',
            padding: 0, // Remove default padding since we add our own
          },
        }}
        onChange={(_, isExpanded) => setExpanded(isExpanded ? index : null)}
      >
        <AccordionSummary
          expandIcon={<ExpandMore />}
          sx={{
            // Additional summary styling if needed
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 0,
              width: "100%",
              pl: 2,
              pr: 3,
              py: 0.5,
              flexDirection: "column",
            }}
          >
            <Box sx={{ display: "flex", gap: 1.5, flexDirection: "column" }}>
              <Box>
                <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontSize: "0.7rem" }}>
                  LESSON NO {index + 1}
                </Typography>
                <Typography variant="h6" sx={{}}>
                  <span>{lesson.title}</span>
                </Typography>
              </Box>

              {/* Completion Chips */}


              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {/* Lab Status */}
                <Chip
                  icon={<BiotechIcon sx={{ fontSize: "13px !important" }} />}
                  label={
                    lesson.hasLab
                      ? lesson.attemptedLab
                        ? "Lab Completed"
                        : "Lab Not Completed"
                      : "No Lab"
                  }
                  variant="outlined"
                  color={
                    lesson.hasLab
                      ? lesson.attemptedLab
                        ? "success"
                        : "warning"
                      : "default"
                  }
                  size="small"
                  sx={(theme) => ({
                    backgroundColor: lesson.hasLab
                      ? lesson.attemptedLab
                        ? alpha(theme.palette.success.main, 0.4)
                        : alpha(theme.palette.background.paper, 1)
                      : alpha(theme.palette.grey[500], 0.25),
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: { xs: 10, sm: 11 },
                    px: 2, borderRadius: 2
                  })}
                />

                {/* Assignment Status */}
                <Chip
                  icon={<AssignmentTurnedInIcon sx={{ fontSize: "13px !important" }} />}
                  label={
                    lesson.hasAssignment
                      ? lesson.attemptedAssignment
                        ? "Assignment Completed"
                        : "Assignment Not Completed"
                      : "No Assignment"
                  }
                  variant="outlined"
                  color={
                    lesson.hasAssignment
                      ? lesson.attemptedAssignment
                        ? "success"
                        : "warning"
                      : "default"
                  }
                  size="small"
                  sx={(theme) => ({
                    backgroundColor: lesson.hasAssignment
                      ? lesson.attemptedAssignment
                        ? alpha(theme.palette.success.main, 0.4)
                        : alpha(theme.palette.background.paper, 1)
                      : alpha(theme.palette.grey[500], 0.25),
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: { xs: 10, sm: 11 },
                    px: 2, borderRadius: 2
                  })}
                />

                {/* Quiz Status */}
                <Chip
                  icon={<QuizIcon sx={{ fontSize: "13px !important" }} />}
                  label={
                    lesson.hasMcq
                      ? lesson.attemptedMcq
                        ? "Quiz Completed"
                        : "Quiz Not Completed"
                      : "No Quiz"
                  }
                  variant="outlined"

                  size="small"
                  sx={(theme) => ({
                    backgroundColor: lesson.hasMcq
                      ? lesson.attemptedMcq
                        ? alpha(theme.palette.success.main, 0.4)
                        : alpha(theme.palette.background.paper, 1)
                      : alpha(theme.palette.grey[500], 1),
                    color: theme.palette.text.primary,
                    fontWeight: 700,
                    border: `1px solid ${theme.palette.divider}`,
                    fontSize: { xs: 10, sm: 11 },
                    px: 2, py: 1, borderRadius: 2
                  })}
                />
              </Box>
            </Box>

            {/* Quiz Score Progress */}
            {/* {lesson.isCompletedLesson === "COMPLETED" && (
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0.5,
                  mb: 0.5,
                }}
              >
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontSize={14}
                  sx={{ mt: 1 }}
                >
                  {lesson.mcqPercentage ?? 0}% Quiz Score
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={lesson.mcqPercentage ?? 0}
                  color="success"
                />
              </Box>
            )} */}
          </Box>

        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ padding: 3 }}>
            <Typography sx={{ display: 'flex', alignItems: "center", gap: 1, mb: 1, background: theme.palette.text.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }} variant="body2" fontWeight={550}><OndemandVideo sx={{ color: theme.palette.text.secondary, fontSize: 17 }} /><span>LESSON VIDEO</span> </Typography>
            {lesson.url_video && <Box sx={{ width: "100%", height: "70vh" }}><ReactPlayer url={lesson.url_video} width="100%"
              height="100%" controls /></Box>}
            <Box sx={{ mt: 3 }}>
              <Typography sx={{ display: 'flex', alignItems: "center", gap: 1, mb: 0.5, background: theme.palette.text.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }} variant="body2" fontWeight={550}><OndemandVideo sx={{ color: theme.palette.text.secondary, fontSize: 17 }} /><span>DESCRIPTION</span> </Typography>
              <Box
                dangerouslySetInnerHTML={{ __html: lesson.lesson_text }}
                sx={{
                  mt: 0.5, fontSize: "0.95rem"
                }}
              />
            </Box>
            <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
              {
                lesson.url_docs && <Box>
                  <Typography sx={{ display: 'flex', alignItems: "center", gap: 1, mb: 1, background: theme.palette.text.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }} variant="body2" fontWeight={550}><OndemandVideo sx={{ color: theme.palette.text.secondary, fontSize: 17 }} /><span>DOCUMENT 1</span> </Typography>
                  {expanded == index && lesson.url_docs ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      href={`${FILEURLPRE}/${lesson.url_docs}`}
                      download
                      target="_blank"
                      startIcon={<Download sx={{ fontSize: "16px !important" }} />}
                      sx={{
                        px: { xs: 1.5, sm: 2 },
                        py: 1,
                        fontWeight: 600,
                        textTransform: 'none',
                        background: theme.palette.background.paper,
                        border: '1px solid',
                        borderRadius: 2,
                        borderColor: theme.palette.divider,
                        color: theme.palette.text.primary,
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        minWidth: "auto",
                        whiteSpace: "nowrap"
                      }}
                    >
                      Download Document
                    </Button>)
                    : null}
                </Box>
              }

              {expanded == index && lesson.url_doc2 ? (
                <Box>
                  <Typography sx={{ display: 'flex', alignItems: "center", gap: 1, mb: 1, background: theme.palette.text.secondary, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", }} variant="body2" fontWeight={550}><OndemandVideo sx={{ color: theme.palette.text.secondary, fontSize: 17 }} /><span>DOCUMENT 2</span> </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    href={`${FILEURLPRE}/${lesson.url_doc2}`}
                    download
                    target="_blank"
                    startIcon={<Download sx={{ fontSize: "16px !important" }} />}
                    sx={{
                      px: { xs: 1.5, sm: 2 },
                      py: 1,
                      fontWeight: 600,
                      textTransform: 'none',
                      background: theme.palette.background.paper,
                      border: '1px solid',
                      borderRadius: 2,
                      borderColor: theme.palette.divider,
                      color: theme.palette.text.primary,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      minWidth: "auto",
                      whiteSpace: "nowrap"
                    }}
                  >
                    Download Document 2
                  </Button></Box>
              ) : null}
            </Box>
          </Box>
          {authUser?.role === "Student" && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
                p: 3,
                flexWrap: "wrap",
                borderTop: `1px solid ${theme.palette.divider}`,
              }}
            >
              {/* Lab Button */}
              {lesson.hasLab && (
                <Button
                  component={Link}
                  to={`/view-lab-challenges-student/${lesson.id}`}
                  variant="outlined"
                  startIcon={<ScienceIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    background: theme.palette.background.paper,
                    border: '1px solid',
                    borderRadius: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    minWidth: "auto",
                    whiteSpace: "nowrap"
                  }}
                >
                  {lesson.attemptedLab ? "See Lab Result" : "Attempt Lab"}
                </Button>
              )}

              {/* Assignment Button */}
              {lesson.hasAssignment && (
                <Button
                  component={Link}
                  to={`/attempt-assignment/${lesson.id}`}
                  variant="outlined"
                  startIcon={<AssignmentIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    background: theme.palette.background.paper,
                    border: '1px solid',
                    borderRadius: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    minWidth: "auto",
                    whiteSpace: "nowrap"
                  }}
                >
                  {lesson.attemptedAssignment ? "See Assignment Result" : "Attempt Assignment"}
                </Button>
              )}

              {/* MCQ Quiz Button */}
              {lesson.hasMcq && !lesson.attemptedMcq && (
                <Button
                  component={Link}
                  to={`/attempt-MCQS-quiz/${lesson.id}`}
                  variant="outlined"
                  startIcon={<QuizIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    background: theme.palette.background.paper,
                    border: '1px solid',
                    borderRadius: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    minWidth: "auto",
                    whiteSpace: "nowrap"
                  }}
                >
                  Evaluate with MCQs
                </Button>
              )}
              {lesson.hasMcq && lesson.attemptedMcq && lesson.mcqSubmissionId && (
                <Button
                  component={Link}
                  to={`/view-mcq-results-std/${lesson.mcqSubmissionId}`}
                  variant="outlined"
                  startIcon={<QuizIcon sx={{ fontSize: 18 }} />}
                  sx={{
                    px: { xs: 1.5, sm: 2 },
                    py: 1,
                    fontWeight: 600,
                    textTransform: 'none',
                    background: theme.palette.background.paper,
                    border: '1px solid',
                    borderRadius: 2,
                    borderColor: theme.palette.divider,
                    color: theme.palette.text.primary,
                    fontSize: { xs: '0.7rem', sm: '0.8rem' },
                    minWidth: "auto",
                    whiteSpace: "nowrap"
                  }}
                >
                  See Quiz Result
                </Button>
              )}
            </Box>
          )}


        </AccordionDetails>
      </Accordion>

    })
  )
}

export default DisplayLessonAndAssignment