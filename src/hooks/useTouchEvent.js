import { useCallback, useEffect, useRef } from "react"

export const useTouchEvent = (
  element,
  { onRightSwipe, onLeftSwipe, onDownSwipe, onUpSwipe }
) => {
  const xDownRef = useRef()
  const yDownRef = useRef()

  const getTouche = (event) => {
    return event.touches[0]
  }

  const handleTouchMove = useCallback(
    (event) => {
      if (!xDownRef.current || !yDownRef.current) {
        return
      }

      const xUp = getTouche(event).clientX
      const yUp = getTouche(event).clientY

      const xDiff = xDownRef.current - xUp
      const yDiff = yDownRef.current - yUp

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          onRightSwipe()
        } else {
          onLeftSwipe()
        }
      } else if (yDiff > 0) {
        onDownSwipe()
      } else {
        onUpSwipe()
      }

      xDownRef.current = null
      yDownRef.current = null
    },
    [onDownSwipe, onLeftSwipe, onRightSwipe, onUpSwipe]
  )

  const handleTouchStart = useCallback((event) => {
    const firstTouch = getTouche(event)
    xDownRef.current = firstTouch.clientX
    yDownRef.current = firstTouch.clientY
  }, [])

  useEffect(() => {
    if (element) {
      element.addEventListener("touchstart", handleTouchStart)
      element.addEventListener("touchmove", handleTouchMove)
    }
    return () => {
      if (element) {
        element.removeEventListener("touchstart", handleTouchStart)
        element.removeEventListener("touchmove", handleTouchMove)
      }
    }
  }, [element, handleTouchMove, handleTouchStart])
}
