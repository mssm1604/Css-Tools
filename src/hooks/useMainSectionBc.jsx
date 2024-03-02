import { useState } from 'react'

const initialControlPoints = {
  cp1: {
    x: 180,
    y: 290
  },
  cp2: {
    x: 122,
    y: 100
  }
}

const initialParsedParams = {
  cp1: { x: 0.65, y: 0.05 },
  cp2: { x: 0.36, y: 1 }
}

export function useMainSectionBc() {
  const [controlPoints, setControlPoints] = useState(initialControlPoints)
  const [parsedParams, setParsedParams] = useState(initialParsedParams)

  const cubicBezierValue = `cubic-bezier(
    ${parsedParams.cp1.x},
    ${parsedParams.cp1.y},
    ${parsedParams.cp2.x},
    ${parsedParams.cp2.y})`

  const handleInputOnChange = e => {
    const inputName = e.target.name
    const inputAxis = e.target.getAttribute('data-axis')
    const inputValue = e.target.value

    if (
      (inputAxis === 'x' && inputValue >= 1) ||
      (inputAxis === 'x' && inputValue <= 0)
    ) {
      setParsedParams(prevVale => ({
        ...prevVale,
        [inputName]: {
          x: inputValue > 0 ? 1.0 : 0.0,
          y: prevVale[inputName].y
        }
      }))
      return
    }

    const parsedInputValue =
      inputAxis === 'x' ? inputValue * 200 + 50 : 400 - (inputValue * 200 + 100)

    setControlPoints(prevValue => ({
      ...prevValue,
      [inputName]: {
        x: inputAxis === 'x' ? parsedInputValue : prevValue[inputName].x,
        y: inputAxis === 'y' ? parsedInputValue : prevValue[inputName].y
      }
    }))
  }

  const handleResultsFieldOnClick = async () => {
    const messageToCopy = document.querySelector('.results_tooltip')

    try {
      await navigator.clipboard.writeText(cubicBezierValue)
      messageToCopy.classList.add('active')

      setTimeout(() => {
        messageToCopy.classList.remove('active')
      }, 800)
    } catch (error) {
      console.error('there was an error trying to copy this', error)
    }
  }

  return {
    controlPoints,
    setControlPoints,
    parsedParams,
    setParsedParams,
    cubicBezierValue,
    handleInputOnChange,
    handleResultsFieldOnClick
  }
}
