import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { PlayArrow, AddShoppingCart } from '@mui/icons-material'
import { getAssetPath } from '../utils/paths'

const SteamCTA = ({ steamUrl, price }) => {
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
        background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95) 0%, rgba(20, 0, 40, 0.95) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 20%, rgba(255, 0, 255, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 70% 80%, rgba(0, 255, 255, 0.3) 0%, transparent 60%),
            radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.2) 0%, transparent 70%)
          `,
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'glowPulse 4s ease-in-out infinite',
        },
      }}
    >
      {/* Floating Giant Die */}
      <Box
        component={motion.img}
        src={getAssetPath('assets/images/dice.webp')}
        alt="Giant die"
        animate={{
          y: [0, -50, 0],
          rotate: [0, 360],
          scale: [0.5, 0.6, 0.5],
          opacity: [0.25, 0.4, 0.25],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          width: { xs: '120px', md: '200px' },
          height: 'auto',
          top: '20%',
          right: '5%',
          filter: `
            drop-shadow(0 0 25px rgba(255, 0, 255, 0.7))
            drop-shadow(0 0 50px rgba(0, 255, 255, 0.5))
          `,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Typography 
                variant="h2" 
                component="h2" 
                gutterBottom
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 700,
                }}
              >
                Ready to Play?
              </Typography>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={3}
                justifyContent="center"
                alignItems="center"
              >
                {steamUrl && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      size="large"
                      href={steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<AddShoppingCart />}
                      sx={{
                        px: 5,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        minWidth: '200px',
                      }}
                    >
                      Buy on Steam
                    </Button>
                  </motion.div>
                )}
                {steamUrl && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      href={steamUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      startIcon={<PlayArrow />}
                      sx={{
                        px: 5,
                        py: 2,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        minWidth: '200px',
                      }}
                    >
                      Wishlist
                    </Button>
                  </motion.div>
                )}
              </Stack>
            </motion.div>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default SteamCTA

