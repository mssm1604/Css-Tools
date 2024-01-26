import { CheckIcon, ClipboardIcon, RightArrow } from '../icons/icons'
import { Canvas } from './canvas/canvas'
import { DemoSlider } from '../demos/slider'
import { useMainSectionBc } from '../../hooks/useMainSectionBc'
import './main_section_bc.css'

export function MainSectionBc() {
  const {
    controlPoints,
    setControlPoints,
    parsedParams,
    setParsedParams,
    cubicBezierValue,
    handleInputOnChange,
    handleResultsFieldOnClick
  } = useMainSectionBc()

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
