import { useState } from 'react'
import { CheckIcon, ClipboardIcon, RightArrow } from '../icons/icons'
import { Canvas } from './canvas/canvas'
import './main_section_bc.css'
import { DemoSlider } from '../demos/slider'

export function MainSectionBc() {
  const [controlPoints, setControlPoints] = useState({
    cp1: {
      x: 180,
      y: 290
    },
    cp2: {
      x: 122,
      y: 100
    }
  })
  const [parsedParams, setParsedParams] = useState({
    cp1: { x: 0.65, y: 0.05 },
    cp2: { x: 0.36, y: 1 }
  })

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
    const copiedMessage = document.querySelector('.results_tooltip')

    try {
      await navigator.clipboard.writeText(cubicBezierValue)
      copiedMessage.classList.add('active')

      setTimeout(() => {
        copiedMessage.classList.remove('active')
      }, 800)
    } catch (error) {
      console.error('there was an error trying to copy this', error)
    }
  }

  return (
    <main>
      <section className='flex-col bezier_curve_section'>
        <article className='flex-col bezier_curve_body'>
          <div className='flex-col title_wrapper'>
            <h2 className='title_h2'>Bezier curve </h2>
            <span className='title_span'>Easing</span>
          </div>

          <div className='flex-row canvas_wrapper'>
            <Canvas
              controlPoints={controlPoints}
              setControlPoints={setControlPoints}
              setParsedParams={setParsedParams}
            />
          </div>
        </article>

        <footer className='flex-col bezier_section_footer'>
          <div className='flex-row params_wrapper'>
            <input
              name='cp1'
              data-axis='x'
              className='input_params'
              type='number'
              value={parsedParams.cp1.x}
              step={0.01}
              onChange={handleInputOnChange}
            />
            <input
              name='cp1'
              data-axis='y'
              className='input_params'
              type='number'
              value={parsedParams.cp1.y}
              step={0.01}
              onChange={handleInputOnChange}
            />
            <input
              name='cp2'
              data-axis='x'
              className='input_params'
              type='number'
              value={parsedParams.cp2.x}
              step={0.01}
              onChange={handleInputOnChange}
            />
            <input
              name='cp2'
              data-axis='y'
              className='input_params'
              type='number'
              value={parsedParams.cp2.y}
              step={0.01}
              onChange={handleInputOnChange}
            />
          </div>

          <div className='flex-row bezier_result_wrapper'>
            <span className='arrow'>
              <RightArrow />
            </span>

            <div
              onClick={handleResultsFieldOnClick}
              className='flex-row results_info'
            >
              <p>{cubicBezierValue}</p>
              <span className='clipboard_icon'>
                <ClipboardIcon />
              </span>

              <div className='flex-row results_tooltip'>
                <span>Copied</span> <CheckIcon />
              </div>
            </div>
          </div>
        </footer>
      </section>

      <section className='demos_wrapper'>
        <DemoSlider cubicBezierValue={cubicBezierValue} />
      </section>
    </main>
  )
}
