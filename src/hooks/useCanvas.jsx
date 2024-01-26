import { useEffect, useState } from 'react'
import { CanvasParams } from '../components/bezier_curve_page/canvas/canvas_params'
import { getMousePos } from '../lib/get_mouse_pos'
import { DrawCanvas } from '../components/bezier_curve_page/canvas/draw_canvas'
import { Dragging } from '../components/bezier_curve_page/canvas/draggin'
import { parseCssBezierParams } from '../components/bezier_curve_page/canvas/parse_bezier_params'

export function useCanvas({
  canvas,
  controlPoints,
  setControlPoints,
  setParsedParams
}) {
  const [isDragging, setIsDragging] = useState(false)
  const [circleClicked, setCircleClicked] = useState(null)

  const handleMouseDown = evt => {
    const { distanceFromCircle1, distanceFromCircle2 } = getMousePos({
      canvas: canvas.current,
      evt,
      controlPoints
    })

    if (distanceFromCircle1 <= 6) {
      setCircleClicked('cp1')
      setIsDragging(true)
    } else if (distanceFromCircle2 <= 6) {
      setCircleClicked('cp2')
      setIsDragging(true)
    }
  }

  const handleMouseMove = evt => {
    if (!controlPoints) return

    const { x: mouseX, y: mouseY } = getMousePos({
      canvas: canvas.current,
      evt,
      controlPoints
    })

    if (isDragging) {
      Dragging({
        circleClicked,
        setControlPoints,
        mouseX,
        mouseY
      })
    }
  }

  const handleMouseUp = () => {
    setCircleClicked(null)
    setIsDragging(false)
  }

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')

    const { offSetPoints, initialCanvas } = CanvasParams({
      canvas,
      controlPoints
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    DrawCanvas({ canvas, ctx, offSetPoints, initialCanvas })

    parseCssBezierParams({
      canvas,
      controlPoints,
      offSetPoints,
      setParsedParams
    })
  }, [controlPoints])

  return {
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}
