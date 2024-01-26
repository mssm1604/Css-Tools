export function DrawCanvas({ canvas, ctx, offSetPoints, initialCanvas }) {
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
