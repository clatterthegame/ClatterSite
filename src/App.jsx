import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useEffect, useState } from 'react'
import theme from './theme/theme'
import { getAssetPath } from './utils/paths'
import HeroSection from './components/HeroSection'
import GameDescription from './components/GameDescription'
import GameTrailer from './components/GameTrailer'
import ScreenshotGallery from './components/ScreenshotGallery'
import SystemRequirements from './components/SystemRequirements'
import ReviewsSection from './components/ReviewsSection'
// import AchievementsShowcase from './components/AchievementsShowcase'
import GenreTags from './components/GenreTags'
import ReleaseInfo from './components/ReleaseInfo'
import SteamWidget from './components/SteamWidget'
import SteamCTA from './components/SteamCTA'
import NewsletterSignup from './components/NewsletterSignup'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'
import TermsOfService from './components/TermsOfService'
import PrivacyPolicy from './components/PrivacyPolicy'

// Get Google Analytics ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // Initialize and track page view with Google Analytics
    if (GA_MEASUREMENT_ID) {
      import('react-ga4')
        .then((ReactGA) => {
          try {
            ReactGA.default.initialize(GA_MEASUREMENT_ID)
            ReactGA.default.send({ hitType: 'pageview', page: window.location.pathname })
          } catch (error) {
            console.warn('Failed to initialize Google Analytics:', error)
          }
        })
        .catch((error) => {
          console.warn('Failed to load react-ga4:', error)
        })
    }

    // Listen for navigation changes
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname)
      if (GA_MEASUREMENT_ID) {
        import('react-ga4')
          .then((ReactGA) => {
            ReactGA.default.send({ hitType: 'pageview', page: window.location.pathname })
          })
          .catch(() => {})
      }
    }

    // Intercept link clicks for SPA navigation
    const handleLinkClick = (e) => {
      const link = e.target.closest('a')
      if (link && link.href) {
        const url = new URL(link.href)
        // Only intercept internal links (same origin)
        if (url.origin === window.location.origin) {
          const path = url.pathname
          // Only intercept /terms and /privacy links
          if (path === '/terms' || path === '/privacy' || path === '/' || path === '') {
            e.preventDefault()
            window.history.pushState({}, '', path)
            handleLocationChange()
          }
        }
      }
    }

    window.addEventListener('popstate', handleLocationChange)
    document.addEventListener('click', handleLinkClick)
    return () => {
      window.removeEventListener('popstate', handleLocationChange)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  // Game configuration - can be overridden by environment variables
  const gameConfig = {
    steamUrl: import.meta.env.VITE_STEAM_URL || 'https://store.steampowered.com/app/YOUR_APP_ID',
    steamAppId: import.meta.env.VITE_STEAM_APP_ID || 'YOUR_APP_ID',
    videoUrl: import.meta.env.VITE_TRAILER_URL || getAssetPath('assets/video/test.mov'),
    price: import.meta.env.VITE_GAME_PRICE || '$9.99',
    releaseDate: import.meta.env.VITE_RELEASE_DATE || 'Jan 1 2026',
    isAvailable: import.meta.env.VITE_IS_AVAILABLE === 'false' || true,
  }

  // Handle routing for static pages
  const path = currentPath.replace(/\/$/, '') || '/'
  
  if (path === '/terms' || path.endsWith('/terms')) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <TermsOfService />
      </ThemeProvider>
    )
  }

  if (path === '/privacy' || path.endsWith('/privacy')) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PrivacyPolicy />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Helmet>
        <title>Clatter - Innovative Dice Strategy Game | Steam</title>
        <meta
          name="description"
          content="Clatter is an innovative dice-based strategy game that challenges players to think strategically while managing chance. Available on Steam."
        />
        <meta name="keywords" content="Clatter, dice game, strategy game, Steam, indie game" />
        <meta property="og:title" content="Clatter - Innovative Dice Strategy Game" />
        <meta
          property="og:description"
          content="Master the art of dice manipulation and strategic planning in Clatter."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={getAssetPath('assets/images/screenshot-1-1200w.jpg')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clatter - Innovative Dice Strategy Game" />
        <meta
          name="twitter:description"
          content="Master the art of dice manipulation and strategic planning in Clatter."
        />
        <meta name="twitter:image" content={getAssetPath('assets/images/screenshot-1-1200w.jpg')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: 'Clatter',
            description:
              'An innovative dice-based strategy game that challenges players to think strategically while managing chance.',
            applicationCategory: 'Game',
            operatingSystem: 'Windows',
            // offers: {
            //   '@type': 'Offer',
            //   price: gameConfig.price,
            //   priceCurrency: 'USD',
            // },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.5',
              ratingCount: '100',
            },
          })}
        </script>
      </Helmet>

      {/* Skip to main content link for accessibility */}
      <a href="#main-content" style={{ position: 'absolute', left: '-9999px' }}>
        Skip to main content
      </a>

      <main id="main-content" style={{ minHeight: '100vh' }}>
        {/* Hero Section with Purchase CTA */}
        <HeroSection 
          videoUrl={gameConfig.videoUrl}
          steamUrl={gameConfig.steamUrl}
          price={gameConfig.price}
        />
        
        {/* Social Links */}
        <Box 
          sx={{ 
            py: { xs: 6, md: 8 }, 
            background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95) 0%, rgba(20, 0, 40, 0.95) 100%)',
          }}
        >
          <Container maxWidth="md">
            <SocialLinks />
          </Container>
        </Box>
        
        {/* About Section */}
        <GameDescription />
        
        {/* Game Info */}
        <Box
          sx={{
            py: { xs: 6, md: 8 },
            background: 'linear-gradient(135deg, rgba(10, 0, 20, 0.95) 0%, rgba(20, 0, 40, 0.95) 100%)',
          }}
        >
          <Container maxWidth="md">
            <GenreTags />
            <ReleaseInfo releaseDate={gameConfig.releaseDate} isAvailable={gameConfig.isAvailable} />
          </Container>
        </Box>
        
        {/* Screenshots */}
        <ScreenshotGallery />
        
        {/* Game Details */}
        <SystemRequirements />
        <ReviewsSection />
        
        {/* Additional Content */}
        {/* <AchievementsShowcase /> */}
        <SteamWidget steamAppId={gameConfig.steamAppId} />
        
        {/* Newsletter */}
        <NewsletterSignup />
        
        {/* Footer */}
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App
