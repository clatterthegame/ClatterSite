import { getAssetPath } from '../utils/paths'

const DEFAULT_SIZES = '(max-width: 900px) 95vw, 700px'

export const screenshotData = [
  {
    id: 'screenshot-1',
    alt: 'Gameplay board showcasing glowing dice and score tracks',
    src: getAssetPath('assets/images/screenshot-1-1200w.jpg'),
    srcSet: [
      `${getAssetPath('assets/images/screenshot-1-800w.jpg')} 800w`,
      `${getAssetPath('assets/images/screenshot-1-1200w.jpg')} 1200w`,
    ].join(', '),
    full: getAssetPath('assets/images/screenshot-1.png'),
    sizes: DEFAULT_SIZES,
  },
  {
    id: 'screenshot-2',
    alt: 'Close-up of the Clatter dice tray with strategy options',
    src: getAssetPath('assets/images/screenshot-2-1000w.jpg'),
    srcSet: [
      `${getAssetPath('assets/images/screenshot-2-600w.jpg')} 600w`,
      `${getAssetPath('assets/images/screenshot-2-1000w.jpg')} 1000w`,
    ].join(', '),
    full: getAssetPath('assets/images/screenshot-2.png'),
    sizes: DEFAULT_SIZES,
  },
  {
    id: 'screenshot-3',
    alt: 'Mid-game state with players planning their next move',
    src: getAssetPath('assets/images/screenshot-3-1000w.jpg'),
    srcSet: [
      `${getAssetPath('assets/images/screenshot-3-600w.jpg')} 600w`,
      `${getAssetPath('assets/images/screenshot-3-1000w.jpg')} 1000w`,
    ].join(', '),
    full: getAssetPath('assets/images/screenshot-3.png'),
    sizes: DEFAULT_SIZES,
  },
  {
    id: 'screenshot-4',
    alt: 'High-scoring combo lighting up the playfield',
    src: getAssetPath('assets/images/screenshot-4-1000w.jpg'),
    srcSet: [
      `${getAssetPath('assets/images/screenshot-4-600w.jpg')} 600w`,
      `${getAssetPath('assets/images/screenshot-4-1000w.jpg')} 1000w`,
    ].join(', '),
    full: getAssetPath('assets/images/screenshot-4.png'),
    sizes: DEFAULT_SIZES,
  },
  {
    id: 'screenshot-5',
    alt: 'Victory screen with statistics and celebratory effects',
    src: getAssetPath('assets/images/screenshot-5-1000w.jpg'),
    srcSet: [
      `${getAssetPath('assets/images/screenshot-5-600w.jpg')} 600w`,
      `${getAssetPath('assets/images/screenshot-5-1000w.jpg')} 1000w`,
    ].join(', '),
    full: getAssetPath('assets/images/screenshot-5.png'),
    sizes: DEFAULT_SIZES,
  },
]


