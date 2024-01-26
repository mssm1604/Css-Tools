export function Dragging({ circleClicked, setControlPoints, mouseX, mouseY }) {
  setControlPoints(prevState => ({
    ...prevState,
    [circleClicked]: {
      x: mouseX <= 50 ? 50 : mouseX >= 250 ? 250 : mouseX,
      y: mouseY <= 6 ? 6 : mouseY >= 394 ? 394 : mouseY
    }
  }))
}

