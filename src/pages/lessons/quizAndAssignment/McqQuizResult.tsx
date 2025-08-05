import { CancelOutlined, CheckCircleOutline, Circle, LiveHelpOutlined } from '@mui/icons-material'
import { Box, Typography, useTheme, alpha } from '@mui/material'


import { MCQQuizResults } from '../../../app/api/lessonApi'
import BarChartMainDash from '../../dashboards/DashCharts/BarChartMaindash'
import LessonProgressCard from '../../dashboards/DashCards/LessonProgressCard'

interface McqQuizResultProps {
  results: MCQQuizResults;
  title: string;
  desc?: string;
  hasAttempted?: boolean
}

function McqQuizResult({ results, title }: McqQuizResultProps) {
  const theme = useTheme()
  return <Box sx={{ width: '100%', display: "flex", flexDirection: "column", }}>
    <Box sx={{ width: "85%", display: "flex", flexDirection: "column", ml: 2 }}>
      <Typography variant="body2" fontWeight={550} sx={{ color: theme.palette.text.secondary, mb: 2, mt: 2 }}>{`Dashboard / Courses / Lab / Attempt Lab`}</Typography>
      <Box sx={{ display: "flex", mb: 2 }}>  <Typography variant="caption" fontWeight={500} sx={{
        background: alpha(theme.palette.primary.main, 0.3), color: theme.palette.text.secondary, px: 1.5, py: 0.4, borderRadius: 2.5, fontSize: "0.67rem", display: "flex", gap: 1.5, alignItems: "center"
      }}><Circle sx={{
        fontSize: 6,
        color: theme.palette.primary.main,
        boxShadow: `0 0 6px 2px ${theme.palette.primary.main}`,
        borderRadius: '50%',
        background: theme.palette.primary.main
      }} /> <span>Solved</span></Typography></Box>
      <Box>
        <Typography variant='caption' fontWeight={550} sx={{ color: theme.palette.text.secondary }}>COURSE TITLE</Typography>
        <Typography variant='h6' fontWeight={500} sx={{ color: theme.palette.text.primary }}>{results.courseTitle} ({results.courseSubTitle})</Typography>
      </Box>
      <Box>
        <Typography variant='caption' fontWeight={550} sx={{ color: theme.palette.text.secondary }}>LESSON TITLE</Typography>
        <Typography variant='h6' fontWeight={500} sx={{ color: theme.palette.text.primary }}>{title}</Typography>
      </Box>




      <Box sx={{ display: "flex", width: "100%", gap: 2, flexDirection: 'column' }}>
        <Typography variant='caption' fontWeight={550} sx={{ color: theme.palette.text.secondary }}>QUIZ RESULTS</Typography>
        <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
          <Box sx={{ display: "flex", alignItems: 'center', flexDirection: 'column', background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, }}>
            <Box sx={{ p: 1.5 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>TOTAL QUESTIONS</Typography>

            </Box>
            <Typography variant="h5"
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                textAlign: "center",
                color: theme.palette.primary.main, fontSize: "1.5rem", p: 1, borderTop: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "100%"
              }}>
              {results.totalQuestions}
            </Typography>

          </Box>
          <Box sx={{ display: "flex", alignItems: 'center', flexDirection: 'column', background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, }}>
            <Box sx={{ p: 1.5 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>CORRECT QUESTIONS</Typography>

            </Box>
            <Typography variant="h5"
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                textAlign: "center",
                color: theme.palette.success.light, fontSize: "1.5rem", p: 1, borderTop: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "100%"
              }}>
              {results.correctCount}
            </Typography>

          </Box>
          <Box sx={{ display: "flex", alignItems: 'center', flexDirection: 'column', background: alpha(theme.palette.primary.dark, 0.75), border: "1px solid", borderColor: theme.palette.divider, borderRadius: 3 }}>
            <Box sx={{ p: 1.5 }}>
              <Typography variant="caption" fontWeight={600} sx={{ color: theme.palette.text.secondary }}>INCORRECT QUESTIONS</Typography>

            </Box>
            <Typography variant="h5"
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 'bold',
                letterSpacing: '0.1rem',
                textAlign: "center",
                color: theme.palette.error.main, fontSize: "1.5rem", p: 1, borderTop: "1px solid", borderColor: theme.palette.divider, borderRadius: 3, width: "100%"
              }}>
              {results.totalQuestions - results.correctCount}
            </Typography>

          </Box>
        </Box>



      </Box>

    </Box>







    <Box sx={{ width: "85%", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, mb: 5, ml: 2, mt: 2 }}>

      {results.detailedResults.map((result, index) => <Box sx={{ width: "100%", border: "1px solid", borderColor: theme.palette.divider, padding: 3, margin: 0, display: "flex", flexDirection: "column", borderRadius: 4, background: alpha(theme.palette.primary.dark, 0.75), gap: 0.5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>QUESTION {index + 1} </Typography>
            <Typography fontWeight={500}>{result.questionText}</Typography>
          </Box>
          <Box>
            <Typography
              variant='caption'
              sx={{
                px: 2,
                py: 0.3,
                fontSize: { xs: "0.65rem", sm: "0.75rem" },
                fontWeight: 600,
                display: "flex", alignItems: "center", gap: 1
              }}
            >
              {result.isCorrect ? <CheckCircleOutline sx={{ fontSize: 20, color: theme.palette.success.light }} /> : <CancelOutlined sx={{ fontSize: 20, color: theme.palette.error.main }} />}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>CORRECTION STATUS</Typography>
          <Typography fontWeight={500}
            sx={{
              color: result.isCorrect
                ? theme.palette.success.main
                : theme.palette.error.main,
            }}
          >
            {result.isCorrect ? 'Correct Submission' : 'Incorrect submission'}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 8, }}>

          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>SELECTED</Typography>
            <Typography sx={{ fontWeight: 500 }}> {result.selectedAnswer}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ color: theme.palette.text.secondary }}>CORRECT</Typography>
            <Typography sx={{ fontWeight: 500 }}> {result.correctAnswer}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>EXPLANATION</Typography>
          <Typography>{result.explanation}</Typography>
        </Box>
      </Box>)}
    </Box>
  </Box>
}




export default McqQuizResult
