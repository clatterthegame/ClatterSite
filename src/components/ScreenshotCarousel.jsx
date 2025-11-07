import { useState } from 'react'
import { Box, IconButton, Paper } from '@mui/material'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { screenshotData } from '../data/screenshots'

const ScreenshotCarousel = ({ videoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  // Build carousel items: video first (if provided), then screenshots
  const carouselItems = []
  // Temporarily hide the trailer video in the carousel
  // if (videoUrl) {
  //   carouselItems.push({ type: 'video', url: videoUrl })
  // }
  screenshotData.forEach((image) => {
    carouselItems.push({ type: 'image', image })
  })

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
    return null
  }

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: { xs: 2, sm: 4, md: 4 },
        px: { xs: 1, sm: 2 },
        zIndex: 100,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          maxWidth: { xs: '95vw', sm: '90vw', md: '700px' },
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
              fontSize: { xs: 24, sm: 30, md: 40 },
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
              fontSize: { xs: 24, sm: 30, md: 40 },
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
              initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: 15 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, scale: 0.9, rotateY: -15 }}
              transition={{
                duration: 0.5,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <Paper
                elevation={24}
                sx={{
                  borderRadius: 4,
                  overflow: 'hidden',
                  maxWidth: '100%',
                  border: 'none',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    boxShadow: '0 12px 48px rgba(0, 0, 0, 0.9)',
                  },
                }}
              >
                {currentItem.type === 'video' ? (
                  <Box
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: '100%',
                      aspectRatio: { xs: '16/9', md: '16/10' },
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
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        cursor: 'pointer',
                        objectFit: 'cover',
                      }}
                      onClick={(e) => {
                        const video = e.currentTarget
                        if (video.paused) {
                          video.play().catch(() => {
                            // Video play failed - silently handle
                          })
                        } else {
                          video.pause()
                        }
                      }}
                      onError={(e) => {
                        // Video failed to load - silently handle
                      }}
                    >
                      Your browser does not support the video tag.
                    </Box>
                  </Box>
                ) : (
                  <Box component="picture" sx={{ display: 'block' }}>
                    <Box
                      component="img"
                      src={currentItem.image.src}
                      srcSet={currentItem.image.srcSet}
                      sizes={currentItem.image.sizes}
                      alt={currentItem.image.alt}
                      loading={currentIndex === 0 ? 'eager' : 'lazy'}
                      sx={{
                        width: '100%',
                        height: 'auto',
                        maxWidth: '100%',
                        display: 'block',
                        objectFit: 'contain',
                        aspectRatio: '16 / 9',
                      }}
                    />
                  </Box>
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

