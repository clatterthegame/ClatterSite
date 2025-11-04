import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/paths'

const useUnity = (canvasRef) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const unityInstanceRef = useRef(null)
  const scriptLoadedRef = useRef(false)

  useEffect(() => {
    if (!canvasRef.current || scriptLoadedRef.current) return

    const canvas = canvasRef.current

    // Load Unity loader script
    const script = document.createElement('script')
    script.src = getAssetPath('build/Web Build 1.loader.js')
    script.async = true

    script.onload = () => {
      if (window.createUnityInstance && canvas) {
        // Handle wheel events for scrolling
        const handleWheel = (e) => {
          window.scrollBy({ top: e.deltaY, behavior: 'auto' })
        }
        canvas.addEventListener('wheel', handleWheel)

        // Create Unity instance
        window.createUnityInstance(canvas, {
          dataUrl: getAssetPath('build/Web Build 1.data.unityweb'),
          frameworkUrl: getAssetPath('build/Web Build 1.framework.js.unityweb'),
          codeUrl: getAssetPath('build/Web Build 1.wasm.unityweb'),
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'YourCompany',
          productName: 'Clatter',
          productVersion: '1.0',
          backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
          webGLContextAttributes: { alpha: true, preserveDrawingBuffer: false },
        })
          .then((unityInstance) => {
            unityInstanceRef.current = unityInstance
            setLoading(false)
            console.log('Unity WebGL loaded!')
          })
          .catch((err) => {
            setError(err)
            setLoading(false)
            console.error('Unity WebGL loading error:', err)
          })

        // Cleanup wheel handler
        return () => {
          canvas.removeEventListener('wheel', handleWheel)
        }
      }
    }

    script.onerror = () => {
      setError(new Error('Failed to load Unity loader script'))
      setLoading(false)
    }

    document.body.appendChild(script)
    scriptLoadedRef.current = true

    return () => {
      // Cleanup
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
      scriptLoadedRef.current = false
    }
  }, [canvasRef])

  return { loading, error, unityInstance: unityInstanceRef.current }
}

export default useUnity

