export function getMousePos({ canvas, evt, controlPoints }) {
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
