import { Box, Container, Chip, Stack } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'

const genres = ['Strategy', 'Dice', 'Puzzle', 'Casual', 'Indie']

const GenreTags = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      component="div"
      sx={{
        mb: 4,
      }}
    >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {genres.map((genre, index) => (
              <motion.div
                key={genre}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Chip
                  label={genre}
                  sx={{
                    fontSize: '0.9rem',
                    height: 32,
                    bgcolor: 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: 'primary.dark',
                    },
                  }}
                />
              </motion.div>
            ))}
          </Stack>
        </motion.div>
    </Box>
  )
}

export default GenreTags

