import { Box, Container, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { EmojiEvents } from '@mui/icons-material'
import { getAssetPath } from '../utils/paths'

const achievements = [
  { id: 1, name: 'First Roll', description: 'Complete your first game', icon: '🎲' },
  { id: 2, name: 'Master Strategist', description: 'Win 10 games in a row', icon: '🏆' },
  { id: 3, name: 'Lucky One', description: 'Roll a perfect combination', icon: '⭐' },
]

const AchievementsShowcase = () => {
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
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 4 }}>
            <EmojiEvents sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
            <Typography variant="h2" component="h2">
              Achievements
            </Typography>
          </Box>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 6, maxWidth: '600px', mx: 'auto' }}
          >
            Unlock achievements as you play and master Clatter
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {achievements.map((achievement, index) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    bgcolor: 'background.default',
                    textAlign: 'center',
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h2" sx={{ mb: 2 }}>
                      {achievement.icon}
                    </Typography>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {achievement.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {achievement.description}
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

export default AchievementsShowcase

