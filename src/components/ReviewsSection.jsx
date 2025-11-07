import { Box, Container, Typography, Card, CardContent, Grid, Rating } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/paths'

const reviews = [
  {
    quote: 'A refreshing take on dice games with strategic depth.',
    author: 'Gaming Weekly',
    rating: 5,
  },
  {
    quote: 'Innovative mechanics that keep you coming back for more.',
    author: 'Game Reviewer',
    rating: 5,
  },
  {
    quote: 'The perfect blend of luck and strategy.',
    author: 'Strategy Game Enthusiast',
    rating: 4,
  },
]

const ReviewsSection = () => {
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
        backgroundImage: `
          linear-gradient(135deg, rgba(10, 0, 20, 0.85) 0%, rgba(20, 0, 40, 0.85) 100%),
          url(${getAssetPath('assets/images/tons-of-dice-1000w.jpg')})
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'fixed, fixed',
        backgroundBlendMode: 'normal, screen',
        '@supports (background-image: image-set(url("x") 1x))': {
          backgroundImage: `
            linear-gradient(135deg, rgba(10, 0, 20, 0.85) 0%, rgba(20, 0, 40, 0.85) 100%),
            image-set(
              url(${getAssetPath('assets/images/tons-of-dice-1000w.jpg')}) 1x,
              url(${getAssetPath('assets/images/tons-of-dice.webp')}) 2x
            )
          `,
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 50% 30%, rgba(255, 0, 255, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 20% 70%, rgba(0, 255, 255, 0.12) 0%, transparent 60%)
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
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mb: 6 }}
          >
            What Players Are Saying
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {reviews.map((review, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
              sx={{
                display: 'flex',
                width: { xs: '100%', md: 'calc((100% - 64px) / 3)' },
                maxWidth: { xs: '100%', md: 'calc((100% - 64px) / 3)' },
                minWidth: 0,
                flex: { xs: '0 0 100%', md: '0 0 calc((100% - 64px) / 3)' },
              }}
            >
              <motion.div
                style={{ width: '100%', display: 'flex' }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    width: '100%',
                    maxWidth: '100%',
                    height: '100%',
                    minWidth: 0,
                    flex: 1,
                    bgcolor: 'background.paper',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Rating value={review.rating} readOnly sx={{ mb: 2 }} />
                    <Typography variant="body1" sx={{ fontStyle: 'italic', mb: 2 }}>
                      "{review.quote}"
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      — {review.author}
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

export default ReviewsSection

