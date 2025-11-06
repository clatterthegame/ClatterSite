import { useState } from 'react'
import { Box, Container, Typography, ImageList, ImageListItem, Modal, IconButton } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { Close } from '@mui/icons-material'
import { getAssetPath } from '../utils/paths'

const screenshots = [
  getAssetPath('assets/images/screenshot-1.png'),
  getAssetPath('assets/images/screenshot-2.webp'),
  getAssetPath('assets/images/screenshot-3.webp'),
  getAssetPath('assets/images/screenshot-4.webp'),
  getAssetPath('assets/images/screenshot-5.webp'),
]

const ScreenshotGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleOpen = (image) => {
    setSelectedImage(image)
  }

  const handleClose = () => {
    setSelectedImage(null)
  }

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
          url(${getAssetPath('assets/images/tons-of-dice.webp')})
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
            radial-gradient(circle at 50% 50%, rgba(157, 0, 255, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 80% 20%, rgba(255, 0, 255, 0.12) 0%, transparent 60%)
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
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 4, md: 6 },
              px: { xs: 2, sm: 0 },
            }}
          >
            Screenshot Gallery
          </Typography>
        </motion.div>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: { xs: 4, sm: 4, md: 4 },
          }}
        >
          {screenshots.map((screenshot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Box
                component="img"
                src={screenshot}
                alt={`Gameplay screenshot ${index + 1}`}
                loading="lazy"
                onClick={() => handleOpen(screenshot)}
                sx={{
                  width: '100%',
                  height: { xs: 'auto', md: '300px' },
                  objectFit: 'cover',
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  display: 'block',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: '0 8px 24px rgba(255, 0, 255, 0.4)',
                  },
                }}
              />
            </motion.div>
          ))}
        </Box>

        <Modal
          open={!!selectedImage}
          onClose={handleClose}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 2,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
            }}
          >
            <IconButton
              onClick={handleClose}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'background.paper',
                zIndex: 1,
                '&:hover': {
                  bgcolor: 'background.default',
                },
              }}
            >
              <Close />
            </IconButton>
            <Box
              component="img"
              src={selectedImage}
              alt="Full size screenshot"
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
              }}
            />
          </Box>
        </Modal>
      </Container>
    </Box>
  )
}

export default ScreenshotGallery

