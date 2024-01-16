/*
 * Canvas curve editor adapted from code by Craig Buttler (http://twitter.com/craigbuckler) for Site Point
 */

//window.history.replaceState({}, document.title, "/" + "index.html");

var canvas,
  ctx,
  code,
  point,
  style,
  drag = null,
  dPoint

var easeInSine = [0.47, 0, 0.745, 0.715]
var easeOutSine = [0.39, 0.575, 0.565, 1]
var easeInOutSine = [0.445, 0.05, 0.55, 0.95]

var easeInQuad = [0.55, 0.085, 0.68, 0.53]
var easeOutQuad = [0.25, 0.46, 0.45, 0.94]
var easeInOutQuad = [0.455, 0.03, 0.515, 0.955]

var easeInCubic = [0.55, 0.055, 0.675, 0.19]
var easeOutCubic = [0.215, 0.61, 0.355, 1]
var easeInOutCubic = [0.65, 0.05, 0.36, 1]

var easeInQuart = [0.895, 0.03, 0.685, 0.22]
var easeOutQuart = [0.165, 0.84, 0.44, 1]
var easeInOutQuart = [0.77, 0, 0.175, 1]

var easeInQuint = [0.755, 0.05, 0.855, 0.06]
var easeOutQuint = [0.23, 1, 0.32, 1]
var easeInOutQuint = [0.86, 0, 0.07, 1]

var easeInExpo = [0.95, 0.05, 0.795, 0.035]
var easeOutExpo = [0.19, 1, 0.22, 1]
var easeInOutExpo = [1, 0, 0, 1]

var easeInCirc = [0.6, 0.04, 0.98, 0.335]
var easeOutCirc = [0.075, 0.82, 0.165, 1]
var easeInOutCirc = [0.785, 0.135, 0.15, 0.86]

var easeInBack = [0.6, -0.28, 0.735, 0.045]
var easeOutBack = [0.175, 0.885, 0.32, 1.275]
var easeInOutBack = [0.68, -0.55, 0.265, 1.55]

var easingCurve = easeInOutCubic.slice(0)
var easingCurveArray = easeInOutCubic.slice(0)
var easingCurveCode =
  'cubic-bezier(' +
  easingCurve[0] +
  ',' +
  easingCurve[1] +
  ',' +
  easingCurve[2] +
  ',' +
  easingCurve[3] +
  ');'

var transitionFlag = 0

var duration = 640
var offset = 0

var currentDemo = 0
var totalDemos = 5

var demo0Title = 'Gallery Carousel'
var demo0Counter = 0

var demo1Title = 'Side Menu'
var demo1Open = 0

var demo2Title = 'Scroll Jack'
var demo2Counter = 0

var demo3Title = 'Bottom Drawer'
var demo3Open = 0

var demo4Title = 'Modal'
var demo4Open = 0

var btn1 = document.getElementById('btn-1')
var btn2 = document.getElementById('btn-2')
var btn3 = document.getElementById('btn-3')
var btn4 = document.getElementById('btn-4')
var btn5 = document.getElementById('btn-5')
var btn6 = document.getElementById('btn-6')
var btn7 = document.getElementById('btn-7')
var btn8 = document.getElementById('btn-8')
var btn9 = document.getElementById('btn-9')
var btn10 = document.getElementById('btn-10')
var btn11 = document.getElementById('btn-11')
var btn12 = document.getElementById('btn-12')
var btn13 = document.getElementById('btn-13')
var btn14 = document.getElementById('btn-14')
var btn15 = document.getElementById('btn-15')
var btn16 = document.getElementById('btn-16')
var btn17 = document.getElementById('btn-17')
var btn18 = document.getElementById('btn-18')
var btn19 = document.getElementById('btn-19')
var btn20 = document.getElementById('btn-20')
var btn21 = document.getElementById('btn-21')
var btn22 = document.getElementById('btn-22')
var btn23 = document.getElementById('btn-23')
var btn24 = document.getElementById('btn-24')

var sidePanel = document.getElementById('side-panel')
var sidePanelClose = document.getElementById('side-panel-close')
var demoSettings = document.getElementById('demo-settings')

var easingTitle = document.getElementById('easing-title')
var easingDropdown = document.getElementById('easing-dropdown')
var easingDropdownText = document.getElementById('easing-dropdown-text')
var easingDropdownOpen = document.getElementById('easing-dropdown-open')
var easingDropdown0 = document.getElementById('easing-dropdown-0')
var easingDropdown1 = document.getElementById('easing-dropdown-1')
var easingDropdown2 = document.getElementById('easing-dropdown-2')

var easing0 = document.getElementById('easing-0')
var easing1 = document.getElementById('easing-1')
var easing2 = document.getElementById('easing-2')

var tabTitle0 = document.getElementById('tab-title-0')
var tabTitle1 = document.getElementById('tab-title-1')
var tabTitle2 = document.getElementById('tab-title-2')

var tab0 = document.getElementById('tab-0')
var tab1 = document.getElementById('tab-1')
var tab2 = document.getElementById('tab-2')

var inputX1 = document.getElementById('custom-input-x1')
var inputY1 = document.getElementById('custom-input-y1')

var inputX2 = document.getElementById('custom-input-x2')
var inputY2 = document.getElementById('custom-input-y2')

var inputDuration = document.getElementById('demo-duration')
var inputOffset = document.getElementById('demo-offset')

var demoPlay = document.getElementById('demo-play')

var demoNext = document.getElementById('demo-next')
var demoPrevious = document.getElementById('demo-previous')

var clipboardAlert = document.getElementById('clipboard-alert-container')
var clipboardCopy = document.getElementById('clipboard-copy')
var clipboardCopyInput = document.getElementById('clipboard-copy-input')

var shareDetails = document.getElementById('share-details')
var shareLink = document.getElementById('share-link')
var shareCopy = document.getElementById('share-copy')
var shareButton = document.getElementById('share-btn')

var sponsor = document.getElementById('sponsor')

var shareOpen = 0

//?demo=1&curve=0.65,0.05,0.36,1&duration=640&offset=0

function getUrlVars() {
  var vars = {}
  var parts = window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (m, key, value) {
      vars[key] = value
    }
  )
  return vars
}

var demoURL = getUrlVars()['demo']
var curveURL = getUrlVars()['curve']
var durationURL = getUrlVars()['duration']
var offsetURL = getUrlVars()['offset']

if (demoURL) {
  console.log('demoURL:' + demoURL)

  currentDemo = parseInt(demoURL)

  document.getElementById('demo-current').innerHTML = currentDemo + 1
  document.getElementById('demo-title').innerHTML = eval(
    'demo' + currentDemo + 'Title'
  )

  demos = document.getElementsByClassName('demo')

  for (i = 0; i < demos.length; i++) {
    demos[i].classList.remove('show')
  }

  document.getElementById('demo-' + currentDemo).classList.add('show')
}

if (curveURL) {
  console.log('curveURL:' + curveURL)

  // Jump to custom curve Tab...

  tabTitle0.classList.remove('active')
  tabTitle1.classList.add('active')
  tabTitle2.classList.remove('active')

  tab0.classList.remove('active')
  tab1.classList.add('active')
  tab2.classList.remove('active')

  sponsor.classList.remove('show')

  var buttonsArray = document.getElementsByClassName('easing-btn')

  for (i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].classList.remove('active')
  }

  easingTitle.innerHTML = 'Select an easing curve'

  var curveArr = curveURL.split(',')

  easingCurve[0] = curveArr[0]
  easingCurve[1] = curveArr[1]
  easingCurve[2] = curveArr[2]
  easingCurve[3] = curveArr[3]
}

if (durationURL) {
  console.log('durationURL:' + durationURL)
  duration = parseInt(durationURL)

  inputDuration.value = duration
}

if (offsetURL) {
  console.log('offsetURL:' + offsetURL)
  offset = parseInt(offsetURL)

  inputOffset.value = offset
}

var uri = window.location.toString()

if (uri.indexOf('?') > 0) {
  var clean_uri = uri.substring(0, uri.indexOf('?'))
  window.history.replaceState({}, document.title, clean_uri)
}

updateShareFunction = function () {
  shareURL =
    'easings.co' +
    '?demo=' +
    currentDemo +
    '&duration=' +
    duration +
    '&offset=' +
    offset +
    '&curve=' +
    easingCurve[0] +
    ',' +
    easingCurve[1] +
    ',' +
    easingCurve[2] +
    ',' +
    easingCurve[3]

  console.log('Share URL: ' + shareURL)

  shareLink.value = shareURL
}

shareCopy.onclick = function () {
  shareLink.select()
  shareLink.setSelectionRange(0, 99999)
  document.execCommand('copy')

  shareOpen = 0
  shareDetails.classList.remove('show')
}

shareButton.onclick = function () {
  console.log('Share')

  if (shareOpen) {
    shareDetails.classList.remove('show')
    shareOpen = 0
  } else {
    shareDetails.classList.add('show')
    shareOpen = 1
  }
}

clipboardCopy.onclick = function () {
  clipboardCopyInput.value = easingCurveCode
  clipboardCopyInput.select()
  clipboardCopyInput.setSelectionRange(0, 99999)
  document.execCommand('copy')

  clipboardAlert.classList.add('show')
  setTimeout(function () {
    clipboardAlert.classList.remove('show')
  }, 1000)
  //console.log(easingCurveCode);
}
demoNext.onclick = function () {
  if (currentDemo < totalDemos - 1) {
    currentDemo++
  } else {
    currentDemo = 0
  }

  //document.getElementById('demo-current').innerHTML = "0"+(currentDemo+1);
  document.getElementById('demo-current').innerHTML = currentDemo + 1

  document.getElementById('demo-title').innerHTML = eval(
    'demo' + currentDemo + 'Title'
  )

  demos = document.getElementsByClassName('demo')
  for (i = 0; i < demos.length; i++) {
    demos[i].classList.remove('show')
  }
  document.getElementById('demo-' + currentDemo).classList.add('show')

  updateShareFunction()
}

demoPrevious.onclick = function () {
  if (currentDemo > 0) {
    currentDemo--
  } else {
    currentDemo = totalDemos - 1
  }

  //document.getElementById('demo-current').innerHTML = "0"+(currentDemo+1);
  document.getElementById('demo-current').innerHTML = currentDemo + 1

  document.getElementById('demo-title').innerHTML = eval(
    'demo' + currentDemo + 'Title'
  )

  demos = document.getElementsByClassName('demo')
  for (i = 0; i < demos.length; i++) {
    demos[i].classList.remove('show')
  }
  document.getElementById('demo-' + currentDemo).classList.add('show')

  updateShareFunction()
}

demoPlay.onclick = function () {
  if (transitionFlag != 1) {
    if (currentDemo == 0) {
      transitionFlag = 1
      playDemo0()
    } else if (currentDemo == 1) {
      transitionFlag = 1
      playDemo1()
    } else if (currentDemo == 2) {
      transitionFlag = 1
      playDemo2()
    } else if (currentDemo == 3) {
      transitionFlag = 1
      playDemo3()
    } else if (currentDemo == 4) {
      transitionFlag = 1
      playDemo4()
    }
  }
}

demoSettings.onclick = function () {
  sidePanel.classList.add('open')
}

sidePanelClose.onclick = function () {
  sidePanel.classList.remove('open')
}

tabTitle0.onclick = function () {
  tabTitle0.classList.add('active')
  tabTitle1.classList.remove('active')
  tabTitle2.classList.remove('active')

  tab0.classList.add('active')
  tab1.classList.remove('active')
  tab2.classList.remove('active')

  sponsor.classList.add('show')
}

tabTitle1.onclick = function () {
  tabTitle0.classList.remove('active')
  tabTitle1.classList.add('active')
  tabTitle2.classList.remove('active')

  tab0.classList.remove('active')
  tab1.classList.add('active')
  tab2.classList.remove('active')

  sponsor.classList.remove('show')

  var buttonsArray = document.getElementsByClassName('easing-btn')

  for (i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].classList.remove('active')
  }

  easingTitle.innerHTML = 'Select an easing curve'
}
tabTitle2.onclick = function () {
  tabTitle0.classList.remove('active')
  tabTitle1.classList.remove('active')
  tabTitle2.classList.add('active')

  tab0.classList.remove('active')
  tab1.classList.remove('active')
  tab2.classList.add('active')

  sponsor.classList.remove('show')
}

window.onclick = function (e) {
  //console.log(e.target);

  targetElement = e.target

  if (targetElement == easingDropdown) {
    // Do nothing.
  } else {
    easingDropdownOpen.classList.remove('open')
  }

  if (
    targetElement == shareDetails ||
    targetElement == shareButton ||
    targetElement == shareLink
  ) {
    // Do nothing.
  } else {
    shareOpen = 0
    shareDetails.classList.remove('show')
  }
}

easingDropdown.onclick = function () {
  easingDropdownOpen.classList.toggle('open')
}

easingDropdown0.onclick = function () {
  easingDropdownText.innerHTML = 'easeInOut'
  easing0.classList.add('active')
  easingDropdown0.classList.add('active')
  easing1.classList.remove('active')
  easingDropdown1.classList.remove('active')
  easing2.classList.remove('active')
  easingDropdown2.classList.remove('active')
}
easingDropdown1.onclick = function () {
  easingDropdownText.innerHTML = 'easeIn'
  easing0.classList.remove('active')
  easingDropdown0.classList.remove('active')
  easing1.classList.add('active')
  easingDropdown1.classList.add('active')
  easing2.classList.remove('active')
  easingDropdown2.classList.remove('active')
}
easingDropdown2.onclick = function () {
  easingDropdownText.innerHTML = 'easeOut'
  easing0.classList.remove('active')
  easingDropdown0.classList.remove('active')
  easing1.classList.remove('active')
  easingDropdown1.classList.remove('active')
  easing2.classList.add('active')
  easingDropdown2.classList.add('active')
}

inputX1.addEventListener('change', event => {
  checkMax()
  point.cp1.x = inputX1.value * 150 + 75
  DrawCanvas()
})

inputY1.addEventListener('change', event => {
  checkMax()
  point.cp1.y = (1 - inputY1.value) * 150 + 120
  DrawCanvas()
})

inputX2.addEventListener('change', event => {
  checkMax()
  point.cp2.x = inputX2.value * 150 + 75
  DrawCanvas()
})

inputY2.addEventListener('change', event => {
  checkMax()
  point.cp2.y = (1 - inputY2.value) * 150 + 120
  DrawCanvas()
})

inputDuration.addEventListener('change', event => {
  checkMax()
  duration = inputDuration.value

  updateShareFunction()
})

inputOffset.addEventListener('change', event => {
  checkMax()
  offset = inputOffset.value

  updateShareFunction()
})

function playDemo0() {
  console.log('Demo 0')

  var demoImage0 = document.getElementById('demo-0-container-0')
  var demoImage1 = document.getElementById('demo-0-container-1')
  var demoImage2 = document.getElementById('demo-0-container-2')
  var demoImage3 = document.getElementById('demo-0-container-3')
  var demoImage4 = document.getElementById('demo-0-container-4')
  var demoImage5 = document.getElementById('demo-0-container-5')

  var totalImages = 6

  var start = demo0Counter * 100
  var distance = (demo0Counter + 1) * 100

  if (demo0Counter == 0 || demo0Counter == 3) {
    document.getElementById('demo-0-dot-0').classList.remove('active')
    document.getElementById('demo-0-dot-1').classList.add('active')
    document.getElementById('demo-0-dot-2').classList.remove('active')
  } else if (demo0Counter == 1 || demo0Counter == 4) {
    document.getElementById('demo-0-dot-0').classList.remove('active')
    document.getElementById('demo-0-dot-1').classList.remove('active')
    document.getElementById('demo-0-dot-2').classList.add('active')
  } else if (demo0Counter == 2 || demo0Counter == 5) {
    document.getElementById('demo-0-dot-0').classList.add('active')
    document.getElementById('demo-0-dot-1').classList.remove('active')
    document.getElementById('demo-0-dot-2').classList.remove('active')
  }

  //console.log('Start'+ start);
  //console.log("Distance: "+distance)

  for (i = 0; i < totalImages; i++) {
    demoImage = eval('demoImage' + i)

    if (i == totalImages - 1) {
      console.log('Last Image')

      Velocity(
        demoImage,

        { translateX: ['-' + distance + '%', '-' + start + '%'] },
        {
          duration: duration,
          delay: i * offset,
          easing: easingCurve,
          complete: function (elements, activeCall) {
            console.log('Last Complete')

            transitionFlag = 0

            if (demo0Counter < 2) {
              demo0Counter++
            } else {
              console.log('Reset Everything')

              demoImage0.style.transform = 'translateX(0px)'
              demoImage1.style.transform = 'translateX(0px)'
              demoImage2.style.transform = 'translateX(0px)'
              demoImage3.style.transform = 'translateX(0px)'
              demoImage4.style.transform = 'translateX(0px)'
              demoImage5.style.transform = 'translateX(0px)'
              demo0Counter = 0
            }
          }
        }
      )
    } else {
      Velocity(
        demoImage,
        { translateX: ['-' + distance + '%', '-' + start + '%'] },
        {
          duration: duration,
          delay: i * offset,
          easing: easingCurve,
          complete: function (elements, activeCall) {
            //console.log("Finishing " + elements.length + " elements:", elements);
            console.log('Complete')
          }
        }
      )
    }
  }
}

function playDemo1() {
  console.log('Demo 1')

  var demoImage = document.getElementById('demo-1-image')
  var demoMenu = document.getElementById('demo-1-menu')
  var demoMenu0 = document.getElementById('demo-1-menu-0')
  var demoMenu1 = document.getElementById('demo-1-menu-1')
  var demoMenu2 = document.getElementById('demo-1-menu-2')
  var demoMenu3 = document.getElementById('demo-1-menu-3')

  if (demo1Open == 0) {
    demoMenu.classList.add('show')

    Velocity(
      demoMenu,

      { translateX: ['0px', '240px'] },
      { duration: duration, delay: 0, easing: easingCurve }
    )

    if (offset != 0) {
      demoMenu0.style.transform = 'translateX(40px)'
      demoMenu1.style.transform = 'translateX(40px)'
      demoMenu2.style.transform = 'translateX(40px)'
      demoMenu3.style.transform = 'translateX(40px)'

      Velocity(
        demoMenu0,

        { translateX: ['0px', '40px'] },
        { duration: duration, delay: 0, easing: easingCurve }
      )

      Velocity(
        demoMenu1,

        { translateX: ['0px', '40px'] },
        { duration: duration, delay: offset, easing: easingCurve }
      )

      Velocity(
        demoMenu2,

        { translateX: ['0px', '40px'] },
        { duration: duration, delay: offset * 2, easing: easingCurve }
      )

      Velocity(
        demoMenu3,

        { translateX: ['0px', '40px'] },
        { duration: duration, delay: offset * 3, easing: easingCurve }
      )
    }

    Velocity(
      demoImage,

      { translateX: ['-120px', '0px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo1Open = 1
        }
      }
    )
  } else {
    Velocity(
      demoMenu,

      { translateX: ['240px', '0px'] },
      { duration: duration, delay: 0, easing: easingCurve }
    )

    Velocity(
      demoImage,

      { translateX: ['0px', '-120px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo1Open = 0
          demoMenu.classList.remove('show')
        }
      }
    )
  }
}

function playDemo2() {
  console.log('Demo 2')

  var demoImage0 = document.getElementById('demo-2-image-0')
  var demoImage1 = document.getElementById('demo-2-image-1')
  var demoImage2 = document.getElementById('demo-2-image-2')

  var demoCaption0 = document.getElementById('demo-2-caption-0')
  var demoCaption1 = document.getElementById('demo-2-caption-1')
  var demoCaption2 = document.getElementById('demo-2-caption-2')

  var totalImages = 3

  var start = demo2Counter * 100
  var distance = (demo2Counter + 1) * 100

  //console.log('Start'+ start);
  //console.log("Distance: "+distance)

  for (i = 0; i < totalImages; i++) {
    if (i == totalImages - 1) {
      demoImage = eval('demoImage' + i)
      demoCaption = eval('demoCaption' + i)

      Velocity(
        demoCaption,

        { translateY: ['-' + distance + '%', '-' + start + '%'] },
        { duration: duration, delay: i * offset, easing: easingCurve }
      )

      Velocity(
        demoImage,

        { translateY: ['-' + distance + '%', '-' + start + '%'] },
        {
          duration: duration,
          delay: i * offset,
          easing: easingCurve,
          complete: function (elements, activeCall) {
            console.log('Last Complete')

            transitionFlag = 0

            if (demo2Counter < 1) {
              demo2Counter++
            } else {
              console.log('Reset Everything')

              demoImage0.style.transform = 'translateY(0px)'
              demoImage1.style.transform = 'translateY(0px)'
              demoImage2.style.transform = 'translateY(0px)'

              demoCaption0.style.transform = 'translateY(0px)'
              demoCaption1.style.transform = 'translateY(0px)'
              demoCaption2.style.transform = 'translateY(0px)'

              demo2Counter = 0
            }
          }
        }
      )
    } else {
      demoImage = eval('demoImage' + i)
      demoCaption = eval('demoCaption' + i)

      Velocity(
        demoCaption,

        { translateY: ['-' + distance + '%', '-' + start + '%'] },
        { duration: duration, delay: i * offset, easing: easingCurve }
      )

      Velocity(
        demoImage,

        { translateY: ['-' + distance + '%', '-' + start + '%'] },
        { duration: duration, delay: i * offset, easing: easingCurve }
      )
    }
  }
}

function playDemo3() {
  console.log('Demo 3')

  var demoMenu = document.getElementById('demo-3-menu')
  var map = document.getElementById('map')

  if (demo3Open == 0) {
    demoMenu.classList.add('show')

    Velocity(
      map,

      { translateY: ['-32px', '0px'] },
      { duration: duration, delay: 0, easing: easingCurve }
    )

    Velocity(
      demoMenu,

      { translateY: ['-216px', '0px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo3Open = 1
        }
      }
    )
  } else {
    Velocity(
      map,

      { translateY: ['0px', '-32px'] },
      { duration: duration, delay: 0, easing: easingCurve }
    )

    Velocity(
      demoMenu,

      { translateY: ['0px', '-216px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo3Open = 0
          demoMenu.classList.remove('show')
        }
      }
    )
  }
}

function playDemo4() {
  console.log('Demo 4')

  var demoModal = document.getElementById('demo-4-modal')
  var tint = document.getElementById('demo-4-tint')

  if (demo4Open == 0) {
    demoModal.classList.add('show')

    /*
			Velocity(tint,
		  				
				{ opacity: ["0.3", "0"]},
				{ duration: duration, delay: 0, easing: easingCurve }
			);
			*/

    Velocity(
      demoModal,

      { opacity: ['1', '0'], translateY: ['0px', '32px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo4Open = 1
        }
      }
    )
  } else {
    /*
			Velocity(tint,
		  				
				{ opacity: ["0", "0.3"]},
				{ duration: duration, delay: 0, easing: easingCurve }
			);
			*/

    Velocity(
      demoModal,

      { opacity: ['0', '1'], translateY: ['32px', '0px'] },
      {
        duration: duration,
        delay: 0,
        easing: easingCurve,
        complete: function (elements, activeCall) {
          transitionFlag = 0
          demo4Open = 0
          demoModal.classList.remove('show')
        }
      }
    )
  }
}

function checkMax() {
  if (inputX1.value > 1) {
    inputX1.value = 1
  } else if (inputX1.value < 0) {
    inputX1.value = 0
  }

  if (inputY1.value > 1.67) {
    inputY1.value = 1.67
  } else if (inputY1.value < -0.67) {
    inputY1.value = -0.67
  }

  if (inputX2.value > 1) {
    inputX2.value = 1
  } else if (inputX2.value < 0) {
    inputX2.value = 0
  }

  if (inputY2.value > 1.67) {
    inputY2.value = 1.67
  } else if (inputY2.value < -0.67) {
    inputY2.value = -0.67
  }

  if (inputDuration.value > 3000) {
    inputDuration.value = 3000
  } else if (inputDuration.value < 20) {
    inputDuration.value = 20
  }

  if (inputOffset.value > 1000) {
    inputOffset.value = 1000
  } else if (inputOffset.value < 0) {
    inputOffset.value = 0
  }
}

function btnClickFunction(id) {
  console.log('Btn: ' + id)

  var x1 = 0
  var y1 = 0

  var x2 = 0
  var y2 = 0

  var buttonsArray = document.getElementsByClassName('easing-btn')

  for (i = 0; i < buttonsArray.length; i++) {
    buttonsArray[i].classList.remove('active')
  }

  activeButton = document.getElementById('btn-' + id)

  activeButton.classList.add('active')

  easingCurve = ''

  // easeInOutSine
  if (id == 1) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Sine</span>"
    easingCurve = easeInOutSine.slice(0)
  }
  // easeInOutQuad
  else if (id == 2) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Quad</span>"
    easingCurve = easeInOutQuad.slice(0)
  }
  // easeInOutCubic
  else if (id == 3) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Cubic</span>"
    easingCurve = easeInOutCubic.slice(0)
  }
  // easeInOutQuart
  else if (id == 4) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Quart</span>"
    easingCurve = easeInOutQuart.slice(0)
  }
  // easeInOutQuint
  else if (id == 5) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Quint</span>"
    easingCurve = easeInOutQuint.slice(0)
  }
  // easeInOutExpo
  else if (id == 6) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Expo</span>"
    easingCurve = easeInOutExpo.slice(0)
  }
  // easeInOutCirc
  else if (id == 7) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Circ</span>"
    easingCurve = easeInOutCirc.slice(0)
  }
  // easeInOutBack
  else if (id == 8) {
    easingTitle.innerHTML =
      "easeInOut<span class='easing-title-name'>Back</span>"
    easingCurve = easeInOutBack.slice(0)
  }

  // easeInSine
  if (id == 9) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Sine</span>"
    easingCurve = easeInSine.slice(0)
  }
  // easeInQuad
  else if (id == 10) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Quad</span>"
    easingCurve = easeInQuad.slice(0)
  }
  // easeInCubic
  else if (id == 11) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Cubic</span>"
    easingCurve = easeInCubic.slice(0)
  }
  // easeInQuart
  else if (id == 12) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Quart</span>"
    easingCurve = easeInQuart.slice(0)
  }
  // easeInQuint
  else if (id == 13) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Quint</span>"
    easingCurve = easeInQuint.slice(0)
  }
  // easeInExpo
  else if (id == 14) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Expo</span>"
    easingCurve = easeInExpo.slice(0)
  }
  // easeInCirc
  else if (id == 15) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Circ</span>"
    easingCurve = easeInCirc.slice(0)
  }
  // easeInBack
  else if (id == 16) {
    easingTitle.innerHTML = "easeIn<span class='easing-title-name'>Back</span>"
    easingCurve = easeInBack.slice(0)
  }

  // easeOutSine
  if (id == 17) {
    easingTitle.innerHTML = "easeOut<span class='easing-title-name'>Sine</span>"
    easingCurve = easeOutSine.slice(0)
  }
  // easeOutQuad
  else if (id == 18) {
    easingTitle.innerHTML = "easeOut<span class='easing-title-name'>Quad</span>"
    easingCurve = easeOutQuad.slice(0)
  }
  // easeOutCubic
  else if (id == 19) {
    easingTitle.innerHTML =
      "easeOut<span class='easing-title-name'>Cubic</span>"
    easingCurve = easeOutCubic.slice(0)
  }
  // easeOutQuart
  else if (id == 20) {
    easingTitle.innerHTML =
      "easeOut<span class='easing-title-name'>Quart</span>"
    easingCurve = easeOutQuart.slice(0)
  }
  // easeOutQuint
  else if (id == 21) {
    easingTitle.innerHTML =
      "easeOut<span class='easing-title-name'>Quint</span>"
    easingCurve = easeOutQuint.slice(0)
  }
  // easeOutExpo
  else if (id == 22) {
    easingTitle.innerHTML = "easeOut<span class='easing-title-name'>Expo</span>"
    easingCurve = easeOutExpo.slice(0)
  }
  // easeOutCirc
  else if (id == 23) {
    easingTitle.innerHTML = "easeOut<span class='easing-title-name'>Circ</span>"
    easingCurve = easeOutCirc.slice(0)
  }
  // easeOutBack
  else if (id == 24) {
    easingTitle.innerHTML = "easeOut<span class='easing-title-name'>Back</span>"
    easingCurve = easeOutBack.slice(0)
  }

  point.cp1.x = easingCurve[0] * 150 + 75
  point.cp1.y = (1 - easingCurve[1]) * 150 + 120

  point.cp2.x = easingCurve[2] * 150 + 75
  point.cp2.y = (1 - easingCurve[3]) * 150 + 120

  DrawCanvas()

  if (transitionFlag != 1) {
    if (currentDemo == 0) {
      transitionFlag = 1
      playDemo0()
    } else if (currentDemo == 1) {
      transitionFlag = 1
      playDemo1()
    } else if (currentDemo == 2) {
      transitionFlag = 1
      playDemo2()
    } else if (currentDemo == 3) {
      transitionFlag = 1
      playDemo3()
    } else if (currentDemo == 4) {
      transitionFlag = 1
      playDemo4()
    }
  }
}

btn1.onclick = function () {
  btnClickFunction(1)
}
btn2.onclick = function () {
  btnClickFunction(2)
}
btn3.onclick = function () {
  btnClickFunction(3)
}
btn4.onclick = function () {
  btnClickFunction(4)
}
btn5.onclick = function () {
  btnClickFunction(5)
}
btn6.onclick = function () {
  btnClickFunction(6)
}
btn7.onclick = function () {
  btnClickFunction(7)
}
btn8.onclick = function () {
  btnClickFunction(8)
}

btn9.onclick = function () {
  btnClickFunction(9)
}
btn10.onclick = function () {
  btnClickFunction(10)
}
btn11.onclick = function () {
  btnClickFunction(11)
}
btn12.onclick = function () {
  btnClickFunction(12)
}
btn13.onclick = function () {
  btnClickFunction(13)
}
btn14.onclick = function () {
  btnClickFunction(14)
}
btn15.onclick = function () {
  btnClickFunction(15)
}
btn16.onclick = function () {
  btnClickFunction(16)
}

btn17.onclick = function () {
  btnClickFunction(17)
}
btn18.onclick = function () {
  btnClickFunction(18)
}
btn19.onclick = function () {
  btnClickFunction(19)
}
btn20.onclick = function () {
  btnClickFunction(20)
}
btn21.onclick = function () {
  btnClickFunction(21)
}
btn22.onclick = function () {
  btnClickFunction(22)
}
btn23.onclick = function () {
  btnClickFunction(23)
}
btn24.onclick = function () {
  btnClickFunction(24)
}

var gx1 = 0,
  gy1 = 0,
  gx2 = 0,
  gy2 = 0

// define initial points
function Init(quadratic) {
  point = {
    p1: { x: 75, y: 270 },
    p2: { x: 225, y: 120 }
  }

  point.cp1 = {
    x: easingCurve[0] * 150 + 75,
    y: (1 - easingCurve[1]) * 150 + 120
  }
  point.cp2 = {
    x: easingCurve[2] * 150 + 75,
    y: (1 - easingCurve[3]) * 150 + 120
  }

  // default styles
  style = {
    curve: { width: 1, color: '#0044ff' },
    cpline: { width: 1, color: '#cccccf' },
    point: {
      radius: 4,
      width: 1,
      color: '#0044ff',
      fill: '#0044ff',
      arc1: 0,
      arc2: 2 * Math.PI
    },
    cpoint: {
      radius: 6,
      width: 1,
      color: '#0044ff',
      fill: '#ffffff',
      arc1: 0,
      arc2: 2 * Math.PI
    },
    cpoint1: { fill: '#ffffff', fillNeg: '#ffffff' },
    cpoint2: { fill: '#ffffff', fillNeg: '#ffffff' }
  }

  // line style defaults
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'

  // event handlers
  canvas.onmousedown = DragStart
  canvas.onmousemove = Dragging
  canvas.onmouseup = canvas.onmouseout = DragEnd

  DrawCanvas()
}

// draw canvas
function DrawCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Boundry Lines

  ctx.save()

  ctx.setLineDash([4, 4])
  ctx.strokeStyle = '#dddddf'

  ctx.beginPath()
  ctx.moveTo(75, 0)
  ctx.lineTo(75, 390)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(225, 0)
  ctx.lineTo(225, 390)
  ctx.stroke()

  ctx.restore()

  // control lines

  ctx.lineWidth = style.cpline.width
  ctx.strokeStyle = style.cpline.color
  ctx.beginPath()
  ctx.moveTo(point.p1.x, point.p1.y)
  ctx.lineTo(point.cp1.x, point.cp1.y)

  if (point.cp2) {
    ctx.moveTo(point.p2.x, point.p2.y)
    ctx.lineTo(point.cp2.x, point.cp2.y)
  } else {
    ctx.lineTo(point.p2.x, point.p2.y)
  }

  ctx.stroke()

  // curve

  ctx.lineWidth = style.curve.width
  ctx.strokeStyle = style.curve.color
  ctx.beginPath()
  ctx.moveTo(point.p1.x, point.p1.y)

  if (point.cp2) {
    ctx.bezierCurveTo(
      point.cp1.x,
      point.cp1.y,
      point.cp2.x,
      point.cp2.y,
      point.p2.x,
      point.p2.y
    )
  } else {
    ctx.quadraticCurveTo(point.cp1.x, point.cp1.y, point.p2.x, point.p2.y)
  }

  ctx.stroke()

  // control points

  for (var p in point) {
    if (p == 'p1' || p == 'p2') {
      ctx.fillStyle = style.point.fill
      ctx.beginPath()
      ctx.arc(
        point[p].x,
        point[p].y,
        style.point.radius,
        style.point.arc1,
        style.point.arc2,
        true
      )
      ctx.fill()
    } else {
      if (p == 'cp1') {
        if (point[p].y > 270 || point[p].y < 120) {
          ctx.strokeStyle = '#ff4400'
          ctx.fillStyle = style.cpoint1.fillNeg
        } else {
          ctx.strokeStyle = style.point.color
          ctx.fillStyle = style.cpoint1.fill
        }

        ctx.beginPath()
        ctx.arc(
          point[p].x,
          point[p].y,
          style.cpoint.radius,
          style.cpoint.arc1,
          style.cpoint.arc2,
          true
        )
        ctx.fill()
        ctx.stroke()
      } else if (p == 'cp2') {
        if (point[p].y > 270 || point[p].y < 120) {
          ctx.strokeStyle = '#ff4400'
          ctx.fillStyle = style.cpoint2.fillNeg
        } else {
          ctx.strokeStyle = style.point.color
          ctx.fillStyle = style.cpoint2.fill
        }

        ctx.beginPath()
        ctx.arc(
          point[p].x,
          point[p].y,
          style.cpoint.radius,
          style.cpoint.arc1,
          style.cpoint.arc2,
          true
        )
        ctx.fill()
        ctx.stroke()
      } else {
        ctx.fillStyle = style.cpoint.fill
      }

      ctx.lineWidth = style.point.width
    }
  }

  updateShareFunction()

  ShowCode()
}

// Show Canvas Code

function ShowCode() {
  var x1 = (point.cp1.x - 75) / 150

  var y1 = 1 - (point.cp1.y - 120) / 150

  var x2 = (point.cp2.x - 75) / 150

  var y2 = 1 - (point.cp2.y - 120) / 150

  gx1 = Math.round(x1 * 100) / 100
  gy1 = Math.round(y1 * 100) / 100
  gx2 = Math.round(x2 * 100) / 100
  gy2 = Math.round(y2 * 100) / 100

  inputX1.value = gx1
  inputY1.value = gy1
  inputX2.value = gx2
  inputY2.value = gy2

  easingCurveArray[0] = gx1
  easingCurveArray[1] = gy1
  easingCurveArray[2] = gx2
  easingCurveArray[3] = gy2

  easingCurve[0] = gx1
  easingCurve[1] = gy1
  easingCurve[2] = gx2
  easingCurve[3] = gy2

  easingCurveCode =
    'cubic-bezier(' +
    easingCurveArray[0] +
    ',' +
    easingCurveArray[1] +
    ',' +
    easingCurveArray[2] +
    ',' +
    easingCurveArray[3] +
    ');'

  if (code) {
    code.firstChild.nodeValue =
      'cubic-bezier(' + gx1 + ',' + gy1 + ',' + gx2 + ',' + gy2 + ');'
  }
}

// Start Dragging...

function DragStart(e) {
  e = MousePos(e)

  var dx, dy

  for (var p in point) {
    dx = point[p].x - e.x
    dy = point[p].y - e.y

    if (dx * dx + dy * dy < style.cpoint.radius * style.cpoint.radius) {
      // Check if control points or not...

      if (p == 'p1') {
        console.log('No dragging P1')
      } else if (p == 'p2') {
        console.log('No dragging P2')
      } else {
        drag = p
        dPoint = e
        //canvas.style.cursor = "move";
        return
      }
    } else {
      //console.log('No Point');
    }
  }
}

// Dragging...

function Dragging(e) {
  e = MousePos(e)

  var dx, dy

  var pointHit = 0

  for (var p in point) {
    dx = point[p].x - e.x
    dy = point[p].y - e.y

    if (dx * dx + dy * dy < style.cpoint.radius * style.cpoint.radius) {
      pointHit = 1

      if (p == 'p1') {
        //console.log('Hit P1');
      } else if (p == 'p2') {
        //console.log('Hit P2');
      } else if (p == 'cp1') {
        //console.log('Hit CP1');

        style.cpoint1.fill = '#0044FF'
        style.cpoint1.fillNeg = '#FF4400'
        style.cpoint2.fill = '#FFFFFF'
        style.cpoint2.fillNeg = '#FFFFFF'
      } else if (p == 'cp2') {
        //console.log('Hit CP2');

        style.cpoint1.fill = '#FFFFFF'
        style.cpoint1.fillNeg = '#FFFFFF'
        style.cpoint2.fill = '#0044FF'
        style.cpoint2.fillNeg = '#FF4400'
      } else {
        //console.log('No Hit');

        style.cpoint1.fill = '#FFFFFF'
        style.cpoint1.fillNeg = '#FFFFFF'
        style.cpoint2.fill = '#FFFFFF'
        style.cpoint2.fillNeg = '#FFFFFF'
      }
    } else {
      //console.log('No Hit');
    }
  }

  if (pointHit == 1) {
    pointHit = 0
  } else {
    pointHit = 0

    if (!drag) {
      style.cpoint1.fill = '#FFFFFF'
      style.cpoint1.fillNeg = '#FFFFFF'
      style.cpoint2.fill = '#FFFFFF'
      style.cpoint2.fillNeg = '#FFFFFF'
    }
  }

  if (drag) {
    point[drag].x += e.x - dPoint.x
    point[drag].y += e.y - dPoint.y

    if (point[drag].x <= 75) {
      point[drag].x = 75
    }

    if (point[drag].x >= 225) {
      point[drag].x = 225
    }

    if (point[drag].y >= 370) {
      point[drag].y = 370
    }

    if (point[drag].y <= 20) {
      point[drag].y = 20
    }

    dPoint = e
  }

  DrawCanvas()
}

// End dragging...

function DragEnd(e) {
  drag = null
  //canvas.style.cursor = "default";
  DrawCanvas()
}

// Mouse Position...

function MousePos(event) {
  var rect = canvas.getBoundingClientRect()

  event = event ? event : window.event

  //console.log('T: Canvas: '+canvas.offsetTop+' Tab: '+tab1.offsetTop+' Side Panel: '+sidePanel.offsetTop);
  //console.log('Rect Left: '+rect.left+' Rect Top: '+rect.top);
  //console.log('Event Left: '+event.pageX+' Event Top: '+event.pageY);

  return {
    x:
      event.pageX -
      canvas.offsetLeft -
      canvasContainer.offsetLeft -
      tab1.offsetLeft -
      sidePanel.offsetLeft,
    y:
      event.pageY -
      canvas.offsetTop -
      canvasContainer.offsetTop -
      tab1.offsetTop -
      sidePanel.offsetTop
  }
}

// start
canvas = document.getElementById('canvas')
canvasContainer = document.getElementById('canvas-container')
code = document.getElementById('code')

var dpr = window.devicePixelRatio || 1
var rect = canvas.getBoundingClientRect()

// Give the canvas pixel dimensions of their CSS
// size * the device pixel ratio.

canvas.width = rect.width * dpr
canvas.height = rect.height * dpr

canvas.style.width = rect.width + 'px'
canvas.style.height = rect.height + 'px'

if (canvas.getContext) {
  ctx = canvas.getContext('2d')
  ctx.scale(dpr, dpr)
  Init(canvas.className == 'quadratic')
}
