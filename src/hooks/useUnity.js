import { useEffect, useRef, useState } from 'react'
import { getAssetPath } from '../utils/paths'

const useUnity = (canvasRef) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const unityInstanceRef = useRef(null)
  const scriptLoadedRef = useRef(false)
  const containerRef = useRef(null)

  // Handle responsive resize
  useEffect(() => {
    if (!canvasRef.current || !unityInstanceRef.current) return

    const canvas = canvasRef.current
    const container = canvas.parentElement
    if (!container) return

    const getPixelRatio = () => Math.min(window.devicePixelRatio || 1, 1.5)

    const syncCanvasSize = () => {
      const displayWidth = container.clientWidth
      const displayHeight = container.clientHeight
      const scale = getPixelRatio()

      canvas.style.width = `${displayWidth}px`
      canvas.style.height = `${displayHeight}px`
      canvas.width = Math.floor(displayWidth * scale)
      canvas.height = Math.floor(displayHeight * scale)

      try {
        if (unityInstanceRef.current?.SendMessage) {
          unityInstanceRef.current.SendMessage('Canvas', 'OnResize', `${displayWidth},${displayHeight}`)
        }
      } catch (e) {
        // Unity might not have the handler; ignore
      }

      if (window.Module && typeof window.Module.resize === 'function') {
        try {
          window.Module.resize(displayWidth, displayHeight)
        } catch (e) {
          // Module.resize not available; ignore
        }
      }
    }

    syncCanvasSize()

    const handleResize = () => {
      if (!unityInstanceRef.current || !canvas) return
      syncCanvasSize()
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)

    let resizeObserver
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(container)
    }

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [canvasRef, loading])

  useEffect(() => {
    if (!canvasRef.current || scriptLoadedRef.current) return

    const canvas = canvasRef.current
    containerRef.current = canvas.parentElement

    const cleanupTasks = []

    const loadUnity = () => {
      if (!canvasRef.current || scriptLoadedRef.current) {
        return
      }

      const loaderScript = document.createElement('script')
      loaderScript.src = getAssetPath('build/Web Build 1.loader.js')
      loaderScript.async = true

      loaderScript.onload = () => {
        if (typeof window.createUnityInstance !== 'function' || !canvasRef.current) {
          return
        }

        const activeCanvas = canvasRef.current
        if (!activeCanvas) {
          return
        }

        const handleWheel = (e) => {
          window.scrollBy({ top: e.deltaY, behavior: 'auto' })
        }
        activeCanvas.addEventListener('wheel', handleWheel, { passive: true })
        cleanupTasks.push(() => activeCanvas.removeEventListener('wheel', handleWheel))

        window.createUnityInstance(activeCanvas, {
          dataUrl: getAssetPath('build/Web Build 1.data.unityweb'),
          frameworkUrl: getAssetPath('build/Web Build 1.framework.js.unityweb'),
          codeUrl: getAssetPath('build/Web Build 1.wasm.unityweb'),
          streamingAssetsUrl: 'StreamingAssets',
          companyName: 'YourCompany',
          productName: 'Clatter',
          productVersion: '1.0',
          backgroundColor: { r: 0, g: 0, b: 0, a: 0 },
          devicePixelRatio: Math.min(window.devicePixelRatio || 1, 1.5),
          webGLContextAttributes: {
            alpha: true,
            antialias: false,
            preserveDrawingBuffer: false,
            powerPreference: 'low-power',
            desynchronized: true,
          },
        })
          .then((unityInstance) => {
            unityInstanceRef.current = unityInstance
            setLoading(false)

            setTimeout(() => {
              if (activeCanvas && activeCanvas.parentElement) {
                const displayWidth = activeCanvas.parentElement.clientWidth
                const displayHeight = activeCanvas.parentElement.clientHeight
                const scale = Math.min(window.devicePixelRatio || 1, 1.5)

                activeCanvas.style.width = `${displayWidth}px`
                activeCanvas.style.height = `${displayHeight}px`
                activeCanvas.width = Math.floor(displayWidth * scale)
                activeCanvas.height = Math.floor(displayHeight * scale)
              }
            }, 120)
          })
          .catch((err) => {
            setError(err)
            setLoading(false)
            scriptLoadedRef.current = false
            console.error('Unity WebGL loading error:', err)
          })
      }

      loaderScript.onerror = () => {
        setError(new Error('Failed to load Unity loader script'))
        setLoading(false)
        scriptLoadedRef.current = false
      }

      document.body.appendChild(loaderScript)
      scriptLoadedRef.current = true
      cleanupTasks.push(() => {
        if (loaderScript.parentNode) {
          loaderScript.parentNode.removeChild(loaderScript)
        }
      })
    }

    let cancelIdle
    if ('requestIdleCallback' in window) {
      cancelIdle = window.requestIdleCallback(loadUnity, { timeout: 1500 })
    } else {
      const timeoutId = window.setTimeout(loadUnity, 250)
      cancelIdle = () => window.clearTimeout(timeoutId)
    }

    return () => {
      if (typeof cancelIdle === 'number') {
        window.cancelIdleCallback?.(cancelIdle)
      } else if (typeof cancelIdle === 'function') {
        cancelIdle()
      }

      cleanupTasks.forEach((fn) => {
        try {
          fn()
        } catch (e) {
          // ignore cleanup errors
        }
      })

      scriptLoadedRef.current = false
    }
  }, [canvasRef])

  return { loading, error, unityInstance: unityInstanceRef.current }
}

export default useUnity

