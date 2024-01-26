import { useRef } from 'react'
import { useCanvas } from '../../../hooks/useCanvas'

export function Canvas({ controlPoints, setControlPoints, setParsedParams }) {
  const canvas = useRef()

  const { handleMouseDown, handleMouseMove, handleMouseUp } = useCanvas({
    canvas,
    controlPoints,
    setControlPoints,
    setParsedParams
  })

  return (
    <canvas
      ref={canvas}
      id='canvas'
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseOut={handleMouseUp}
      width='300px'
      height='400px'
    ></canvas>
  )
}
