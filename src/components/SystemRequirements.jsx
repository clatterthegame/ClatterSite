import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip } from '@mui/material'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { getAssetPath } from '../utils/paths'

const requirements = [
  { category: 'OS', minimum: 'Windows 10', recommended: 'Windows 11' },
  { category: 'Processor', minimum: 'Intel Core i3', recommended: 'Intel Core i5 or AMD equivalent' },
  { category: 'Memory', minimum: '4 GB RAM', recommended: '8 GB RAM' },
  { category: 'Graphics', minimum: 'DirectX 11 compatible', recommended: 'DirectX 12 compatible' },
  { category: 'Storage', minimum: '2 GB available space', recommended: '5 GB available space' },
]

const SystemRequirements = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <Box
      ref={ref}
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        background: `
          linear-gradient(135deg, rgba(10, 0, 20, 0.85) 0%, rgba(20, 0, 40, 0.85) 100%),
          url(${getAssetPath('assets/images/tons-of-dice.webp')})
        `,
        backgroundSize: 'cover, cover',
        backgroundPosition: 'center, center',
        backgroundAttachment: 'scroll, scroll',
        backgroundBlendMode: 'normal, screen',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 70%, rgba(0, 255, 255, 0.15) 0%, transparent 70%),
            radial-gradient(circle at 70% 30%, rgba(157, 0, 255, 0.12) 0%, transparent 60%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}
          >
            System Requirements
          </Typography>
          <TableContainer 
            component={Paper} 
            sx={{ 
              bgcolor: 'background.default',
              overflowX: { xs: 'auto', md: 'visible' },
              overflowY: 'visible',
              maxHeight: 'none',
              width: '100%',
              '& .MuiTable-root': {
                width: '100%',
                tableLayout: 'auto',
              },
            }}
          >
            <Table sx={{ width: '100%', tableLayout: 'auto' }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, py: 1.5, width: { xs: '30%', md: '25%' } }}>
                    Component
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, py: 1.5, width: { xs: '35%', md: '37.5%' }, px: { xs: 1, md: 2 } }}>
                    <Chip label="Minimum" size="small" color="warning" />
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600, fontSize: { xs: '0.875rem', sm: '1rem' }, py: 1.5, width: { xs: '35%', md: '37.5%' }, px: { xs: 1, md: 2 } }}>
                    <Chip label="Recommended" size="small" color="success" />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requirements.map((req, index) => (
                  <TableRow
                    key={index}
                    component={motion.tr}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                  <TableCell 
                    component="th" 
                    scope="row" 
                    sx={{ 
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', sm: '1rem' },
                      wordBreak: 'break-word',
                      py: 1.5,
                      width: { xs: '30%', md: '25%' },
                    }}
                  >
                    {req.category}
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }, 
                      wordBreak: 'break-word', 
                      py: 1.5,
                      width: { xs: '35%', md: '37.5%' },
                      px: { xs: 1, md: 2 },
                    }}
                  >
                    {req.minimum}
                  </TableCell>
                  <TableCell 
                    align="center"
                    sx={{ 
                      fontSize: { xs: '0.875rem', sm: '1rem' }, 
                      wordBreak: 'break-word', 
                      py: 1.5,
                      width: { xs: '35%', md: '37.5%' },
                      px: { xs: 1, md: 2 },
                    }}
                  >
                    {req.recommended}
                  </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>
      </Container>
    </Box>
  )
}

export default SystemRequirements

