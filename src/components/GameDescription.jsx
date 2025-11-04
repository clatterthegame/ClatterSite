import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/paths'

const features = [
  {
    title: 'Strategic Dice Gameplay',
    description: 'Master the art of dice manipulation and strategic planning.',
  },
  {
    title: 'Unique Mechanics',
    description: 'Experience innovative gameplay that sets Clatter apart.',
  },
  {
    title: 'Immersive Experience',
    description: 'Dive into a world where every roll matters.',
  },
]

const GameDescription = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: `
          linear-gradient(135deg, rgba(10, 0, 20, 0.85) 0%, rgba(20, 0, 40, 0.85) 100%),
          url(${getAssetPath('assets/images/tons-of-dice.png')})
        `,
        backgroundSize: 'cover, 150%',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'fixed, fixed',
        backgroundBlendMode: 'normal, screen',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 50% 50%, rgba(255, 0, 255, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 20% 80%, rgba(0, 255, 255, 0.12) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{
              textAlign: 'center',
              mb: 6,
              color: '#FFFFFF',
              fontWeight: 700,
            }}
          >
            About Clatter
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: '1.25rem',
              textAlign: 'center',
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              color: 'text.secondary',
            }}
          >
            Clatter is an innovative dice-based strategy game that challenges players to think
            strategically while managing chance. Roll, plan, and outmaneuver your opponents in this
            unique gaming experience.
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(135deg, rgba(157, 0, 255, 0.2) 0%, rgba(255, 0, 255, 0.15) 50%, rgba(0, 255, 255, 0.2) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '2px solid',
                    borderImage: 'linear-gradient(135deg, #FF00FF, #00FFFF, #9D00FF) 1',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                    boxShadow: '0 8px 32px rgba(255, 0, 255, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)',
                    '&:hover': {
                      borderImage: 'linear-gradient(135deg, #00FFFF, #FF00FF, #00FFFF) 1',
                      boxShadow: '0 12px 48px rgba(255, 0, 255, 0.5), 0 0 60px rgba(0, 255, 255, 0.4), inset 0 0 30px rgba(157, 0, 255, 0.3)',
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontFamily: '"Space Grotesk", sans-serif',
                        fontWeight: 600,
                        color: '#FFFFFF',
                        mb: 2,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default GameDescription

