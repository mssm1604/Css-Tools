import { useEffect, useRef, useState } from 'react'
import { CanvasParams } from './canvas_params'

function DrawCanvas({ canvas, ctx, offSetPoints, initialCanvas }) {
  //   if (!canvas || !ctx) return
  const { boundryLine1, boundryLine2, cp1, cp2, end } = initialCanvas

  ctx.save()

  //Boundry Line 1
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.40)'
  ctx.beginPath()
  ctx.moveTo(offSetPoints.x, 0)
  ctx.lineTo(boundryLine1.x, boundryLine1.y)
  ctx.stroke()

  //Boundry Line 2
  ctx.beginPath()
  ctx.moveTo(canvas.width - offSetPoints.x, 0)
  ctx.lineTo(boundryLine2.x, boundryLine2.y)
  ctx.stroke()

  //Line control points
  ctx.beginPath()
  ctx.setLineDash([5, 8])
  ctx.lineWidth = 0.5
  ctx.moveTo(offSetPoints.x, canvas.height - offSetPoints.y)
  ctx.lineTo(cp1.x, cp1.y)
  ctx.stroke()

  ctx.moveTo(canvas.width - offSetPoints.x, offSetPoints.y)
  ctx.lineTo(cp2.x, cp2.y)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.60)'
  ctx.stroke()

  ctx.restore()

  ctx.save()
  //Bezier curve
  ctx.beginPath()
  ctx.moveTo(offSetPoints.x, canvas.height - offSetPoints.y)
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y)
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.66)'
  ctx.lineWidth = 2.4
  ctx.stroke()
  ctx.restore()

  ctx.save()

  // Start Point
  ctx.beginPath()
  ctx.fillStyle = '#8EB4C5'
  ctx.lineWidth = 2
  ctx.arc(offSetPoints.x, canvas.height - offSetPoints.y, 6, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fill()

  // End Point
  ctx.beginPath()
  ctx.fillStyle = '#8EB4C5'
  ctx.arc(canvas.width - offSetPoints.x, offSetPoints.y, 6, 0, 2 * Math.PI)
  ctx.stroke()
  ctx.fill()
  ctx.restore()

  //Control points
  ctx.fillStyle = '#FB8213'
  ctx.beginPath()
  ctx.arc(cp1.x, cp1.y, 6, 0, 2 * Math.PI) // cp1
  ctx.fill()
  ctx.stroke()

  ctx.beginPath()
  ctx.arc(cp2.x, cp2.y, 6, 0, 2 * Math.PI) // cp2
  ctx.fill()
  ctx.stroke()
}

function getMousePos({ canvas, evt, controlPoints }) {
  const canvasOffSet = canvas.getBoundingClientRect()

  const mousePos = {
    x: evt.clientX - canvasOffSet.left,
    y: evt.clientY - canvasOffSet.top
  }

  const distanceFromCircle1 = Math.sqrt(
    (mousePos.x - controlPoints.cp1.x) ** 2 +
      (mousePos.y - controlPoints.cp1.y) ** 2
  )

  const distanceFromCircle2 = Math.sqrt(
    (mousePos.x - controlPoints.cp2.x) ** 2 +
      (mousePos.y - controlPoints.cp2.y) ** 2
  )

  return {
    x: mousePos.x,
    y: mousePos.y,
    distanceFromCircle1,
    distanceFromCircle2
  }
}

function Dragging({ circleClicked, setControlPoints, mouseX, mouseY }) {
  setControlPoints(prevState => ({
    ...prevState,
    [circleClicked]: {
      x: mouseX <= 50 ? 50 : mouseX >= 250 ? 250 : mouseX,
      y: mouseY <= 6 ? 6 : mouseY >= 394 ? 394 : mouseY
    }
  }))
}

function parseCssBezierParams({
  canvas,
  controlPoints,
  offSetPoints,
  setParsedParams
}) {
  const canvasSize = {
    x: canvas.width - offSetPoints.x * 2,
    y: canvas.height - offSetPoints.y * 2
  }
  const { cp1, cp2 } = controlPoints

  const parsedParams = {
    cp1: {
      x: ((cp1.x - offSetPoints.x) / canvasSize.x).toFixed(2),
      y: ((canvas.height - cp1.y - offSetPoints.y) / canvasSize.y).toFixed(2)
    },
    cp2: {
      x: ((cp2.x - offSetPoints.x) / canvasSize.x).toFixed(2),
      y: ((canvas.height - cp2.y - offSetPoints.y) / canvasSize.y).toFixed(2)
    }
  }

  const { cp1: ppcp1, cp2: ppcp2 } = parsedParams

  setParsedParams({
    cp1: { x: ppcp1.x, y: ppcp1.y },
    cp2: { x: ppcp2.x, y: ppcp2.y }
  })
}

export function Canvas({ controlPoints, setControlPoints, setParsedParams }) {
  const [isDragging, setIsDragging] = useState(false)
  const [circleClicked, setCircleClicked] = useState(null)

  const canvas = useRef()

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

  return (
    <canvas
      ref={canvas}
      id='canvas'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseOut={handleMouseUp}
      width='300px'
      height='400px'
    ></canvas>
  )
}
