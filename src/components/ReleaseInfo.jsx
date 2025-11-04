import { Box, Container, Typography, Chip } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { CalendarToday } from '@mui/icons-material'

const ReleaseInfo = ({ releaseDate, isAvailable }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      component="div"
      sx={{
        mt: 2,
      }}
    >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {releaseDate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday color="primary" />
                <Typography variant="h6" component="span">
                  {releaseDate}
                </Typography>
              </Box>
            )}
            <Chip
              label={isAvailable ? 'Available Now' : 'Coming Soon'}
              color={isAvailable ? 'success' : 'warning'}
              sx={{ fontSize: '0.9rem', height: 32 }}
            />
          </Box>
        </motion.div>
    </Box>
  )
}

export default ReleaseInfo

