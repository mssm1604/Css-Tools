import { useEffect, useState } from 'react'
import './slider.css'

export function DemoSlider({ cubicBezierValue }) {
  const [bezierDuration, setBezierDuration] = useState(640)
  const slider = document.querySelector('.slider_focus')

  const handleChangeDuration = e => {
    const inputValue = e.target.value
    setBezierDuration(inputValue)
  }

  const handleChangeItemPositions = () => {
    const firstItem = slider.firstChild

    slider.insertAdjacentElement('beforeend', firstItem)
  }

  const handlePlay = () => {
    slider.style.transition = `transform ${bezierDuration}ms ${cubicBezierValue}`
    slider.style.transform = `translateX(-${200}%)`

    setTimeout(() => {
      slider.style.transition = 'none'
      handleChangeItemPositions()
      slider.style.transform = `translateX(-${100}%)`
    }, bezierDuration)
  }

  useEffect(() => {
    const slider = document.querySelector('.slider_focus')
    const lastSlideItem = document.querySelector('.slider_focus').lastChild

    slider.insertAdjacentElement('afterbegin', lastSlideItem)
  }, [])

  return (
    <>
      <div className='flex-row slider_focus'>
        <article className='slider_item'>
          <img src='/slider_img_1.jpeg' alt='' className='slider_img' />
        </article>
        <article className='slider_item'>
          <img src='/slider_img_2.jpeg' alt='' className='slider_img' />
        </article>
        <article className='slider_item'>
          <img src='/slider_img_3.jpeg' alt='' className='slider_img' />
        </article>
      </div>

      <div className='control_buttons_wrapper'>
        <label className='controlbtns_input_label'>
          Duration [ms]
          <input
            type='number'
            onChange={handleChangeDuration}
            value={bezierDuration}
          />
        </label>
        <button className='controlbtns_btn' onClick={handlePlay}>Play</button>
      </div>
    </>
  )
}
