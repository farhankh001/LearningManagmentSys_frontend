
import {
  School,
  Groups,
  AccessTime,
  Assessment,
  TrackChanges,
  WorkspacePremium,
  Create,
  Analytics,
  LiveTv,
  Assignment,
  Business,
  Dashboard,
  People,
  Settings,
} from '@mui/icons-material';
import { Box } from '@mui/material';
import  { FeatureCard,FeatureCardProps } from '../components/Layouts/FeatureCard'; // Fixed import path

// Mock API functions
const register_student = async () => console.log('Registering student...');
const register_teacher = async () => console.log('Registering teacher...');
const talk_to_managment = async () => console.log('Connecting to management...');

const features: FeatureCardProps[] = [
  {
    card_title: 'For Students',
    card_icon: <School fontSize="large" />,
    card_description: 'Access world-class learning materials and advance your skills.',
    feature: [
      { text: 'Self-paced learning', icon: <AccessTime /> },
      { text: 'Interactive assessments', icon: <Assessment /> },
      { text: 'Progress tracking', icon: <TrackChanges /> },
      { text: 'Certificate programs', icon: <WorkspacePremium /> },
    ],
    onButtonClick: register_student,
    button_text: "Register for free"
  },
  {
    card_title: 'For Teachers',
    card_icon: <Groups fontSize="large" />,
    card_description: 'Empower your teaching with powerful tools and reach students worldwide.',
    feature: [
      { text: 'Course creation tools', icon: <Create /> },
      { text: 'Student analytics', icon: <Analytics /> },
      { text: 'Live session hosting', icon: <LiveTv /> },
      { text: 'Assignment management', icon: <Assignment /> },
    ],
    onButtonClick: register_teacher,
    button_text: "Register for free"
  },
  {
    card_title: 'For Institutes',
    card_icon: <Business fontSize="large" />,
    card_description: 'Manage your institution efficiently with our comprehensive tools.',
    feature: [
      { text: 'Centralized dashboard', icon: <Dashboard /> },
      { text: 'Manage faculty and students', icon: <People /> },
      { text: 'Customizable settings', icon: <Settings /> },
      { text: 'Performance tracking', icon: <Analytics /> },
    ],
    onButtonClick: talk_to_managment,
    button_text: "Talk to management"
  },
];

function Landing() {
  return (
    <Box>
      <FeatureCard features={features} />
    </Box>
  );
}

export default Landing;