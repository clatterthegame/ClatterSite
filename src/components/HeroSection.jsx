import { useRef } from 'react'
import { Box, Fade } from '@mui/material'
import { motion } from 'framer-motion'
import useUnity from '../hooks/useUnity'
import LoadingStates from './LoadingStates'
import ScreenshotCarousel from './ScreenshotCarousel'
import { getAssetPath } from '../utils/paths'

const HeroSection = ({ videoUrl }) => {
  const canvasRef = useRef(null)
  const { loading, error } = useUnity(canvasRef)
  
  console.log('HeroSection received videoUrl:', videoUrl)

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '600px', md: '800px' },
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Image */}
      <Box
        component={motion.img}
        src={getAssetPath('assets/images/background-die-grid.png')}
        alt="Background"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: '400px', md: '700px' },
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
          height: '100%',
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
          height: '100%',
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
          src={getAssetPath('assets/images/dice.png')}
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
            width: { xs: '150px', md: '250px' },
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
            left: index === 1 ? '5%' : index === 2 ? '80%' : '70%',
          }}
        />
      ))}

      {/* Unity Canvas Container */}
      <Box
        id="unity-header"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: '400px', md: '700px' },
          zIndex: 5,
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
              backgroundColor: 'transparent',
              display: 'block',
              zIndex: 5,
              pointerEvents: 'auto',
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
          position: 'absolute',
          top: { xs: '180px', md: '250px' },
          left: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <ScreenshotCarousel videoUrl={videoUrl} />
      </Box>
    </Box>
  )
}

export default HeroSection

