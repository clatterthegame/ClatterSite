import { useRef } from 'react'
import { Box, Fade } from '@mui/material'
import { motion } from 'framer-motion'
import useUnity from '../hooks/useUnity'
import LoadingStates from './LoadingStates'
import ScreenshotCarousel from './ScreenshotCarousel'
import { getAssetPath } from '../utils/paths'

const HeroSection = () => {
  const canvasRef = useRef(null)
  const { loading, error } = useUnity(canvasRef)

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: '600px', md: '800px' },
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <Box
        component="img"
        src={getAssetPath('assets/images/BackgroundDieGrid.png')}
        alt="Background"
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

      {/* Top Gradient Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '300px',
          background: 'linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0))',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

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

      {/* Screenshot Carousel Overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '180px', md: '250px' },
          left: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <ScreenshotCarousel />
      </Box>
    </Box>
  )
}

export default HeroSection

