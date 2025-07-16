import  { FC } from 'react'
import { Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import MuiLink from '@mui/material/Link'
import { navigationsDatafooter } from './navigation.data'
import FooterSectionTitle  from './footer-section-title'

const courseMenu = [
  { label: 'UI/UX Design', path: '#' },
  { label: 'Mobile Development', path: '#' },
  { label: 'Machine Learning', path: '#' },
  { label: 'Web Development', path: '#' },
]

const pageMenu = navigationsDatafooter

const companyMenu = [
  { label: 'Contact Us', path: '#' },
  { label: 'Privacy & Policy', path: '#' },
  { label: 'Term & Condition', path: '#' },
  { label: 'FAQ', path: '#' },
]

interface NavigationItemProps {
  label: string
  path: string
}

const NavigationItem: FC<NavigationItemProps> = ({ label, path }) => (
  <Link to={path}>
    <MuiLink
      underline="hover"
      sx={{
        display: 'block',
        mb: 1,
        color: 'primary.contrastText',
      }}
    >
      {label}
    </MuiLink>
  </Link>
)

const FooterNavigation: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 4,
        justifyContent: { sm: 'space-between' },
      }}
    >
      {/* Course Column */}
      <Box>
        <FooterSectionTitle title="Course" />
        {courseMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Box>

      {/* Menu Column */}
      <Box>
        <FooterSectionTitle title="Menu" />
        {pageMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Box>

      {/* Company Column */}
      <Box>
        <FooterSectionTitle title="About" />
        {companyMenu.map(({ label, path }, index) => (
          <NavigationItem key={index + path} label={label} path={path} />
        ))}
      </Box>
    </Box>
  )
}

export default FooterNavigation
