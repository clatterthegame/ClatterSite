import { Box, Container } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const SteamWidget = ({ steamAppId }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  if (!steamAppId) {
    return null
  }

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95) 0%, rgba(20, 0, 40, 0.95) 100%)',
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Box
            sx={{
              width: '100%',
              minHeight: '190px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <iframe
              src={`https://store.steampowered.com/widget/${steamAppId}/`}
              frameBorder="0"
              width="100%"
              height="190"
              title="Steam Store Widget"
              style={{ maxWidth: '646px' }}
            />
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default SteamWidget

