import { useRef } from 'react'
import { Box, Fade, Button, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { PlayArrow, AddShoppingCart } from '@mui/icons-material'
import { useInView } from 'react-intersection-observer'
import useUnity from '../hooks/useUnity'
import LoadingStates from './LoadingStates'
import ScreenshotCarousel from './ScreenshotCarousel'
import { getAssetPath } from '../utils/paths'

const HeroSection = ({ videoUrl, steamUrl, price }) => {
  const canvasRef = useRef(null)
  const { loading, error } = useUnity(canvasRef)
  const { ref: ctaRef, inView: ctaInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 'auto', md: '100vh' },
        height: { xs: 'auto', md: '100vh' },
        overflow: { xs: 'visible', md: 'hidden' },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Animated Background Image - LCP Image */}
      <Box
        component={motion.img}
        src={getAssetPath('assets/images/background-die-grid.webp')}
        alt="Background"
        fetchPriority="high"
        loading="eager"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: '35vh', sm: '50vh', md: '100%' },
          objectFit: 'cover',
          zIndex: 1,
        }}
      />

      {/* Animated Gradient Overlay with Psychedelic Glow */}
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: { xs: '35vh', sm: '50vh', md: '100%' },
            background: `
              linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, rgba(10, 0, 20, 0.5) 50%, rgba(0, 0, 0, 0.9) 100%),
              radial-gradient(circle at 30% 20%, rgba(255, 0, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 70% 80%, rgba(0, 255, 255, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.2) 0%, transparent 60%)
            `,
            pointerEvents: 'none',
            zIndex: 2,
          }}
      />

      {/* Animated Psychedelic Particles/Glow Effect */}
      <Box
        component={motion.div}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: '35vh', sm: '50vh', md: '100%' },
          background: `
            radial-gradient(circle at 20% 30%, rgba(255, 0, 255, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(0, 255, 255, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 10% 90%, rgba(255, 0, 170, 0.3) 0%, transparent 40%),
            radial-gradient(circle at 90% 10%, rgba(0, 255, 136, 0.2) 0%, transparent 40%)
          `,
          backgroundSize: '200% 200%',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Floating Giant Die - Multiple instances */}
      {[1, 2, 3].map((index) => (
        <Box
          key={index}
          component={motion.img}
          src={getAssetPath('assets/images/dice.webp')}
          alt="Giant die"
          animate={{
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [0.6, 0.7, 0.6],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10 + index * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: index * 1.5,
          }}
          sx={{
            position: 'absolute',
            width: { xs: '80px', sm: '120px', md: '250px' },
            height: 'auto',
            filter: `
              drop-shadow(0 0 20px rgba(255, 0, 255, 0.6))
              drop-shadow(0 0 40px rgba(0, 255, 255, 0.4))
              drop-shadow(0 0 60px rgba(157, 0, 255, 0.3))
            `,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            zIndex: 5,
            top: index === 1 ? '10%' : index === 2 ? '60%' : '30%',
            left: index === 1 ? { xs: '2%', md: '5%' } : index === 2 ? { xs: '75%', md: '80%' } : { xs: '65%', md: '70%' },
          }}
        />
      ))}

      {/* Unity Canvas Container */}
      <Box
        id="unity-header"
        sx={{
          position: 'absolute',
          top: { xs: 0, md: '-40px' },
          left: 0,
          width: '100%',
          height: { xs: '35vh', sm: '50vh', md: '100%' },
          zIndex: 5,
          overflow: 'hidden',
          // Ensure container is properly sized on all devices
          minWidth: 0,
          minHeight: 0,
        }}
      >
        {loading && <LoadingStates />}
        {error && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              color: 'error.main',
            }}
          >
            Failed to load Unity game
          </Box>
        )}
        <Fade in={!loading && !error} timeout={1000}>
          <Box
            component="canvas"
            ref={canvasRef}
            id="unity-canvas"
            sx={{
              width: '100%',
              height: '100%',
              maxWidth: '100%',
              maxHeight: '100%',
              backgroundColor: 'transparent',
              display: 'block',
              zIndex: 5,
              pointerEvents: 'auto',
              objectFit: 'contain',
              // Ensure canvas scales properly on mobile
              '@media (max-width: 600px)': {
                objectFit: 'cover',
              },
            }}
          />
        </Fade>
      </Box>

      {/* Screenshot Carousel Overlay with Animation */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          top: { xs: 'auto', md: '280px' },
          left: 0,
          width: '100%',
          zIndex: { xs: 10, md: 100 },
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: { xs: 'calc(35vh - 120px)', sm: 'calc(50vh - 100px)', md: 0 },
          mb: { xs: 2, md: 0 },
        }}
      >
        <ScreenshotCarousel videoUrl={videoUrl} />
      </Box>

      {/* Purchase CTA at Bottom */}
      <Box
        ref={ctaRef}
        sx={{
          position: { xs: 'relative', md: 'absolute' },
          bottom: { xs: 'auto', md: 50 },
          top: { xs: 'auto', md: 'auto' },
          left: 0,
          right: 0,
          width: '100%',
          zIndex: { xs: 101, md: 99 },
          display: 'flex',
          justifyContent: 'center',
          px: { xs: 2, sm: 0 },
          mt: { xs: 2, md: 0 },
          mb: { xs: 3, md: 0 },
          // Ensure CTA is below carousel on desktop
          '@media (min-width: 900px)': {
            top: 'calc(250px + 600px)',
            bottom: 'auto',
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ctaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{ width: '100%', maxWidth: '500px' }}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="stretch"
            sx={{ width: '100%' }}
          >
            {steamUrl && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%' }}
              >
                <Button
                  variant="contained"
                  size="large"
                  href={steamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<AddShoppingCart />}
                  fullWidth
                  sx={{
                    py: { xs: 1.5, sm: 1.75 },
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    fontWeight: 700,
                    minHeight: { xs: '48px', sm: '56px' },
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
                style={{ width: '100%' }}
              >
                <Button
                  variant="outlined"
                  size="large"
                  href={steamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<PlayArrow />}
                  fullWidth
                  sx={{
                    py: { xs: 1.5, sm: 1.75 },
                    fontSize: { xs: '0.95rem', sm: '1.1rem' },
                    fontWeight: 700,
                    minHeight: { xs: '48px', sm: '56px' },
                  }}
                >
                  Wishlist
                </Button>
              </motion.div>
            )}
          </Stack>
        </motion.div>
      </Box>
    </Box>
  )
}

export default HeroSection

