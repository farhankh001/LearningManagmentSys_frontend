import { Box, Typography, useTheme, Chip, Stack } from '@mui/material';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

interface StudentCertificationsDetailProps {
    certifications: { name: string }[];
}

export const StudentCertificationsDetail = ({ certifications }: StudentCertificationsDetailProps) => {
    const theme = useTheme();

    if (!certifications || certifications.length === 0) return null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>

            {certifications.map((cert, index) => (
                <Box sx={{}}>
                    <Typography variant="caption" fontWeight={100} sx={{ display: "flex", alignItems: 'center', gap: 1 }}><WorkspacePremiumOutlinedIcon sx={{ fontSize: 14 }} /><span>CERTIFICATE {index + 1}</span></Typography>
                    <Typography key={index} variant="body2" fontWeight={100}>
                        {cert.name}
                    </Typography>
                </Box>
            ))}

        </Box>
    );
};
