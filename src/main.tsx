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

import AttemptAssignment from './pages/lessons/quizAndAssignment/AttemptAssignment.tsx'
import Unauthorized from './Unauthorize.tsx'
import Logout from './pages/Logout.tsx'
import MCQsCreateQuizFormProvider from './components/Forms/FormProviders/MCQsCreateQuizFormProvider.tsx'
import SubmitMCQQuizStudentFormProvider from './components/Forms/FormProviders/SubmitMCQQuizStudentFormProvider.tsx'
import MCQResults from './pages/lessons/quizAndAssignment/MCQResults.tsx'
import TeacherRegisterFormProvider from './components/Forms/FormProviders/TeacherRegiterFormProvider.tsx'
import SinglePendingTeacher from './pages/Teacher/SinglePendingTeacher.tsx'
import SingleStudentProfile from './pages/student/SingleStudentProfile.tsx'
import EnrolledCourseMoreInfo from './pages/courses/EnrolledCourseMoreInfo.tsx'
import StudentAllEnrolledCourses from './pages/dashboards/DashSettingsPages/StudentAllEnrolledCourses.tsx'
import StudentPendingEnrollments from './pages/dashboards/DashSettingsPages/StudentPendingEnrollments.tsx'
import StudentEnrollCourse from './pages/dashboards/DashSettingsPages/StudentEnrollCourse.tsx'
import CreateLabFromProvider from './components/Forms/FormProviders/CreateLabFromProvider.tsx'
import CreateLabChallengeFormProvider from './components/Forms/FormProviders/CreateLabChallengeFormProvider.tsx'
import LessonSettings from './pages/lessons/LessonSettings.tsx'
import CreateNewAssignmentProvider from './components/Forms/FormProviders/CreateNewAssignmentProvider.tsx'
import EditLabProvider from './components/Forms/FormProviders/EditForms/EditLabProvider.tsx'
import EditQuizFormProvider from './components/Forms/FormProviders/EditForms/EditQuizFormProvider.tsx'
import EditAssignmentProvider from './components/Forms/FormProviders/EditForms/EditAssignmentProvider.tsx'
import ViewAllLabChallenges from './pages/Labs/ViewAllLabChallenges.tsx'
import EditLabChallengeFormProvider from './components/Forms/FormProviders/EditForms/EditLabChallengeFormProvider.tsx'
import EditLessonFormProvider from './components/Forms/FormProviders/EditForms/EditLessonFormProvider.tsx'
import ChallengeSubmissionFormProvider from './components/Forms/FormProviders/ChallengeSubmissionFormProvider.tsx'
import LabChallengesForStudents from './pages/lessons/quizAndAssignment/LabChallengesForStudent.tsx'
import DetailedLabResults from './pages/lessons/quizAndAssignment/DetailedLabResults.tsx'


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
      <Route element={<ProtectedRoute allowedRoles={["Teacher"]} />}>
        <Route path="/teacher-dash" element={<TeacherDashboard />} />
        <Route path="/create-new-course" element={<CreateNewCourseProvider />} />
        <Route path="/create-new-lesson/:courseId" element={<CreateNewLessonProvider />} />
        <Route path="/course-settings/:courseId" element={<CourseSettings />} />
        <Route path="/edit-course/:courseId" element={<EditExistingCourseProvider />} />
        <Route path="/create-MCQS-quiz/:lessonId" element={<MCQsCreateQuizFormProvider />} />
        <Route path="/handle-enrollment-approval/:enrollmentId" element={<SingleStudentProfile />} />
        <Route path="/create-lab/:lessonId" element={<CreateLabFromProvider />} />
        <Route path="/create-assignment/:lessonId" element={<CreateNewAssignmentProvider />} />
        <Route path="/lesson-settings/:lessonId" element={<LessonSettings />} />
        <Route path="/edit-quiz/:quizId" element={<EditQuizFormProvider />} />
        <Route path="/edit-lab/:labId" element={<EditLabProvider />} />
        <Route path="/edit-assignment/:assignmentId" element={<EditAssignmentProvider />} />
        <Route path="/add-lab-challenge/:labId" element={<CreateLabChallengeFormProvider />} />
        <Route path="/view-all-lab-challenge/:labId" element={<ViewAllLabChallenges />} />
        <Route path="/update-challenge/:challengeId" element={<EditLabChallengeFormProvider />} />
        <Route path="/update-lesson/:lessonId" element={<EditLessonFormProvider />} />

      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Student"]} />}>
        <Route path="/student-dash" element={<StudentDashboard />} />
        <Route path="/display-all-courses" element={<DisplayAllCourses />} />
        <Route path="/get-single-course-by-enrolled-student/:courseId" element={<EnrolledCourseInfo />} />
        <Route path="/attempt-challenge/:challengeId" element={<ChallengeSubmissionFormProvider />} />
        <Route path="/attempt-assignment/:lessonId" element={<AttemptAssignment />} />
        <Route path="/view-lab-challenges-student/:lessonId" element={<LabChallengesForStudents />} />
        <Route path="/attempt-MCQS-quiz/:lessonId" element={<SubmitMCQQuizStudentFormProvider />} />
        <Route path="/view-mcq-results-std/:submissionId" element={<MCQResults />} />
        <Route path="/enrolled-course-more-info/:courseId" element={<EnrolledCourseMoreInfo />} />
        <Route path="/all-enrolled-courses-settings" element={<StudentAllEnrolledCourses />} />
        <Route path="/all-pending-courses-settings" element={<StudentPendingEnrollments />} />
        <Route path="/enroll-in-a-course" element={<StudentEnrollCourse />} />
        <Route path="/detailed-lab-result/:challengeId" element={<DetailedLabResults />} />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="/admin-dash" element={<AdminDashboard />} />
        <Route path="/single-pending-teacher/:teacherId" element={<SinglePendingTeacher />} />
      </Route>
    </Route>
  )
);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
