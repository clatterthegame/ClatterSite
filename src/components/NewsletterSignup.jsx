import { Box, Container, Typography, TextField, Button, Stack } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Email } from '@mui/icons-material'

const NewsletterSignup = () => {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement newsletter signup logic
    console.log('Newsletter signup:', email)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95) 0%, rgba(20, 0, 40, 0.95) 100%)',
      }}
    >
      <Container maxWidth="sm">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" component="h2" gutterBottom sx={{ textAlign: 'center' }}>
            Stay Updated
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Subscribe to our newsletter for updates and news about Clatter
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                type="email"
                label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="outlined"
                sx={{ flexGrow: 1 }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Email />}
                disabled={submitted}
                sx={{ minWidth: { xs: '100%', sm: '150px' } }}
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </Stack>
          </Box>
        </motion.div>
      </Container>
    </Box>
  )
}

export default NewsletterSignup

