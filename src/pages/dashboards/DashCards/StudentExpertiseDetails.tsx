import { Box, Typography, useTheme, Chip, Stack } from '@mui/material';
import MilitaryTechOutlinedIcon from '@mui/icons-material/MilitaryTechOutlined';

interface StudentExpertise {
    category: string;
    techStack: string;
    level: string;
}

interface StudentExpertiseDetailProps {
    expertise: StudentExpertise[];
}

export const StudentExpertiseDetail = ({ expertise }: StudentExpertiseDetailProps) => {
    const theme = useTheme();

    if (!expertise || expertise.length === 0) return null;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>


            <Stack spacing={2}>
                {expertise.map((item, index) => (
                    <Box>
                        <Typography variant="caption" fontWeight={100} sx={{ display: "flex", alignItems: 'center', gap: 1 }}><MilitaryTechOutlinedIcon sx={{ fontSize: 14 }} /><span>{item.level.toUpperCase()}</span></Typography>
                        <Typography key={index} variant="body2" fontWeight={100}>
                            {`${item.category} | ${item.techStack}`}
                        </Typography>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};
