const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const offSetPoints = {
  x: 50,
  y: 100
}

const controlPoints = {
  cp1: {
    x: 245, //0.65 * 300 + offSetPoints.x    // 0.65 * 200 + 50  
    y: 385 //canvas.height - (0.05 * 300 + offSetPoints.y) // canvas.height - (0.05 * 200 + offSetPoints.y)
  },
  cp2: {
    x: 158, //0.36 * 300 + offSetPoints.x   // 0.36 * 200 + 50 
    y: 100 //canvas.height - (1 * 300 + offSetPoints.y)   // 
  }
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

let isDragging = false
let circleClicked

function DrawCanvas() {
  const { boundryLine1, boundryLine2, cp1, cp2, end } = initialCanvas

  ctx.save()

  //Boundry Line 1
  ctx.strokeStyle = 'grey'
  ctx.beginPath()
  ctx.moveTo(offSetPoints.x, 0)
  ctx.lineTo(boundryLine1.x, boundryLine1.y)
  ctx.lineCap = 'round'
  ctx.stroke()

  //Boundry Line 2
  ctx.beginPath()
  ctx.moveTo(canvas.width - offSetPoints.x, 0)
  ctx.lineTo(boundryLine2.x, boundryLine2.y)
  ctx.stroke()

  ctx.beginPath()
  ctx.fillStyle = 'blue'
  ctx.arc(offSetPoints.x, canvas.height - offSetPoints.y, 4, 0, 2 * Math.PI) // Start Point
  ctx.arc(canvas.width - offSetPoints.x, offSetPoints.y, 4, 0, 2 * Math.PI) // End Point
  ctx.fill()

  //Control points
  ctx.fillStyle = 'red'
  ctx.beginPath()
  ctx.arc(cp1.x, cp1.y, 6, 0, 2 * Math.PI) // cp1
  ctx.arc(cp2.x, cp2.y, 6, 0, 2 * Math.PI) // cp2
  ctx.fill()

  //Line control points
  ctx.beginPath()
  ctx.setLineDash([5, 15])
  ctx.moveTo(offSetPoints.x, canvas.height - offSetPoints.y)
  ctx.lineTo(cp1.x, cp1.y)
  ctx.stroke()

  ctx.beginPath()
  ctx.setLineDash([5, 15])
  ctx.moveTo(canvas.width - offSetPoints.x, offSetPoints.y)
  ctx.lineTo(cp2.x, cp2.y)
  ctx.stroke()
  ctx.restore()

  ctx.save()

  //Bezier curve
  ctx.beginPath()
  ctx.moveTo(offSetPoints.x + 4, canvas.height - offSetPoints.y)
  ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x - 4, end.y)
  ctx.strokeStyle = '#dddddf'
  ctx.lineWidth = 3
  ctx.stroke()
  ctx.restore()
}

function getMousePos(canvas, evt) {
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

function Dragging({ circleClicked, mouseX, mouseY }) {
  if (circleClicked === 'cp1') {
    controlPoints.cp1.x = mouseX
    controlPoints.cp1.y = mouseY
  } else if (circleClicked === 'cp2') {
    controlPoints.cp2.x = mouseX
    controlPoints.cp2.y = mouseY
  }
}

function MouseUp() {
  isDragging = false
}

function parseCssBezierParams({ controlPoints }) {
  const canvasSize = 300
  const { cp1, cp2 } = controlPoints

  const parsedParams = {
    cp1: {
      x: ((cp1.x - offSetPoints.x) / canvasSize).toFixed(2),
      y: ((canvas.height - cp1.y - offSetPoints.y) / canvasSize).toFixed(2)
    },
    cp2: {
      x: ((cp2.x - offSetPoints.x) / canvasSize).toFixed(2),
      y: ((canvas.height - cp2.y - offSetPoints.y) / canvasSize).toFixed(2)
    }
  }

  // console.log(
  //   `(${parsedParams.cp1.x}, ${parsedParams.cp1.y}, ${parsedParams.cp2.x}, ${parsedParams.cp2.y} )`
  // )
}

window.addEventListener('load', DrawCanvas())

canvas.addEventListener('mousedown', evt => {
  let mousePos = getMousePos(canvas, evt)

  if (mousePos.distanceFromCircle1 <= 6 || mousePos.distanceFromCircle2 <= 6) {
    isDragging = true
  }
})

canvas.addEventListener('mousemove', evt => {
  let mousePos = getMousePos(canvas, evt)

  if (mousePos.distanceFromCircle1 <= 6) {
    circleClicked = 'cp1'
  } else if (mousePos.distanceFromCircle2 <= 6) {
    circleClicked = 'cp2'
  }

  if (isDragging) {
    parseCssBezierParams({ controlPoints })

    Dragging({
      circleClicked: circleClicked,
      mouseX: mousePos.x,
      mouseY: mousePos.y
    })

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    DrawCanvas()
  }
})

canvas.addEventListener('mouseup', () => {
  isDragging = false
})
