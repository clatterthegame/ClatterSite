import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Container } from '@mui/material'
import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import theme from './theme/theme'
import { getAssetPath } from './utils/paths'
import HeroSection from './components/HeroSection'
import GameDescription from './components/GameDescription'
import GameTrailer from './components/GameTrailer'
import ScreenshotGallery from './components/ScreenshotGallery'
import SystemRequirements from './components/SystemRequirements'
import ReviewsSection from './components/ReviewsSection'
import AchievementsShowcase from './components/AchievementsShowcase'
import GenreTags from './components/GenreTags'
import ReleaseInfo from './components/ReleaseInfo'
import SteamWidget from './components/SteamWidget'
import SteamCTA from './components/SteamCTA'
import NewsletterSignup from './components/NewsletterSignup'
import SocialLinks from './components/SocialLinks'
import Footer from './components/Footer'

// Get Google Analytics ID
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID

function App() {
  useEffect(() => {
    console.log('App component mounted')
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
  }, [])

  // Game configuration - can be overridden by environment variables
  const gameConfig = {
    steamUrl: import.meta.env.VITE_STEAM_URL || 'https://store.steampowered.com/app/YOUR_APP_ID',
    steamAppId: import.meta.env.VITE_STEAM_APP_ID || 'YOUR_APP_ID',
    videoUrl: import.meta.env.VITE_TRAILER_URL || getAssetPath('assets/video/test.mov'),
    price: import.meta.env.VITE_GAME_PRICE || '$9.99',
    releaseDate: import.meta.env.VITE_RELEASE_DATE || '2024',
    isAvailable: import.meta.env.VITE_IS_AVAILABLE === 'true' || true,
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
        <meta property="og:image" content={getAssetPath('assets/images/screenshot 1.png')} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clatter - Innovative Dice Strategy Game" />
        <meta
          name="twitter:description"
          content="Master the art of dice manipulation and strategic planning in Clatter."
        />
        <meta name="twitter:image" content={getAssetPath('assets/images/screenshot 1.png')} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: 'Clatter',
            description:
              'An innovative dice-based strategy game that challenges players to think strategically while managing chance.',
            applicationCategory: 'Game',
            operatingSystem: 'Windows',
            offers: {
              '@type': 'Offer',
              price: gameConfig.price,
              priceCurrency: 'USD',
            },
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

      <main id="main-content" style={{ minHeight: '100vh', background: '#000' }}>
        {/* Title/Hero Section */}
        <HeroSection videoUrl={gameConfig.videoUrl} />
        
        {/* Purchase/Socials */}
        <SteamCTA steamUrl={gameConfig.steamUrl} price={gameConfig.price} />
        <Box sx={{ py: 4, bgcolor: 'background.paper' }}>
          <Container maxWidth="md">
            <SocialLinks />
          </Container>
        </Box>
        
        {/* About */}
        <GameDescription />
        
        {/* Everything else */}
        <GenreTags />
        <ReleaseInfo releaseDate={gameConfig.releaseDate} isAvailable={gameConfig.isAvailable} />
        <ScreenshotGallery />
        <SystemRequirements />
        <ReviewsSection />
        <AchievementsShowcase />
        <SteamWidget steamAppId={gameConfig.steamAppId} />
        <NewsletterSignup />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App
