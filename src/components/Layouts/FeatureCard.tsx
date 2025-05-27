import { Typography, Box, Card, Button, useTheme } from '@mui/material';

interface FeatureItems {
  text: string;
  icon: React.ReactNode;
}

export interface FeatureCardProps {
  card_title?: string;
  card_icon: React.ReactNode;
  card_description: string;
  feature: FeatureItems[];
  onButtonClick: () => Promise<void>;
  button_text?: string;
}

interface FeatureCardsProps {
  features: FeatureCardProps[];
}

export function FeatureCard({ features }: FeatureCardsProps) {
  const theme = useTheme();
 console.log(features)
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        px: { xs: 2, sm: 4, md: 8 },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{
          mb: 4,
          fontSize: { xs: '1.8rem', md: '2.2rem' },
          fontWeight: 'bold',
          color: theme.palette.text.primary,
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        Choose Your Learning Path
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: { xs: 2, md: 3 },
          justifyContent: 'center',
        }}
      >
        {features.map((one_card, index) => (
          <Card
            key={index}
            sx={{
              maxWidth: 360,
              mx: 'auto',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              p: 3,
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: theme.shadows[1],
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[4],
              },
            }}
          >
            <Box
              sx={{
                p: 2,
                borderRadius: '50%',
                bgcolor: theme.palette.primary.main,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
              }}
            >
              {one_card.card_icon}
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 'bold',
                color: theme.palette.text.primary,
                mb: 1,
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {one_card.card_title}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                mb: 2,
                fontFamily: 'Roboto, sans-serif',
              }}
            >
              {one_card.card_description}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, textAlign: 'center', width: '100%' }}>
              {one_card.feature.map((item, idx) => (
                <Box
                  key={idx}
                  component="li"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1,
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="body2"
                    sx={{
                      ml: 1,
                      fontFamily: 'Roboto, sans-serif',
                    }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box>
              <Button 
                variant="contained" 
                onClick={one_card.onButtonClick}
                sx={{ mt: 2 }}
              >
                {one_card.button_text}
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

