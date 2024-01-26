export function parseCssBezierParams({
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
