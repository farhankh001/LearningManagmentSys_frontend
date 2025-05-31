import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/Layouts/Layout.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import RegisterFormProvider from './components/Forms/FormProviders/RegisterFormProvider.tsx'
import LoginFromProvider from './components/Forms/FormProviders/LoginFromProvider.tsx'
import StudentDashboard from './pages/dashboards/StudentDashboard.tsx'
import AdminDashboard from './pages/dashboards/AdminDashboard.tsx'
import TeacherDashboard from './pages/dashboards/TeacherDashboard.tsx'
import Landing from './pages/Landing.tsx'
import CreateNewCourseProvider from './components/Forms/FormProviders/CreateNewCourseProvider.tsx'
import DisplayAllCourses from './pages/DisplayAllCourses.tsx'
import SingleCourseDetails from './pages/courses/SingleCourseDetails.tsx'
import CreateNewLessonProvider from './components/Forms/FormProviders/CreateNewLessonProvider.tsx'
import CourseSettings from './pages/courses/CourseSettings.tsx'
import EnrolledCourseInfo from './pages/courses/EnrolledCourseInfo.tsx'
import ProtectedRoute from './ProtectedRoutes.tsx'
import EditExistingCourseProvider from './components/Forms/FormProviders/EditExistingCourseProvider.tsx'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import AttemptQuiz from './pages/lessons/quizAndAssignment/AttemptQuiz.tsx'
import AttemptAssignment from './pages/lessons/quizAndAssignment/AttemptAssignment.tsx'
import Unauthorized from './Unauthorize.tsx'
import Logout from './pages/Logout.tsx'
import Quiz from './pages/courses/MCQsBasedQuiz.tsx'
import QuizMCQS from './pages/courses/QuizMCQS.tsx'
import MCQsCreateQuizFormProvider from './components/Forms/FormProviders/MCQsCreateQuizFormProvider.tsx'
import SubmitMCQQuizStudentFormProvider from './components/Forms/FormProviders/SubmitMCQQuizStudentFormProvider.tsx'
import MCQResults from './pages/lessons/quizAndAssignment/MCQResults.tsx'
import TeacherRegisterFormProvider from './components/Forms/FormProviders/TeacherRegiterFormProvider.tsx'


 // Types
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  answers: Array<{
    questionId: string;
    selectedAnswer: number;
    isCorrect: boolean;
  }>;
}




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout />}>
      {/* Public Routes */}
      <Route path="/" element={<App />} />
      <Route path="/register" element={<RegisterFormProvider />} />
      <Route path="/login" element={<LoginFromProvider />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/single-course-details/:courseId" element={<SingleCourseDetails />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/teacher-register" element={<TeacherRegisterFormProvider />} />
      <Route element={<ProtectedRoute />}> {/* No role check here */}
          <Route path="/logout" element={<Logout />} />
      </Route>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={["Teacher"]}/>}>
        <Route path="/teacher-dash" element={<TeacherDashboard />} />
        <Route path="/create-new-course" element={<CreateNewCourseProvider />} />
        <Route path="/create-new-lesson/:courseId" element={<CreateNewLessonProvider />} />
        <Route path="/course-settings/:courseId" element={<CourseSettings />} />
        <Route path="/edit-course/:courseId" element={<EditExistingCourseProvider/>} />
       <Route path="/create-MCQS-quiz/:lessonId" element={<MCQsCreateQuizFormProvider/>}/>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Student"]}/>}>
        <Route path="/student-dash" element={<StudentDashboard />} />
        <Route path="/display-all-courses" element={<DisplayAllCourses />} />
        <Route path="/get-single-course-by-enrolled-student/:courseId" element={<EnrolledCourseInfo />} />
        <Route path="/attempt-quiz/:lessonId" element={<AttemptQuiz/>}/>
        <Route path="/attempt-assignment/:lessonId" element={<AttemptAssignment/>}/>
        <Route path="/logout" element={<Logout/>} />
         <Route path="/attempt-MCQS-quiz/:lessonId" element={<SubmitMCQQuizStudentFormProvider/>}/>
         <Route path="/view-mcq-results-std/:submissionId" element={<MCQResults/>}/>
          
      </Route>
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
