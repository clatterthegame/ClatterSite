import { useState } from 'react'
import { Box, IconButton, Paper, useTheme, useMediaQuery } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { getAssetPath } from '../utils/paths'

const screenshots = [
  getAssetPath('assets/images/screenshot 1.png'),
  getAssetPath('assets/images/screenshot 2.png'),
  getAssetPath('assets/images/screenshot 3.png'),
  getAssetPath('assets/images/screenshot 4.png'),
  getAssetPath('assets/images/screenshot 5.png'),
]

const ScreenshotCarousel = ({ videoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Build carousel items: video first (if provided), then screenshots
  const carouselItems = []
  if (videoUrl) {
    carouselItems.push({ type: 'video', url: videoUrl })
    console.log('Video added to carousel:', videoUrl)
  }
  screenshots.forEach((screenshot) => {
    carouselItems.push({ type: 'image', url: screenshot })
  })
  
  console.log('Carousel items:', carouselItems.length, 'Current index:', currentIndex)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const handleDotClick = (index) => {
    setCurrentIndex(index)
  }

  const currentItem = carouselItems[currentIndex]
  
  // Safety check
  if (!currentItem) {
    console.error('No current item at index:', currentIndex, 'Items:', carouselItems)
    return null
  }
  
  console.log('Rendering carousel item:', currentItem.type, currentItem.url)

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 8,
        px: 2,
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: { xs: '90vw', md: '1200px' },
          width: '100%',
        }}
      >
        {/* Clickable Left Area */}
        <Box
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '50%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            pl: 2,
            pointerEvents: currentItem.type === 'video' ? 'none' : 'auto',
            '&:hover .arrow-left': {
              opacity: 0.8,
            },
          }}
        >
          <ChevronLeft
            className="arrow-left"
            sx={{
              fontSize: { xs: 30, md: 40 },
              color: 'white',
              opacity: 0,
              transition: 'opacity 0.2s',
              filter: 'drop-shadow(0 0 8px rgba(0,0,0,1))',
            }}
          />
        </Box>

        {/* Clickable Right Area */}
        <Box
          onClick={handleNext}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '50%',
            height: '100%',
            cursor: 'pointer',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            pr: 2,
            '&:hover .arrow-right': {
              opacity: 0.8,
            },
          }}
        >
          <ChevronRight
            className="arrow-right"
            sx={{
              fontSize: { xs: 30, md: 40 },
              color: 'white',
              opacity: 0,
              transition: 'opacity 0.2s',
              filter: 'drop-shadow(0 0 8px rgba(0,0,0,1))',
            }}
          />
        </Box>

        {/* Screenshot Container */}
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  maxWidth: '100%',
                }}
              >
                {currentItem.type === 'video' ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: { xs: '85vw', md: 'auto' },
                      maxWidth: '100%',
                      minHeight: { xs: '200px', md: '400px' },
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="video"
                      src={currentItem.url}
                      controls
                      playsInline
                      preload="metadata"
                      sx={{
                        width: { xs: '85vw', md: 'auto' },
                        height: { xs: 'auto', md: '400px' },
                        maxWidth: '100%',
                        display: 'block',
                        cursor: 'pointer',
                      }}
                      onClick={(e) => {
                        const video = e.currentTarget
                        if (video.paused) {
                          video.play().catch((err) => console.error('Play error:', err))
                        } else {
                          video.pause()
                        }
                      }}
                      onError={(e) => {
                        console.error('Video error:', e)
                        console.error('Video URL:', currentItem.url)
                        const video = e.currentTarget
                        console.error('Video error details:', video.error)
                      }}
                      onLoadedData={() => {
                        console.log('Video loaded:', currentItem.url)
                      }}
                    >
                      Your browser does not support the video tag.
                    </Box>
                  </Box>
                ) : (
                  <Box
                    component="img"
                    src={currentItem.url}
                    alt={`Gameplay screenshot ${videoUrl ? currentIndex : currentIndex + 1}`}
                    sx={{
                      height: { xs: 'auto', md: '400px' },
                      width: { xs: '85vw', md: 'auto' },
                      maxWidth: '100%',
                      display: 'block',
                    }}
                  />
                )}
              </Paper>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Pagination Dots */}
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 1.5 },
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {carouselItems.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleDotClick(index)}
              sx={{
                width: { xs: 10, md: 14 },
                height: { xs: 10, md: 14 },
                borderRadius: '50%',
                backgroundColor: index === currentIndex ? 'white' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'background-color 0.2s, transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.2)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default ScreenshotCarousel

