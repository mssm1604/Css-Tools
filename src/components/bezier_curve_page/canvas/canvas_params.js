export function CanvasParams({ canvas, controlPoints }) {
  const offSetPoints = {
    x: 50,
    y: 100
  }

  const initialCanvas = {
    boundryLine1: {
      x: offSetPoints.x,
      y: canvas.height
    },
    boundryLine2: {
      x: canvas.width - offSetPoints.x,
      y: canvas.height
    },
    cp1: controlPoints.cp1,
    cp2: controlPoints.cp2,
    end: {
      x: canvas.width - offSetPoints.x,
      y: offSetPoints.y
    }
  }

  return {
    offSetPoints,
    initialCanvas,
    controlPoints
  }
}
